import mongoose from 'mongoose';
import { Schema, SchemaDefinition, SchemaOptions, Document } from 'mongoose';

class EntitySchema extends Schema {
   constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
      super(definition, options)

      this.method('toClient', () => {
         let model = this.obj;
         model.id = model._id;
         delete model._id;
         delete model.__v;
         return model;
      });
   }
   
   getModel<T extends Document>(name: string) {
      return mongoose.model<T>(name, this);
   }

   toClient() {
      let model = this.obj;
      model.id = model._id;
      delete model._id;
      delete model.__v;
      return model;
   }
}

export default EntitySchema;