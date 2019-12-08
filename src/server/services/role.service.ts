

import UserRepository from '../repositories/user.repository';
import AccessRoleRepository from '../repositories/role.repository';

import { AccessRoleMessages, UserMessages } from '../messages/message.response';

export default class AccessRoleService {
	/**
	 * @description Retrieves all the available roles 
	 * @returns A list containing all the roles or a produced error.
	 */
	public async getAllRoles(): Promise<{ result?: any[]; error?: any }> {
		try {
			const repository = new AccessRoleRepository();

			const result = await repository.getAllRoles();

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Retrieves the role that matches the role id
	 * @param roleId The id of the role to retrieve
	 * @returns The role that matches the given id or a produced error.
	 */
	public async getRole(roleId: string): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new AccessRoleRepository();

			const result = await repository.getRole(roleId);

			if (!result) return { error: AccessRoleMessages.NO_SUCH_ROLE };
			
			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Retrives the role code for the role with the matching name.
	 * @param name The type name of the role to retrieve.
	 * @returns The role that matches the given name or a produced error.
	 */
	public async getRoleCode(name: string): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new AccessRoleRepository();

			const result = await repository.getRoleWhere({ name: name });

			if (!result) return { error: AccessRoleMessages.NO_SUCH_ROLE };

			return { result: result.code };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Retrives the role with the matching code.
	 * @param roleCode The code of the role to retrieve.
	 * @returns The role that matches the given role code or a produced error.
	 */
	public async getRoleByCode(roleCode: string): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new AccessRoleRepository();

			const result = await repository.getRoleWhere({ code: roleCode });

			if (!result) return { error: AccessRoleMessages.NO_SUCH_ROLE };

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Retrieves the role for the user with the specified id.
	 * @param userId The id of the user.
	 * @returns The role that matches the given id or a produced error.
	 */
	public async getUserRole(userId: string): Promise<{ result?: any; error?: any }> {
		try {
			const userRepository = new UserRepository();
			const roleRepostiory = new AccessRoleRepository();

			const user = await userRepository.getUser(userId, { dto: false });

			if (!user) return { error: UserMessages.NO_SUCH_USER };

			const result = await roleRepostiory.getRoleWhere({ code: user.roleCode });

			if (!result) return { error: AccessRoleMessages.NO_SUCH_ROLE };

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Creates a new role with the specifed data.
	 * @param role The role data to use for creating the new role.
	 * @returns The role that has just been created or a produced error.
	 */
	public async createRole(role: any): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new AccessRoleRepository();

			const exists = await repository.hasRoleWhere({ name: role.name });

			if (exists) return { error: AccessRoleMessages.ROLE_EXIST };

			const result = await repository.insertRole(role);

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Updates the role that matches the specified role id.
	 * @param roleId The role id of the role to be updated.
	 * @param role The data to use for updating the role.
	 * @returns The role that has just been updated or a produced error.
	 */
	public async updateRole(roleId: string, data: any): Promise<{ result?: any; error?: any }> {
		try {
			const update = {
				name: data.name,
				code: data.code
			};

			const repository = new AccessRoleRepository();

			const result = await repository.updateRole(roleId, update);

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Deletes the role with the matching id.
	 * @param roleId The id of the role to be deleted.
	 * @returns The role that has just been deleted or a produced error.
	 */
	public async deleteRole(roleId: string): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new AccessRoleRepository();

			const result = await repository.deleteRole(roleId);

			return { result };
		} catch (error) {
			return { error };
		}
	}
}