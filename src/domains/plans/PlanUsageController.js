import createError from 'http-errors';
import WorkspaceRepository from '~/domains/workspaces/WorkspaceRepository';

import Controller from '../../utilities/Controller';
import PlanUsageRepository from './PlanUsageRepository';
import { FREE } from '../workspaces/Plans';

const TEN_HOURS = 1000 * 60 * 60 * 10;

const planLimits = {
	free: {
		transcribe: TEN_HOURS,
	},
};

const planDefaults = {
	transcribe: {
		usage: 0,
	},
};

const merge = (defaults, values) => {
	// convert to and from string to remove undefined/null values
	return Object.assign({}, defaults, JSON.parse(JSON.stringify(values)));
};

export default class PlanUsageController extends Controller {
	constructor(ioc) {
		super(ioc);

		this.repository = new PlanUsageRepository(ioc);
		this.workspaceRepository = new WorkspaceRepository(ioc);
	}

	_getMonthYearBucket() {
		const today = new Date();
		const month = today.getMonth() + 1;
		const year = today.getFullYear() + 1;
		return `${month}-${year}`;
	}

	_isWithinLimit({ type, plan = FREE, planUsage }) {
		if (!planUsage) {
			// no usage found for this month
			return true;
		}

		if (planLimits[plan] && typeof planLimits[plan][type] !== 'undefined') {
			return planLimits[plan][type] > planUsage.usage;
		}
		// Incorrect mapping.
		return true;
	}

	/*
     * Can a {user} in workspace with plan A, do
     * action {type}?
     */
	async can({ user, type }) {
		const workspaceIdUsage = `${user.currentWorkspaceId}/${type}`;
		const monthYearBucket = this._getMonthYearBucket();

		const workspaces = await this.workspaceRepository.find({
			id: user.currentWorkspaceId,
		});

		if (!workspaces || workspaces.length === 0) {
			throw createError.NotFound('Could not find workspace');
		}

		const [workspace] = workspaces;

		const planUsage = await this.repository.findOne({
			workspaceIdUsage,
			monthYearBucket,
		});

		return this._isWithinLimit({
			type,
			plan: workspace.plan,
			planUsage,
		});
	}

	async getAll({ user }) {
		const workspaceIdUsage = `${user.currentWorkspaceId}/transcribe`;
		const monthYearBucket = this._getMonthYearBucket();

		const transcribe = await this.repository.findOne({
			workspaceIdUsage,
			monthYearBucket,
		});

		return {
			planLimits,
			usage: merge(planDefaults, { transcribe }),
		};
	}

	async add({ user, type, usage }) {
		// find
		const workspaceIdUsage = `${user.currentWorkspaceId}/${type}`;
		const monthYearBucket = this._getMonthYearBucket();

		const planUsage = await this.repository.findOne({
			workspaceIdUsage,
			monthYearBucket,
		});

		// create if not found
		if (!planUsage) {
			await this.repository.create({
				workspaceIdUsage,
				monthYearBucket,
				usage: 0,
			});
		}

		// increment
		return this.repository.update({
			$ADD: {
				usage,
			},
		}, {
			workspaceIdUsage,
			monthYearBucket,
		});
	}
}
