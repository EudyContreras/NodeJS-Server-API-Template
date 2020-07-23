import EntitySchema from '../entitySchema';

import { IRole } from '../models/role.model';

const schema = new EntitySchema(
	{
		name: {
			unique: true,
			type: String,
			lowercase: true,
			trim: true,
			minlength: 3
		},
		code: {
			type: String,
			unique: true
		},
		level: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 10
		}
	},
	{ timestamps: true, strict: true, versionKey: false }
);

const Role = schema.getModel<IRole>('Role');

export default Role;
