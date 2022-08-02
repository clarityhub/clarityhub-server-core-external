import Router from './utilities/Router';
import RouteBuilder from './utilities/RouteBuilder';

/* eslint-disable max-len */

// import PersonaController from './domains/personas/PersonaController';
// import OnboardingController from './domains/onboarding/OnboardingController';
// import PlanUsageController from './domains/plans/PlanUsageController';
import InfoController from './domains/info/InfoController';
import InterviewController from './domains/interviews/InterviewController';
import MediaController from './domains/medias/MediaController';
// import TagController from './domains/tags/TagController';
// import TagItemController from './domains/tags/TagItemController';
// import WorkspaceController from './domains/workspaces/WorkspaceController';
// import WorkspaceUsersController from './domains/workspaces/WorkspaceUsersController';
// import AuthController from './domains/auth/AuthController';
// import getUser from './middleware/getUser';
import getAuth0User from './middleware/getAuth0User';

const routes = new Router();

// routes.post('/auth/login', RouteBuilder.method(AuthController, 'loginUser', [getAuth0User()]));
// routes.post('/auth/login/workspace', RouteBuilder.method(AuthController, 'loginWorkspace', [getAuth0User()]));
// routes.post('/auth/refresh', RouteBuilder.method(AuthController, 'refresh', [getUser()]));

// Workspaces requires special middleware depending on the route
// routes.get('/workspaces', RouteBuilder.method(WorkspaceController, 'getAll', [getAuth0User()]));
// routes.get('/workspaces-auth', RouteBuilder.method(WorkspaceController, 'getAll', [getUser()]));
// routes.post('/workspaces', RouteBuilder.method(WorkspaceController, 'create', [getAuth0User()]));
// routes.get('/workspaces/:id', RouteBuilder.method(WorkspaceController, 'get', [getUser()]));
// routes.put('/workspaces/:id', RouteBuilder.method(WorkspaceController, 'update', [getUser()], {
// 	rbac: 'workspace',
// 	rbacAction: 'updateAny',
// }));
// routes.delete('/workspaces/:id', RouteBuilder.method(WorkspaceController, 'delete', [getUser()], {
// 	rbac: 'workspace',
// 	rbacAction: 'deleteOwn',
// }));

// routes.get('/plans/usage', RouteBuilder.method(PlanUsageController, 'getAll', [getUser()]));

// routes.get('/members', RouteBuilder.method(WorkspaceUsersController, 'getAll', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'readAny',
// }));
// routes.post('/members', RouteBuilder.method(WorkspaceUsersController, 'invite', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'create',
// }));
// routes.get('/members/me', RouteBuilder.method(WorkspaceUsersController, 'getMe', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'readAny',
// }));
// routes.get('/members/:id', RouteBuilder.method(WorkspaceUsersController, 'get', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'readAny',
// }));
// routes.post('/members/:id/actions/resend-invite', RouteBuilder.method(WorkspaceUsersController, 'resendInvite', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'create',
// }));
// routes.put('/members/:id', RouteBuilder.method(WorkspaceUsersController, 'update', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'updateAny',
// }));
// routes.delete('/members/me', RouteBuilder.method(WorkspaceUsersController, 'leave', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'deleteAny',
// }));
// routes.delete('/members/:id', RouteBuilder.method(WorkspaceUsersController, 'kick', [getUser()], {
// 	rbac: 'member',
// 	rbacAction: 'deleteAny',
// }));

// routes.resource('/personas', RouteBuilder.crud(PersonaController, [getUser()], { rbac: 'persona' }));
routes.get('/', RouteBuilder.method(InfoController, 'get', []));

routes.resource('/interviews', RouteBuilder.crud(InterviewController, [getAuth0User()]));

routes.post('/medias', RouteBuilder.method(MediaController, 'create', [getAuth0User()]));
routes.get('/medias/:id', RouteBuilder.method(MediaController, 'get', [getAuth0User()]));
routes.put('/medias/:id', RouteBuilder.method(MediaController, 'update', [getAuth0User()]));
routes.post('/medias/:id/actions/upload', RouteBuilder.method(MediaController, 'upload', [getAuth0User()]));
routes.post('/medias/:id/actions/complete', RouteBuilder.method(MediaController, 'complete', [getAuth0User()]));

// routes.get('/onboarding', RouteBuilder.method(OnboardingController, 'getAll', [getUser()]));
// routes.put('/onboarding/:id', RouteBuilder.method(OnboardingController, 'update', [getUser()]));

// routes.resource('/tags', RouteBuilder.crud(TagController, [getUser()], { rbac: 'tag' }));
// routes.get('/tags/:tagPath/items', RouteBuilder.method(TagItemController, 'getAllItemsByTag', [getUser()], { rbac: 'tag' }));
// routes.get('/tags/items/:type/:itemId', RouteBuilder.method(TagItemController, 'getAllForItem', [getUser()], { rbac: 'tag' }));
// routes.post('/tags/items', RouteBuilder.method(TagItemController, 'create', [getUser()], { rbac: 'tag' }));
// routes.delete('/tags/items/:itemTagPath', RouteBuilder.method(TagItemController, 'delete', [getUser()], { rbac: 'tag' }));

export default routes.exec();
