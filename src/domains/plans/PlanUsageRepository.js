import DynamoRepository from '../../utilities/DynamoRepository';
import PlanUsageSchema from './PlanUsageSchema';

export default class PlanUsageRepository extends DynamoRepository {
	constructor(ioc) {
		super(ioc, `PlanUsage-ext-${process.env.STAGE}`, PlanUsageSchema);
	}
}
