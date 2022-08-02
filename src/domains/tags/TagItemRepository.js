import DynamoRepository from '../../utilities/DynamoRepository';
import TagItemSchema from './TagItemSchema';

export default class TagItemRepository extends DynamoRepository {
	constructor(ioc) {
		super(ioc, `TagItems-ext-${process.env.STAGE}`, TagItemSchema);
	}
}
