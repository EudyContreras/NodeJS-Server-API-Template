import becrypt from 'bcryptjs';
import config from '../config';

export default class EncryptionService {
   /**
    * @description Compares the old password as plain text with the current 
    * hashed and salted password.
    * @param oldPassword The password input as plain text
    * @param currentPassword The current password as a hash.
    * @returns True if the passwords match otherwise false.
    */
   public async comparePasswords(oldPassword: string, currentPassword: string) {
      return await becrypt.compare(oldPassword, currentPassword);
   }

   /**
    * @description Used for encrypting passwords by hashing using salt.
    * @param password The password to be encrypted
    * @param iterations The number of iterations used for creating the hash salt. 
    * @returns The hashed and salted password or a generated error.
    */
   public async encryptPassword(password?: string, iterations = config.encryption.SALT_ITERATIONS): Promise<{ hash?: string, error?: any }> {
      if (!password) return { error: new Error('The given password is empty or null') };

      try {
         const salt = await becrypt.genSaltSync(iterations);
         const hash = await becrypt.hashSync(password, salt);

         return { hash };
      } catch (error) {
         return { error };
      }
   }
}