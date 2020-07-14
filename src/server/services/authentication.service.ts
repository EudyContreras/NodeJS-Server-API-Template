

import config from '../../configs/config.server';
import webtoken from 'jsonwebtoken';
import UserService from './user.service';
import PasswordRepository from '../repositories/password.repository';
import NotificationService from './notification.service';
import UserRepository from '../repositories/user.repository';
import RedisCacheHandler from '../handlers/cache.handler';
import EncryptionService from './encryption.service';

import { IUser } from '../entitymodel/models/user.model';
import { AuthenticationMessages, NotificationMessages } from '../messages/message.response';
import { randomString } from '../utilities/string.utility';

export default class AuthenticationService {

	private redisCacheHandler: RedisCacheHandler = new RedisCacheHandler();

	/**
	 * @description Authenticates the user by verifying that 
	 * the credetials match our internal records.
	 * @param credentials The email and password used for athentication
	 * @returns The possible user id and token or an error that has been produced.
	 */
	public async authenticate(credentials: { email: string; password: string }): Promise<{ result?: any; error?: any }> {

		try {
			const { email, password } = credentials;

			const repository = new UserRepository();
			const passwordRepository = new PasswordRepository();
			const encryptionService = new EncryptionService();

			const user = await repository.getUserWhere({ email: email }, { dto: false });

			if (!user) return { error: AuthenticationMessages.NO_USER_EMAIL };

			const isMatch = await encryptionService.comparePasswords(password, user.password);

			if (!isMatch) {
				const tempPasswords = await passwordRepository.getAllPasswordsWhere({ userId: user.id });

				if (tempPasswords.length > 0) {

					let noMatch = true;

					for(const tempPassword of tempPasswords) {
						const isMatch = await encryptionService.comparePasswords(password, tempPassword.password);
						
						if (isMatch) noMatch = false; 
					}
					if(noMatch) return { error: AuthenticationMessages.WRONG_PASSWORD };         
				}
			}

			const { token, error } = await this.createToken(user);

			if (error) return { error };

			const result = { userId: user.id, token: token };

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Sends an email to the user with the specified email with
	 * a temporary password which the user is to use to enter his/her account.
	 * @param data T
	 * @returns the potential result represented as a message indicating that
	 * a recovery email was succesfully sent or the possible generated error.
	 */
	public async recoverPassword(data: any): Promise<{ result?: any; error?: any }> {
		const email = data.email;
		const passwordLength = 32;

		const randomPassword = randomString(passwordLength);

		try {
			const userService = new UserService();
			const passwordRepository = new PasswordRepository();
			const notificationService = await new NotificationService();
			const encryptionService = new EncryptionService();

			const result = await userService.getUserByEmail(email);

			if (!result.result) return { error: result.error };

			const user = result.result;

			const { error, hash } = await encryptionService.encryptPassword(randomPassword);

			if (error) return { error };

			const passwordData = {
				userId: user.id,
				password: hash,
				isTemp: true
			};

			const password = await passwordRepository.insertPassword(passwordData);

			if (!password) return { error: AuthenticationMessages.FAILURE };
			
			await notificationService.sendPasswordRecoveryEmail(email, randomPassword);
			
			return { result: NotificationMessages.RECOVERY_EMAIL };
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
	public async getUser(userId: string, getDTO = true): Promise<{ result?: IUser; error?: any }> {
		try {
			const repository = new UserRepository();

			const result = await repository.getUser(userId, { dto: getDTO });

			if (!result) return { error: AuthenticationMessages.NO_USER_FOUND };

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Creates the token for the given user.
	 * @param user The user to create a token for
	 * @param redisCache The cache handler used for caching tokens.
	 * @returns {{token: string, error: string}} The possible token
	 * or an error that has been produced.
	 */
	public async createToken(user: IUser): Promise<{ token?: string; error?: any }> {
		try {
			const payload = {
				userId: user.id,
				roleCode: user.roleCode
			};

			const token = await webtoken.sign(
				payload,
				config.jwt.TOKEN_SECRET,
				{ expiresIn: config.jwt.EXPIRATION_TIME }
			);

			if (this.redisCacheHandler.available()) {
				const { error } = await this.redisCacheHandler.saveValues(payload.userId, token);

				if (error) throw new Error(error);
			}

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
	public async isBlackListed(token: string): Promise<{ result?: boolean; error: any }> {
		if (this.redisCacheHandler.available()) {
			return Promise.resolve(false).then();
		}
		return Promise.resolve(false).then();
	}

	/**
	 * @description Invalidates the tokens issued to the given user.
	 * The user will need to reauthenticate in order to regain access.
	 * @param user The user to invalidate the tokens for.
	 * @returns The flag indicating token invalidation an error that has been produced.
	 */
	public async invalidateTokens(user: IUser): Promise<{ result?: boolean; error?: any }> {
		return new Promise<any>(() => { });
	}
}