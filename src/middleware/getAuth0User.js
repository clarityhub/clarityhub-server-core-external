import createError from 'http-errors';

export default function getUser() {
	return {
		async before({ event, context }) {
			const authHeader = event.headers.Authorization;

			if (!authHeader) {
				throw new createError.BadRequest('Missing Authorization header');
			}

			const token = authHeader.split(' ')[1];

			// XXX If incorrect header fail

			const claims = await context.bottle.container.JWT.auth0Decode(token);

			// Special user object for external developers
			context.user = {
				...claims,
				currentWorkspaceId: claims.email,
			};
		},
	};
}
