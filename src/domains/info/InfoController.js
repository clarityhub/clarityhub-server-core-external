import Controller from '~/utilities/Controller';

export default class AuthController extends Controller {
	async get() {
		return {
			result: 'OK',
		};
	}
}
