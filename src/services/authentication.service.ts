

import vault from '../config/vault';
import webtoken from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import RedisCacheHandler from '../handlers/cache.handler';
import EncryptionService from './encryption.service';

import { IUser } from '../entitymodel/models/user.model'
import { AuthenticationMessages } from '../messages/message.response';

export default class AuthenticationService {

   /**
    * @description Authenticates the user by verifying that 
    * the credetials match our internal records.
    * @param credentials The email and password used for athentication
    * @returns The possible user id and token or an error that has been produced.
    */
   async authenticate(credentials: { email: string, password: string }): Promise<{ result?: any, error?: any }> {

      try {
         const { email, password } = credentials;

         const redisCacheHandler = new RedisCacheHandler();
         const encryptionService = new EncryptionService();

         const repository = new UserRepository();

         const user = await repository.getUserWhere({ email: email }, { dto: false });

         if (!user) return { error: AuthenticationMessages.NO_USER_EMAIL };

         const isMatch = await encryptionService.comparePasswords(password, user.password);

         if (!isMatch) return { error: AuthenticationMessages.WRONG_PASSWORD };

         const { token, error } = await this.createToken(user, redisCacheHandler);

         if (error) return { error };

         const result = { userId: user.id, token: token };

         return { result };
      } catch (error) {
         return { error };
      }
   }

   /**
   * @description Retrieves the user data for the user with the
   * matching id.
   * @param userId The user id of the user to retrieve
   * credentials for.
   * @param getDTO Flag for determine if the a dto should
   * be returned
   * @returns The possible user or an error that has been produced.
   */
   async getUser(userId: string, getDTO: boolean = false): Promise<{ result?: IUser, error?: any }> {
      try {
         const repository = new UserRepository();

         const result = await repository.getUser(userId, { dto: getDTO });

         if (!result) return { error: AuthenticationMessages.NO_USER_FOUND };

         return { result };
      } catch (error) {
         return { error }
      }
   }

   /**
    * @description Creates the token for the given user.
    * @param user The user to create a token for
    * @param redisCache The cache handler used for caching tokens.
    * @returns {{token: string, error: string}} The possible token
    * or an error that has been produced.
    */
   async createToken(user: IUser, redisCache: RedisCacheHandler): Promise<{ token?: string, error?: any }> {
      try {
         const payload = {
            userId: user.id,
            roleCode: user.roleCode
         };

         const token = await webtoken.sign(
            payload,
            vault.jwt.TOKEN_SECRET,
            { expiresIn: vault.jwt.EXPIRATION_TIME }
         );

         const { error } = await redisCache.saveValues(payload.userId, token);

         if (error) throw new Error(error);

         return { token };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Checks if the given token is black listed and no longer valid.
    * A token is blacklisted when a new token has been issued to the same user.
    * @param token The token to be checked.
    * @returns true if the token is found in the blacklist
    * records and false if it isnt.
    */
   async isBlackListed(token: string): Promise<{ result?: boolean; error: any; }> {
      return new Promise<any>(() => { });
   }

   /**
    * @description Invalidates the tokens issued to the given user.
    * The user will need to reauthenticate in order to regain access.
    * @param user The user to invalidate the tokens for.
    * @returns The flag indicating token invalidation an error that has been produced.
    */
   async invalidateTokens(user: IUser): Promise<{ result?: boolean, error?: any }> {
      return new Promise<any>(() => { });
   }
}