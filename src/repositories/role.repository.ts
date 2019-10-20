import Role from '../entitymodel/entities/role.entity'
import { IRole } from '../entitymodel/models/role.model'

function dataTransferDocument(role: any) {
   const dto = {
      id: role.id,
      email: role.email,
      name: role.name
   };
   return dto;
}

/**
 * Data access layer Repository used
 * for interfacing with the role data.
 */
class RoleRepository {

   private exclude: any;
   private options: any;

   constructor() {
      this.exclude = {
         roles: false,
         roleId: false
      };
      this.options = {
         new: true,
         upsert: false,
         useFindAndModify: false,
         runValidators: true
      };
   }

   async hasRole(roleId: string) {
      const count = await Role
         .countDocuments({ _id: roleId })
         .exec();

      return count > 0;
   }

   async hasRoleWhere(query: any) {
      const count = await Role
         .countDocuments(query)
         .exec();

      return count > 0;
   }

   async getAllRoles(options = { dto: true }) {
      const roles = await Role
         .find()
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return roles.map(x => dataTransferDocument((x as any).toClient()));
      }

      return roles.map(x => (x as any).toClient());
   }

   async getAllRolesWhere(query: any, options = { dto: true }) {
      const roles = await Role
         .find(query)
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return roles.map(x => dataTransferDocument((x as any).toClient()));
      }

      return roles.map(x => (x as any).toClient());
   }

   async getRole(roleId: string, options = { dto: true }) {
      const role = await Role
         .findById(roleId)
         .select(this.exclude)
         .exec();

      const result = role ? (role as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getRoleWhere(criteria: any, options = { dto: true }) {
      const role = await Role
         .findOne(criteria)
         .select(this.exclude)
         .exec();

      const result = role ? (role as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getFromRole(roleId: string, select: any) {
      const role = await Role
         .findById(roleId)
         .select(select)
         .exec();

      const result = role ? (role as any).toClient() : null;

      return result;
   }

   async insertRole(data: IRole, options = { dto: true }) {
      const role = new Role(data);

      await role.validate();

      const saved = await role
         .save(this.options)
         .then();

      const result = saved ? (saved as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateRole(roleId: string, update: any, options = { dto: true }) {
      const role = await Role
         .findByIdAndUpdate(roleId, update, this.options)
         .select(this.exclude)
         .exec();

      const result = role ? (role as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateRoleWhere(query: any, update: any, options = { dto: true }) {
      const role = await Role
         .findOneAndUpdate(query, update, this.options)
         .select(this.exclude)
         .exec();

      const result = role ? (role as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deleteRole(roleId: string, options = { dto: true }) {
      const role = await Role
         .findByIdAndDelete(roleId)
         .exec();

      const result = role ? (role as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deleteRoleWhere(query: any, options = { dto: true }) {
      const role = await Role
         .findOneAndDelete(query)
         .exec();

      const result = role ? (role as any).toClient() : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async clearAllWhere(query: any) {
      return await Role
         .deleteMany(query)
         .exec();
   }

   async clearAll() {
      return await Role
         .deleteMany({})
         .exec();
   }
}

export default RoleRepository;