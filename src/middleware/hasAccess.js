import createError from 'http-errors';

import roles from '../roles';

export default (action, resource) => {
	return {
		before({ context }, next) {
			const { role } = context.user;

			const permission = roles.can(role)[action](resource);

			if (!permission.granted) {
				throw new createError.Unauthorized('You don\'t have enough permission to perform this action');
			}

			next();
		},
	};
};
