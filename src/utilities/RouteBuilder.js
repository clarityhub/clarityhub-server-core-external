import middy from 'middy';
import {
	cors,
	httpHeaderNormalizer,
} from 'middy/middlewares';

import wrapBottle from '../middleware/wrapBottle';
import bodyParser from '../middleware/bodyParser';
import httpSuccessHandler from '../middleware/httpSuccessHandler';
import httpErrorHandler from '../middleware/httpErrorHandler';
import hasAccess from '../middleware/hasAccess';

const noData = () => {
	return {};
};

const crudRoute = (
	Controller,
	methodName,
	dataCb = noData,
	additionalMiddleware = [],
	options = {}
) => {
	let chain = middy(async (event, context) => {
		const controller = new Controller(context.bottle.container);

		const data = await controller[methodName]({
			...dataCb(event, context),
			user: context.user,
			queryParams: event.queryStringParameters,
		});

		return data;
	})
		// Put this BEFORE cors: https://github.com/middyjs/middy/blob/master/docs/middlewares.md#cors
		.use(httpErrorHandler())
		.use(cors())
		.use(httpHeaderNormalizer())
		.use(wrapBottle())
		.use(bodyParser())
		.use(httpSuccessHandler());

	additionalMiddleware.forEach((middleware) => {
		chain = chain.use(middleware);
	});

	if (options && options.rbac && options.rbac.resource) {
		chain.use(hasAccess(options.rbac.action, options.rbac.resource));
	}

	return chain;
};

const Routes = {
	method(Controller, method, additionalMiddleware, opts) {
		const options = Object.assign({}, opts);

		const dataCb = (event) => {
			return {
				data: event.body,
				...event.pathParameter,
			};
		};

		return crudRoute(Controller, method, dataCb, additionalMiddleware, {
			rbac: {
				resource: options.rbac,
				action: options.rbacAction || 'readAny',
			},
		});
	},

	crud(Controller, additionalMiddleware, opts) {
		const options = Object.assign({}, opts);

		return {
			get(...props) {
				const dataCb = (event) => {
					return {
						id: event.pathParameter.id,
					};
				};

				return crudRoute(Controller, 'get', dataCb, additionalMiddleware, {
					rbac: {
						resource: options.rbac,
						action: 'readAny',
					},
				})(...props);
			},
			getAll(...props) {
				return crudRoute(Controller, 'getAll', undefined, additionalMiddleware, {
					rbac: {
						resource: options.rbac,
						action: 'readAny',
					},
				})(...props);
			},
			create(...props) {
				const dataCb = (event) => {
					return {
						data: event.body,
					};
				};

				return crudRoute(Controller, 'create', dataCb, additionalMiddleware, {
					rbac: {
						resource: options.rbac,
						action: 'create',
					},
				})(...props);
			},
			update(...props) {
				const dataCb = (event) => {
					return {
						id: event.pathParameter.id,
						data: event.body,
					};
				};

				return crudRoute(Controller, 'update', dataCb, additionalMiddleware, {
					rbac: {
						resource: options.rbac,
						action: 'updateAny',
					},
				})(...props);
			},
			delete(...props) {
				const dataCb = (event) => {
					return {
						id: event.pathParameter.id,
					};
				};

				return crudRoute(Controller, 'delete', dataCb, additionalMiddleware, {
					rbac: {
						resource: options.rbac,
						action: 'deleteAny',
					},
				})(...props);
			},
		};
	},
};

export default Routes;
