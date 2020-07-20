import EntitySchema from '../entitySchema';

import { IInvitation } from '../models/invitation.model';

const schema = new EntitySchema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true
		},
		roleCode: {
			type: String,
			required: true,
			default: null
		},
		hostessId: {
			type: String,
			required: false
		},
		pending: {
			type: Boolean,
			required: false,
			default: true
		},
		expired: {
			type: Boolean,
			required: false,
			default: false
		},
		expirationTime: {
			type: Number,
			required: false,
			default: null
		}
	},
	{ timestamps: true, strict: true, versionKey: false }
);

const Invitation = schema.getModel<IInvitation>('Invitation');

export default Invitation;
