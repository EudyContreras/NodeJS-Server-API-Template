
import PasswordRepository from '../repositories/password.repository';
import { PasswordMessages } from '../messages/message.response'
export default class PasswordService {
   /**
    * @description Retrieves all the available passwords 
    * @returns A list containing all the passwords or a produced error.
    */
   async getAllPasswords(): Promise<{ result?: any[], error?: any }> {
      try {
         const repository = new PasswordRepository();

         const result = await repository.getAllPasswords();

         return { result };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Retrieves the password that matches the password id
    * @param passwordId The id of the password to retrieve
    * @returns The password that matches the given id or a produced error.
    */
   async getPassword(passwordId: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new PasswordRepository();

         const result = await repository.getPassword(passwordId);

         if (!result) return { error: PasswordMessages.NO_SUCH_PASSWORD }
         
         return { result };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Retrives the password code for the password with the matching name.
    * @param name The type name of the password to retrieve.
    * @returns The password that matches the given name or a produced error.
    */
   async getPasswordCode(name: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new PasswordRepository();

         const result = await repository.getPasswordWhere({ name: name });

         if (!result) return { error: PasswordMessages.NO_SUCH_PASSWORD }

         return { result: result.code };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Retrives the password with the matching code.
    * @param passwordCode The code of the password to retrieve.
    * @returns The password that matches the given password code or a produced error.
    */
   async getPasswordByCode(passwordCode: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new PasswordRepository();

         const result = await repository.getPasswordWhere({ code: passwordCode });

         if (!result) return { error: PasswordMessages.NO_SUCH_PASSWORD }

         return { result };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Creates a new password with the specifed data.
    * @param password The password data to use for creating the new password.
    * @returns The password that has just been created or a produced error.
    */
   async createPassword(password: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new PasswordRepository();

         const result = await repository.insertPassword(password);

         return { result };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Updates the password that matches the specified password id.
    * @param passwordId The password id of the password to be updated.
    * @param password The data to use for updating the password.
    * @returns The password that has just been updated or a produced error.
    */
   async updatePassword(passwordId: string, data: any): Promise<{ result?: any, error?: any }> {
      try {
         const update = {
            name: data.name,
            code: data.code
         };

         const repository = new PasswordRepository();

         const result = await repository.updatePassword(passwordId, update);

         return { result };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Deletes the password with the matching id.
    * @param passwordId The id of the password to be deleted.
    * @returns The password that has just been deleted or a produced error.
    */
   async deletePassword(passwordId: string): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new PasswordRepository();

         const result = await repository.deletePassword(passwordId);

         return { result };
      } catch (error) {
         return { error };
      }
   }
}