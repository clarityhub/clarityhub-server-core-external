import DynamoRepository from '~/utilities/DynamoRepository';
import InterviewSchema from './InterviewSchema';

export default class InterviewRepository extends DynamoRepository {
	constructor(ioc) {
		super(ioc, `Interview-ext-${process.env.STAGE}`, InterviewSchema);
	}
}
