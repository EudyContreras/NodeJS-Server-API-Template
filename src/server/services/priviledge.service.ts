
import PriviledgeRespository from '../repositories/priviledge.respository';

import { PriviledgeMessages } from '../messages/message.response';

export default class AccessPriviledgeService {

	/**
	 * @description Retrieves the priviledges for the user matching the given
	 * user id which also match the specified query criteria.
	 * @param  query The criteria that the priviledges need to fulfill.
	 * @returns A list of the matched priviledges or a produced error.
	 */
	public async getPriviledges(query: any): Promise<{ result?: any[]; error?: any }> {
		try {
			const repository = new PriviledgeRespository();

			const result = await repository.getAllPriviledgesWhere(query);

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Retrieves the priviledges for the user matching the given
	 * user id which also match the specified query criteria.
	 * @param userId The user id attached to the priviledges to retrieve.
	 * @param queryData The criteria that the priviledges need to fulfill.
	 * @returns A list of the matched priviledges or a produced error.
	 */
	public async hasPermission(userId: any, query: any): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new PriviledgeRespository();

			const controller = query.controller;

			const priviledge = await repository.getPriviledgeWhere({ userId, controller });

			if (!priviledge) {
				return { error: PriviledgeMessages.ACCESS_DENIED };
			}
			const hasPermission = priviledge.permissions.some((x) => x === query.permission);

			return { result: hasPermission };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Creates a new priviledge based on the given data.
	 * @param priviledge The data containing information about the new priviledge.
	 * @returns The newly created priviledge or a produced error.
	 */
	public async createPriviledge(priviledge: any): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new PriviledgeRespository();

			const result = await repository.insertPriviledge(priviledge);

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Updates a priviledge based on the given data.
	 * @param priviledge The data containing information about the priviledge.
	 * @returns The newly created priviledge or a produced error.
	 */
	public async updatePriviledge(priviledge: any): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new PriviledgeRespository();

			const { controller, userId } = priviledge;

			const result = await repository.updatePriviledgeWhere({ userId, controller }, priviledge);

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Revokes/deletes a new priviledge that matches the specified
	 * action data for the specified user id.
	 * @param actionData The data containing information about the priviledge.
	 * @returns The revoked priviledge
	 * or a produced error.
	 */
	public async revokePriviledge(data: any): Promise<{ result?: any; error?: any }> {
		try {
			const repository = new PriviledgeRespository();

			const result = await repository.deletePriviledgeWhere(data);

			return { result };
		} catch (error) {
			return { error };
		}
	}

	/**
	 * @description Revokes/deletes all priviledges for the specified user id.
	 * @param userId The user id attached to the priviledges to revoke.
	 * @returns The number of priviledges that have been revoked or a produced error.
	 */
	public async revokeAllPriviledges(userId: string): Promise<any> {
		try {
			const repository = new PriviledgeRespository();

			const query = { userId };

			const result = await repository.clearAllWhere(query);

			return { result };
		} catch (error) {
			return { error };
		}
	}
}
