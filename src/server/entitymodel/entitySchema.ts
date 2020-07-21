import mongoose, { Model, Schema, Document } from 'mongoose';

class EntitySchema extends Schema {
	getModel<T extends Document>(name: string): Model<T, unknown> {
		return mongoose.model<T>(name, this);
	}
}

export default EntitySchema;
