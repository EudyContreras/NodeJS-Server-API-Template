
import PasswordRepository from '../repositories/password.repository';

import { PasswordMessages } from '../messages/message.response';
export default class PasswordService {
	/**
	 * @description Retrieves all the available passwords
	 * @returns A list containing all the passwords or a produced error.
	 */
	public async getAllPasswords(): Promise<{ result?: any[]; error?: any }> {
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
	public async getPasswordFor(userId: string): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new PasswordRepository();

			const result = await repository.getPasswordWhere({ userId });

			if (!result) return { error: PasswordMessages.NO_SUCH_PASSWORD };

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
	public async createPassword(password: any): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new PasswordRepository();

			const result = await repository.insertPassword(password);

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
	public async deletePassword(passwordId: string): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new PasswordRepository();

			const result = await repository.deletePassword(passwordId);

			return { result };
		} catch (error) {
			return { error };
		}
	}
}
