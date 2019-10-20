
import PermissionsService from '../services/role.service';
import InvitationService from '../services/invitation.service';
import UserService from '../services/user.service';
import RoleStore from '../localstore/accessrole.store';
import Logger from '../handlers/logging.handler';
import Handler from '../handlers/error.handler';

class DatabaseIntializer {

   private logger: Logger;
   private handler: Handler;

   constructor(errorHandler: Handler, logger: Logger) {
      this.handler = errorHandler;
      this.logger = logger;
   }
   /**
    * Populates the user collection with some
    * initital user related data for users with
    * role admin.
    */
   createInitialAdministrators() {
      const service = new UserService();
   }

   /**
    * Populates the invitation collection with some
    * initital invitation related data.
    */
   createInitialInvitation() {
      const service = new InvitationService();
   }

   /**
    * Populates the role collection with some
    * initital role related data.
    */
   async createInitialRoles() {
      const service = new PermissionsService();

      for (var i = 0; i < RoleStore.ACCESS_ROLES.length; i++) {
         const type = RoleStore.ACCESS_ROLES[i].type;
         const code = RoleStore.ACCESS_ROLES[i].code;

         const role = {
            name: type,
            code: code
         }
         const { error } = await service.createAccessRole(role);

         if (error) {
            this.handler.onError(error);
            continue;
         }
         this.logger.logInfo(`Initialized role of type: ${type}`);
      }
   }
}

module.exports = {
   DatabaseIntializer
}