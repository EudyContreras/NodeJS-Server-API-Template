
import PermissionsService from '../services/role.service';
import InvitationService from '../services/invitation.service';
import UserService from '../services/user.service';
import RoleStore from '../localstore/accessrole.store';
import Logger from '../handlers/logging.handler';
import Handler from '../handlers/error.handler';
import Vault from '../config/vault';

export default class DatabaseIntializer {

   private logger: Logger;
   private handler: Handler;

   constructor(errorHandler: Handler, logger: Logger) {
      this.handler = errorHandler;
      this.logger = logger;
   }

   /**
    * @description Populates the invitation collection with some
    * initital invitation related data.
    */
   async createInitialInvitation() {
      const inviteService = new InvitationService();
   }

   /**
    * @description Populates the user collection with some
    * initital user related data for users with
    * role admin.
    */
   async createInitialAdministrators() {
      const userService = new UserService();

      const user = {
         name: Vault.admin.ADMIN_NAME,
         email: Vault.admin.ADMIN_USERNAME,
         password: Vault.admin.ADMIN_PASSWORD
      };

      const { result, error } = await userService.registerUser(user);

      if (error) {
         this.logger.logInfo(error);
      } else {
         this.logger.logInfo(result);
      }
   }

   /**
    * @description Populates the role collection with some
    * initital role related data.
    */
   async createInitialRoles() {
      const service = new PermissionsService();

      for (let i = 0; i < RoleStore.ACCESS_ROLES.length; i++) {
         const type = RoleStore.ACCESS_ROLES[i].type;
         const code = RoleStore.ACCESS_ROLES[i].code;
         const level = RoleStore.ACCESS_ROLES[i].level;

         const role = {
            name: type,
            code: code,
            level: level
         }
         const { error } = await service.createRole(role);

         if (error) {
            this.handler.onError(error);
            continue;
         }
         this.logger.logInfo(`Initialized role of type: ${type}`);
      }
   }
}