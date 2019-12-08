import EntitySchema from '../entitySchema';
import { IUser } from '../models/user.model';

const schema = new EntitySchema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	roleCode: {
		type: String,
		required: true,
		default: null
	},
	active: {
		type: Boolean,
		required: false,
		default: true
	},
	lastLogin: {
		type: Date,
		required: false
	},
}, { timestamps: true, strict: true, versionKey: false });

const User = schema.getModel<IUser>('User');

export default User;