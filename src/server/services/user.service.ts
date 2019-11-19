

import InvitationService from './invitation.service';
import EncryptionService from './encryption.service';
import AuthenticationService from './authentication.service';
import UserRepository from '../repositories/user.repository';
import PasswordRepository from '../repositories/password.repository';

import { UserMessages } from '../messages/message.response';


export default class UserService {

   /**
    * @description Returns a result with all the users which are currently in 
    * the database.
    * @returns the potential result represented as a list of users or 
    * the possible generated error.
    */
   public async getAllUsers(): Promise<{ result?: any[], error?: any }> {
      try {
         const repository = new UserRepository();

         const users = await repository.getAllUsers();

         return { result: users };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Returns a result with the user with the matching id
    * the database.
    * @param  userId The id of the user to return
    * @returns the potential result represented as the user that matches
    * the given id or the possible generated error.
    */
   public async getUser(userId: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new UserRepository();

         const user = await repository.getUser(userId);

         if (!user) return { error: UserMessages.NO_SUCH_ID };

         return { result: user };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Returns a result with the user with the matching email
    * the database.
    * @param email The email of the user to return
    * @returns the potential result represented as  user that matches the 
    * given email or the possible generated error.
    */
   public async getUserByEmail(email: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new UserRepository();

         const user = await repository.getUserWhere({ email: email });

         if (!user) return { error: UserMessages.NO_SUCH_EMAIL };

         return { result: user };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Returns a result with the user with the matching email
    * the database.
    * @param criteria The criteria used for finding the user.
    * @returns the potential result represented as  user that matches the 
    * given email or the possible generated error.
    */
   public async getUserWhere(criteria: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new UserRepository();

         const user = await repository.getUserWhere(criteria);

         if (!user) return { error: UserMessages.NO_SUCH_USER };

         return { result: user };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Updates the user with the matching id with the specified data
    * Only the first name, last name and company id of the user can be updated by this 
    * function.
    * @param userId The id of the user to return
    * @param  update data with the updated user details.
    * @returns the potential result represented as the user who has been
    * updated or the possible generated error.
    */
   public async updateUser(userId: string, update: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new UserRepository();

         const user = await repository.updateUser(userId, update);

         if (!user) return { error: UserMessages.NO_SUCH_ID };

         return { result: user };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Updates the user role for the user with the given user id.
    * @param userId The id of the user.
    * @param update The new role code data to be assigned.
    * @returns the potential result represented as the user whose role was 
    * updated or the possible generated error.
    */
   public async updateUserRole(userId: string, update: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new UserRepository();

         const user = await repository.updateUser(userId, update);

         if (!user) return { error: UserMessages.NO_SUCH_ID };

         return { result: user };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Updates the passsword of the user with the new password
    * given that the old password matches the user records. A password
    * update invalidates any possible token issued to the user.
    * @param  userId The id of the user.
    * @param passwordData The data containing the old and new passwords.
    * @returns the potential result represented as the user whose password 
    * was updated or the possible generated error.
    */
   public async updateUserPassword(userId: string, passwordData: any, internal = false): Promise<{ result?: any, error?: any }> {

      const currentPassword = passwordData.oldPassword;
      const newPassword = passwordData.newPassword;

      try {
         const userRepository = new UserRepository();
         const passwordRepository = new PasswordRepository();
         const encryptionService = new EncryptionService();
         const authenticationService = new AuthenticationService();

         const user = await userRepository.getUser(userId, { dto: false });

         if (user === null) return { error: UserMessages.NO_SUCH_USER };

         const isMatch = await encryptionService.comparePasswords(currentPassword, user.password);

         if (isMatch || internal) {
            const { error, hash } = await encryptionService.encryptPassword(newPassword);

            if (error) {
               return { error };
            }
            const update = {
               password: hash,
               updateDate: Date.now
            };

            const result = await userRepository.updateUser(userId, update);

            if (!result) {
               return { error: UserMessages.NO_SUCH_USER };
            }

            const revokeResult = await authenticationService.invalidateTokens(result);
            
            await passwordRepository.clearAllWhere({ userId: user.id });

            return { result: result, error: revokeResult.error };
         } else {
            return { error: UserMessages.WRONG_PASSWORD };
         }
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Registers a user given that the user has a pending active
    * invitation. 
    * @param userData The data of the user to be registered.
    * @returns the potential result represented as the user who was just 
    * created or the possible generated error.
    */
   public async registerUser(userData: any): Promise<{ result?: any, error?: any }> {
      const email = userData.email;

      const encryptionService = new EncryptionService();
      const invitationService = new InvitationService();
      const passwordRepository = new PasswordRepository();
      const authenticationService = new AuthenticationService();

      try {
         const result = await invitationService.getInvitationWhere({ email: email });

         if (result.error) return { error: result.error };

         const invitation = result.result;

         const repository = new UserRepository();

         const exists = await repository.hasUserWhere({ email: email });

         if (exists) return { error: UserMessages.EMAIL_TAKEN };

         const encryptResult = await encryptionService.encryptPassword(userData.password);

         if (!encryptResult.hash) return { error: encryptResult.error };

         const name = userData.name;
         const roleCode = invitation.roleCode;
         const password = encryptResult.hash;

         const data = {
            name: name,
            email: email,
            roleCode: roleCode,
            password: password,
            lastLogin: null,
            active: true
         };

         const user = await repository.insertUser(data);

         if (user === null) return { error: UserMessages.NO_SUCH_USER };
         
         const tokeResult = await authenticationService.createToken(user);

         const { error } = await this.updateInviteStatus(invitation.id, invitationService);

         if (error) return { error };

         return { result: { user: user, token: tokeResult.token, error: tokeResult.error } };
      } catch (error) {
         return { error };
      }
   }

   private async updateInviteStatus(inviteId: string, invitationService: InvitationService): Promise<{ result?: any, error?: any }> {
      const data = {
         pending: false
      };

      return await invitationService.updateInvitation(inviteId, data);
   }

   /**
    * @description Removes the user that matches the given user id from
    * our records.
    * @param userId The id of the user to be deleted
    * @returns the potential result represented as the user who was just 
    * removed or the possible generated error.
    */
   public async deleteUser(userId: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new UserRepository();

         const user = await repository.deleteUser(userId);

         return { result: user };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Removes all the users from the database.
    * @returns the potential result represented as number of deleted users
    * or the possible generated error.
    */
   public async clearUsers(): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new UserRepository();

         const result = await repository.clearAll();

         return { result };
      } catch (error) {
         return { error };
      }
   }
}