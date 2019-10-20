
import Application from './application';
import Interceptor from './middleware/interceptor';
import RoleController from './controllers/restful/api/roles';
import UserController from './controllers/restful/api/users';
import PriviledgeController from './controllers/restful/api/priviledges';
import AuthenticationController from './controllers/restful/api/authentication';

new Application([
   new RoleController(),
   new UserController(),
   new PriviledgeController(),
   new AuthenticationController()
], new Interceptor()
).startlistening();