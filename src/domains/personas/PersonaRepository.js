import DynamoRepository from '../../utilities/DynamoRepository';
import PersonaSchema from './PersonaSchema';

export default class PersonaRepository extends DynamoRepository {
	constructor(ioc) {
		super(ioc, `Persona-ext-${process.env.STAGE}`, PersonaSchema);
	}
}
