import Controller from '../../utilities/Controller';
import TagItemRepository from './TagItemRepository';

export default class TagItemController extends Controller {
	constructor(ioc) {
		super(ioc);

		this.repository = new TagItemRepository(ioc);
	}

	getAllItemsByTag({ user, tagPath }) {
		return this.repository.find({
			workspaceId: user.currentWorkspaceId,
			tagPathItem: {
				beginsWith: `${tagPath}:`,
			},
		});
	}

	getAllForItem({ user, type, itemId }) {
		return this.repository.getRawModel().query({
			workspaceId: {
				eq: user.currentWorkspaceId,
			},
		}).where('itemTagPath')
			.beginsWith(`${type}:${itemId}:`)
			.exec();
	}

	create({
		user, data,
	}) {
		const {
			type,
			itemId,
			tagPath,
			preview,
		} = data;

		// XXX check all three inputs

		return this.repository.create({
			workspaceId: user.currentWorkspaceId,
			itemTagPath: `${type}:${itemId}:${tagPath}`,
			tagPathItem: `${tagPath}:${type}:${itemId}`,
			itemId,
			itemType: type,
			tagPath,
			itemPreview: preview,
		});
	}

	delete({
		user, itemTagPath,
	}) {
		return this.repository.delete({
			workspaceId: user.currentWorkspaceId,
			itemTagPath,
		}, {
			update: true,
		});
	}

	async deleteBeginsWith({
		user, tagPath,
	}) {
		const childTags = await this.repository.getRawModel().query({
			workspaceId: {
				eq: user.currentWorkspaceId,
			},
		}).where('tagPathItem')
			.beginsWith(`${tagPath}:`)
			.exec();

		return Promise.all(childTags.map((tag) => {
			return this.repository.delete({
				workspaceId: user.currentWorkspaceId,
				itemTagPath: tag.itemTagPath,
			});
		}));
	}
}
