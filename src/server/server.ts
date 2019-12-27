
import Application from './application';
import Interceptor from './middleware/interceptor';
import RoleController from './controllers/restful/api/roles';
import UserController from './controllers/restful/api/users';
import IndexViewRender from '../client/renderers/ViewRender';
import SchemaController from './controllers/restful/api/schema';
import SearchController from './controllers/restful/api/Search';
import InviteController from './controllers/restful/api/invitations';
import PriviledgeController from './controllers/restful/api/priviledges';
import AuthenticationController from './controllers/restful/api/authentication';

import { ROOT, ADMIN, USER, ALL } from './localstore/accessrole.store';

const args = {
	controllers: [
		new RoleController(ROOT),
		new SearchController(...ALL),
		new SchemaController(...ALL),
		new UserController(ROOT, ADMIN, USER),
		new InviteController(ROOT, ADMIN),
		new PriviledgeController(ROOT, ADMIN),
		new AuthenticationController(...ALL)
	],
	viewRenderer: [
		new IndexViewRender()
	],
	interceptor: new Interceptor()
};

new Application(args).startlistening();
