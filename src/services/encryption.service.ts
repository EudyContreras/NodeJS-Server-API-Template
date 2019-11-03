import becrypt from 'bcryptjs';
import vault from '../config/vault';

export default class EncryptionService {
   /**
    * @description Compares the old password as plain text with the current 
    * hashed and salted password.
    * @param oldPassword The password input as plain text
    * @param currentPassword The current password as a hash.
    * @returns {boolean} A boolean containing the result.
    */
   async comparePasswords(oldPassword: string, currentPassword: string) {
      return await becrypt.compare(oldPassword, currentPassword);
   }

   /**
    * @description Used for encrypting passwords by hashing using salt.
    * @param password The password to be encrypted
    * @param iterations The number of iterations used for creating the hash salt. 
    * @returns {{password: string, error: Error}} The hashed and salted password
    * or a generated error.
    */
   async encryptPassword(password?: string, iterations = vault.encryption.SALT_ITERATIONS): Promise<{ password?: string, error?: any }> {
      if (!password) return { error: new Error('The given password is empty or null') };

      try {
         const salt = await becrypt.genSaltSync(iterations);
         const hash = await becrypt.hashSync(password, salt);

         return { password: hash };
      } catch (error) {
         return { error: error };
      }
   }
}