import User from '../entitymodel/entities/user.entity';
import dateUtility from '../utilities/date.utility';
import { IUser } from '../entitymodel/models/user.model';

function dataTransferDocument(user: IUser) {
   return {
      id: user._id,
      name: user.name,
      email: user.email,
      lastLogin: user.lastLogin,
      roleCode: user.roleCode,
      active: user.active,
      createdAt: dateUtility.normalize(new Date((user as any).createdAt)),
      updatedAt: dateUtility.normalize(new Date((user as any).updatedAt))
   }
}

function normalized(user: IUser) {
   return user;
}

/**
 * @description Data access layer Repository used
 * for interfacing with the user data.
 */
export default class UserRepository {

   private exclude: any;
   private options: any;

   constructor() {
      this.exclude = null;

      this.options = {
         new: true,
         upsert: false,
         useFindAndModify: false,
         runValidators: true
      };
   }

   async hasUser(userId: string): Promise<boolean> {
      const count = await User
         .countDocuments({ _id: userId })
         .exec();

      return count > 0;
   }

   async hasUserWhere(query: any): Promise<boolean> {
      const count = await User
         .countDocuments(query)
         .exec();

      return count > 0;
   }

   async getAllUsers(options = { dto: true }): Promise<IUser[] | any[]>  {
      const users = await User
         .find()
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return users.map(x => dataTransferDocument(x));
      }

      return users;
   }

   async getAllUsersWhere(query: any, options = { dto: true }): Promise<IUser[] | any[]>  {
      const users = await User
         .find(query)
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return users.map(x => dataTransferDocument(x));
      }

      return users;
   }

   async getUser(userId: string, options = { dto: true }): Promise<IUser | any>  {
      const user = await User
         .findById(userId)
         .select(this.exclude)
         .exec();

      const result = user ? user : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getUserWhere(criteria: any, options = { dto: true }): Promise<IUser | any>  {
      const user = await User
         .findOne(criteria)
         .select(this.exclude)
         .exec();

      const result = user ? user : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getFromUser(userId: string, select: any): Promise<IUser | any>  {
      const user = await User
         .findById(userId)
         .select(select)
         .exec();

      const result = user ? user : null;

      return result;
   }

   async insertUser(data: any, options = { dto: true }): Promise<IUser | any>  {
      const user = new User(data);

      await user.validate();

      const saved = await user.save(this.options);

      const result = saved ? saved : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateUser(userId: string, update: any, options = { dto: true }): Promise<IUser | any>  {
      const user = await User
         .findByIdAndUpdate(userId, update, this.options)
         .select(this.exclude)
         .exec();

      const result = user ? user : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updateUserWhere(query: any, update: any, options = { dto: true }): Promise<IUser | any>  {
      const user = await User
         .findOneAndUpdate(query, update, this.options)
         .select(this.exclude)
         .exec();

      const result = user ? user : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deleteUser(userId: string, options = { dto: true }): Promise<IUser | any>  {
      const user = await User
         .findByIdAndDelete(userId)
         .exec();

      const result = user ? user : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deleteUserWhere(query: any, options = { dto: true }): Promise<IUser | any>  {
      const user = await User
         .findOneAndDelete(query)
         .exec();

      const result = user ? user : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async clearAllWhere(query: any) {
      return await User
         .deleteMany(query)
         .exec();
   }

   async clearAll() {
      return await User
         .deleteMany({})
         .exec();
   }
}