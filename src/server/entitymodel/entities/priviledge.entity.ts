import EntitySchema from '../entitySchema';

import { IPriviledge } from '../models/priviledge.model';

const schema = new EntitySchema({
	userId: {
		type: String,
		required: true
	},
	permissions: [{
		type: String,
		trim: true,
		lowercase: true,
		required: true
	}],
	controller: {
		type: String,
		trim: true,
		lowercase: true,
		minlength: 3,
		required: true
	}
}, { timestamps: false, strict: false, versionKey: false });

schema.index({ userId: 1, controller: 1 }, { unique: true });

const Priviledge = schema.getModel<IPriviledge>('Priviledge');

export default Priviledge;
