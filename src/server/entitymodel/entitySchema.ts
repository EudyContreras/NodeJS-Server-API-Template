import mongoose, { Model } from 'mongoose';
import { Schema, SchemaDefinition, SchemaOptions, Document } from 'mongoose';

class EntitySchema extends Schema {
	constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
		super(definition, options);
	}
	
	getModel<T extends Document>(name: string): Model<T, {}>{
		return mongoose.model<T>(name, this);
	}
}

export default EntitySchema;