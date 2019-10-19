
import Application from './application';
import Middleware from './middleware/middleware';
import RoleController from './controllers/restful/api/roles';
import UserController from './controllers/restful/api/users';
import PriviledgeController from './controllers/restful/api/priviledges';
import AuthenticationController from './controllers/restful/api/authentication';

const application = new Application([
   new RoleController(),
   new UserController(),
   new PriviledgeController(),
   new AuthenticationController()
], new Middleware()
);

application.startlistening();