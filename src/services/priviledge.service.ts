
import PriviledgeRespository from '../repositories/priviledge.respository';

import { UserMessages, PriviledgeMessages } from '../messages/message.response';

export default class AccessPriviledgeService {

   /**
    * @description Retrieves the priviledges for the user matching the given
    * user id which also match the specified query criteria.
    * @param userId The user id attached to the priviledges to retrieve.
    * @param  query The criteria that the priviledges need to fulfill.
    * @returns A list of the matched priviledges or a produced error.
    */
   async getPriviledges(userId: string, query: any): Promise<{ result?: any[], error?: any }> {
      try {
         const repository = new PriviledgeRespository();

         query.userId = userId

         const priviledges = await repository.getAllPriviledgesWhere(query);

         return { result: priviledges };
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
   async hasPriviledges(userId: any, query: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new PriviledgeRespository();

         query.userId = userId

         const hasPriviledge = await repository.hasPriviledgeWhere(query);

         return { result: hasPriviledge };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Creates a new priviledge based on the given data.
    * @param priviledge The data containing information about the new priviledge.
    * @returns The newly created priviledge or a produced error.
    */
   async addPriviledge(priviledge: any): Promise<{ result?: any, error?: any }> {
      const userId = priviledge.userId;
      const actionId = priviledge.actionId;
      const controllerId = priviledge.controllerId;

      const data = {
         userId: userId,
         actionId: actionId,
         controllerId: controllerId
      };

      try {
         const repository = new PriviledgeRespository();

         const result = await repository.updateOrInsertPriviledge(data, data);

         return { result };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Revokes/deletes a new priviledge that matches the specified
    * action data for the specified user id.
    * @param userId The user id attached to the priviledges to revoke.
    * @param actionData The data containing information about the priviledge.
    * @returns The revoked priviledge 
    * or a produced error.
    */
   async revokePriviledge(userId: string, data: any): Promise<{ result?: any, error?: any }> {
      try {
         const repository = new PriviledgeRespository();

         data.userId = userId

         const response = await repository.deletePriviledgeWhere(data);

         return { result: response };
      } catch (error) {
         return { error };
      }
   }

   /**
    * @description Revokes/deletes all priviledges for the specified user id.
    * @param userId The user id attached to the priviledges to revoke.
    * @returns The number of priviledges that have been revoked or a produced error.
    */
   async revokeAllPriviledges(userId: string) {
      try {
         const repository = new PriviledgeRespository();

         const query = { userId: userId };

         const response = await repository.clearAllWhere(query);

         return { result: response };
      } catch (error) {
         return { error };
      }
   }
}