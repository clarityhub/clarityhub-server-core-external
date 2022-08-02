import UrlPattern from 'url-pattern';

const urlOptions = {
	segmentValueCharset: 'a-zA-Z0-9-_~ %:',
};

const normalizePath = (path) => {
	// strip any trailing slashes
	if (path.substring(path.length - 1) === '/') {
		path = path.substring(0, path.length - 1);
	}

	return path;
};

const normalizeMethod = (method) => {
	return method.toUpperCase();
};

class Router {
	constructor() {
		this.routes = [];
	}

	get(path, obj, objMethod) {
		this.routes.push({
			method: 'GET',
			path,
			pattern: new UrlPattern(path, urlOptions),
			obj,
			objMethod,
		});
	}

	post(path, obj, objMethod) {
		this.routes.push({
			method: 'POST',
			path,
			pattern: new UrlPattern(path, urlOptions),
			obj,
			objMethod,
		});
	}

	put(path, obj, objMethod) {
		this.routes.push({
			method: 'PUT',
			path,
			pattern: new UrlPattern(path, urlOptions),
			obj,
			objMethod,
		});
	}

	delete(path, obj, objMethod) {
		this.routes.push({
			method: 'DELETE',
			path,
			pattern: new UrlPattern(path, urlOptions),
			obj,
			objMethod,
		});
	}

	resource(path, obj) {
		this.get(path, obj, 'getAll');
		this.get(`${path}/:id`, obj, 'get');
		this.post(`${path}`, obj, 'create');
		this.put(`${path}/:id`, obj, 'update');
		this.delete(`${path}/:id`, obj, 'delete');
	}

	exec() {
		return (event, context, cb) => {
			event.path = normalizePath(event.path);
			event.httpMethod = normalizeMethod(event.httpMethod);

			// Find a matches method and pattern
			let match = this.routes.find((route) => {
				return event.httpMethod === route.method && route.pattern.match(event.path);
			});

			if (!match && event.path === '') {
				match = this.routes.find((route) => {
					return event.httpMethod === route.method && route.pattern.match('/');
				});
			}

			if (!match) {
				// No route found, return a 404
				cb(null, {
					statusCode: '404',
					body: JSON.stringify({ error: 'Route not found' }),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				return;
			}

			const params = match.pattern.match(event.path);
			event.pathParameter = params;

			if (!match.objMethod) {
				// Call obj like a function
				return match.obj(event, context, cb);
			}

			return match.obj[match.objMethod](event, context, cb);
		};
	}
}

export default Router;
