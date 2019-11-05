import Password from '../entitymodel/entities/password.entity'
import { IPassword } from '../entitymodel/models/password.model';

function dataTransferDocument(data: IPassword) {
   const { userId, password, isTemp} = data;
   return { userId, password, isTemp};
}

/**
 * Data access layer Repository used
 * for interfacing with the password data.
 */
export default class PasswordRepository {

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

   async hasPassword(passwordId: string) {
      const count = await Password
         .countDocuments({ _id: passwordId })
         .exec();

      return count > 0;
   }

   async hasPasswordWhere(query: any) {
      const count = await Password
         .countDocuments(query)
         .exec();

      return count > 0;
   }

   async getAllPasswords(options = { dto: true }) {
      const passwords = await Password
         .find()
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return passwords.map(x => dataTransferDocument(x));
      }

      return passwords;
   }

   async getAllPasswordsWhere(query: any, options = { dto: true }) {
      const passwords = await Password
         .find(query)
         .select(this.exclude)
         .exec();

      if (options.dto === true) {
         return passwords.map(x => dataTransferDocument(x));
      }

      return passwords;
   }

   async getPassword(passwordId: string, options = { dto: true }) {
      const password = await Password
         .findById(passwordId)
         .select(this.exclude)
         .exec();

      const result = password ? password : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getPasswordWhere(criteria: any, options = { dto: true }) {
      const password = await Password
         .findOne(criteria)
         .select(this.exclude)
         .exec();

      const result = password ? password : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async getFromPassword(passwordId: string, select: any) {
      const password = await Password
         .findById(passwordId)
         .select(select)
         .exec();

      const result = password ? password : null;

      return result;
   }

   async insertPassword(data: any, options = { dto: true }) {
      const password = new Password(data);

      await password.validate();

      const saved = await password.save(this.options);

      const result = saved ? saved : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updatePassword(passwordId: string, update: any, options = { dto: true }) {
      const password = await Password
         .findByIdAndUpdate(passwordId, update, this.options)
         .select(this.exclude)
         .exec();

      const result = password ? password : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async updatePasswordWhere(query: any, update: any, options = { dto: true }) {
      const password = await Password
         .findOneAndUpdate(query, update, this.options)
         .select(this.exclude)
         .exec();

      const result = password ? password : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deletePassword(passwordId: string, options = { dto: true }) {
      const password = await Password
         .findByIdAndDelete(passwordId)
         .exec();

      const result = password ? password : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async deletePasswordWhere(query: any, options = { dto: true }) {
      const password = await Password
         .findOneAndDelete(query)
         .exec();

      const result = password ? password : null;

      if (options.dto === true && result != null) {
         return dataTransferDocument(result);
      }

      return result;
   }

   async clearAllWhere(query: any) {
      return await Password
         .deleteMany(query)
         .exec();
   }

   async clearAll() {
      return await Password
         .deleteMany({})
         .exec();
   }
}