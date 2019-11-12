
import Application from './server/application';
import Interceptor from './server/middleware/interceptor';
import RoleController from './server/controllers/restful/api/roles';
import UserController from './server/controllers/restful/api/users';
import IndexController from './client/controllers/index';
import InviteController from './server/controllers/restful/api/invitations';
import PriviledgeController from './server/controllers/restful/api/priviledges';
import AuthenticationController from './server/controllers/restful/api/authentication';

import { ROOT, ADMIN, USER, ALL } from './server/localstore/accessrole.store'

const args = {
   controllers: [
      new RoleController(ROOT),
      new UserController(ROOT, ADMIN, USER),
      new InviteController(ROOT, ADMIN),
      new PriviledgeController(ROOT, ADMIN),
      new AuthenticationController(...ALL)
   ],
   viewControllers: [
      new IndexController()
   ],
   interceptor: new Interceptor()
}

new Application(args).startlistening();
