import Priviledge from '../entitymodel/entities/priviledge.entity'
import { IPriviledge } from '../entitymodel/models/priviledge.model'

function dataTransferDocument(priviledge: any) {
   const dto = {
      id: priviledge.id,
      email: priviledge.email,
      name: priviledge.name
   };
   return dto;
}

/**
 * Data access layer Repository used
 * for interfacing with the priviledge data.
 */
class PriviledgeRepository {

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

   async hasPriviledge(priviledgeId: string) {
      const count = await Priviledge
         .countDocuments({ _id: priviledgeId })
         .exec();

      return count > 0;
   }

   async hasPriviledgeWhere(query: any) {
      const count = await Priviledge
         .countDocuments(query)
         .exec();

      return count > 0;
   }

   async getAllPriviledges(options = { dto: true }) {
      const priviledges = await Priviledge
         .find()
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return priviledges.map(x => dataTransferDocument((x as any).toClient()));
      }

      return priviledges.map(x => (x as any).toClient());
   }

   async getAllPriviledgesWhere(query: any, options = { dto: true }) {
      const priviledges = await Priviledge
         .find(query)
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return priviledges.map(x => dataTransferDocument((x as any).toClient()));
      }

      return priviledges.map(x => (x as any).toClient());
   }

   async getPriviledge(priviledgeId: string, options = { dto: true }) {
      const priviledge = await Priviledge
         .findById(priviledgeId)
         .select(this.exclude)
         .exec();

      const result = priviledge ? (priviledge as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getPriviledgeWhere(criteria: any, options = { dto: true }) {
      const priviledge = await Priviledge
         .findOne(criteria)
         .select(this.exclude)
         .exec();

      const result = priviledge ? (priviledge as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getFromPriviledge(priviledgeId: string, select: any) {
      const priviledge = await Priviledge
         .findById(priviledgeId)
         .select(select)
         .exec();

      const result = priviledge ? (priviledge as any).toClient() : null;

      return result;
   }

   async insertPriviledge(data: any, options = { dto: true }) {
      const priviledge = new Priviledge(data);

      await priviledge.validate();

      const saved = await priviledge.save(this.options);

      const result = saved ? (saved as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateOrInsertPriviledge(query: any, update: any) {
      const priviledge = await Priviledge
         .updateOne(query, update, this.options)
         .select(this.exclude);

      return priviledge;
   }

   async updatePriviledge(priviledgeId: string, update: any, options = { dto: true }) {
      const priviledge = await Priviledge
         .findByIdAndUpdate(priviledgeId, update, this.options)
         .select(this.exclude)
         .exec();

      const result = priviledge ? (priviledge as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updatePriviledgeWhere(query: any, update: any, options = { dto: true }) {
      const priviledge = await Priviledge
         .findOneAndUpdate(query, update, this.options)
         .select(this.exclude)
         .exec();

      const result = priviledge ? (priviledge as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deletePriviledge(priviledgeId: string, options = { dto: true }) {
      const priviledge = await Priviledge
         .findByIdAndDelete(priviledgeId)
         .exec();

      const result = priviledge ? (priviledge as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deletePriviledgeWhere(query: any, options = { dto: true }) {
      const priviledge = await Priviledge
         .findOneAndDelete(query)
         .exec();

      const result = priviledge ? (priviledge as any).toClient() : null;

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

export default PriviledgeRepository;