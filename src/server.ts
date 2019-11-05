
import Application from './application';
import Interceptor from './middleware/interceptor';
import RoleController from './controllers/restful/api/roles';
import UserController from './controllers/restful/api/users';
import InviteController from './controllers/restful/api/invitations';
import PriviledgeController from './controllers/restful/api/priviledges';
import AuthenticationController from './controllers/restful/api/authentication';

import { ROOT, ADMIN, USER, ALL} from './localstore/accessrole.store'

const roleController = new RoleController(ROOT, ADMIN);
const userController = new UserController(ROOT, ADMIN, USER);
const inviteController = new InviteController(ROOT, ADMIN);
const priviledgeController = new PriviledgeController(ROOT, ADMIN);
const authenticationController = new AuthenticationController(...ALL);

new Application([
   roleController,
   userController,
   inviteController,
   priviledgeController,
   authenticationController
],
   new Interceptor()
).startlistening();