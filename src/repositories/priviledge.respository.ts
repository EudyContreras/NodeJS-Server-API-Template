import Priviledge from '../entitymodel/entities/priviledge.entity'
import { IPriviledge } from '../entitymodel/models/priviledge.model';

function dataTransferDocument(data: IPriviledge) {
   const { userId, actionId, controllerId } = data;
   return { userId, actionId, controllerId };
}

/**
 * @description Data access layer Repository used
 * for interfacing with the priviledge data.
 */
export default class PriviledgeRepository {

   private exclude: any;
   private options: any;

   constructor() {
      this.exclude = null;
      
      this.options = {
         new: true,
         upsert: true,
         useFindAndModify: false,
         runValidators: true
      };
   }

   async hasPriviledge(priviledgeId: string): Promise<boolean> {
      const count = await Priviledge
         .countDocuments({ _id: priviledgeId })
         .exec();

      return count > 0;
   }

   async hasPriviledgeWhere(query: any): Promise<boolean> {
      const count = await Priviledge
         .countDocuments(query)
         .exec();

      return count > 0;
   }

   async getAllPriviledges(options = { dto: true }): Promise<IPriviledge[] | any[]>  {
      const priviledges = await Priviledge
         .find()
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return priviledges.map(x => dataTransferDocument(x));
      }

      return priviledges;
   }

   async getAllPriviledgesWhere(query: any, options = { dto: true }): Promise<IPriviledge[] | any[]>  {
      const priviledges = await Priviledge
         .find(query)
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return priviledges.map(x => dataTransferDocument(x));
      }

      return priviledges;
   }

   async getPriviledge(priviledgeId: string, options = { dto: true }): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .findById(priviledgeId)
         .select(this.exclude)
         .exec();

      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getPriviledgeWhere(criteria: any, options = { dto: true }): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .findOne(criteria)
         .select(this.exclude)
         .exec();

      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getFromPriviledge(priviledgeId: string, select: any): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .findById(priviledgeId)
         .select(select)
         .exec();

      const result = priviledge ? priviledge : null;

      return result;
   }

   async insertPriviledge(data: any, options = { dto: true }): Promise<IPriviledge | any>  {
      const priviledge = new Priviledge(data);

      await priviledge.validate();

      const saved = await priviledge.save(this.options);

      const result = saved ? saved : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateOrInsertPriviledge(query: any, update: any): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .updateOne(query, update, this.options)
         .select(this.exclude);

      return priviledge;
   }

   async updatePriviledge(priviledgeId: string, update: any, options = { dto: true }): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .findByIdAndUpdate(priviledgeId, update, this.options)
         .select(this.exclude)
         .exec();

      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updatePriviledgeWhere(query: any, update: any, options = { dto: true }): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .findOneAndUpdate(query, update, this.options)
         .select(this.exclude)
         .exec();

      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deletePriviledge(priviledgeId: string, options = { dto: true }): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .findByIdAndDelete(priviledgeId)
         .exec();

      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deletePriviledgeWhere(query: any, options = { dto: true }): Promise<IPriviledge | any>  {
      const priviledge = await Priviledge
         .findOneAndDelete(query)
         .exec();

      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async clearAllWhere(query: any) {
      return await Priviledge
         .deleteMany(query)
         .exec();
   }

   async clearAll() {
      return await Priviledge
         .deleteMany({})
         .exec();
   }
}