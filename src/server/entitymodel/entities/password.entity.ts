import EntitySchema from '../entitySchema';

import { IPassword } from '../models/password.model';

const schema = new EntitySchema({
	userId: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: false
	},
	expiresIn: {
		type: Number,
		required: false,
		default: 172800
	},
	isTemp: {
		type: Boolean,
		required: true
	}
}, { timestamps: true, strict: true, versionKey: false });

const Password = schema.getModel<IPassword>('Password');

export default Password;
