import EntitySchema from '../entitySchema';

import { IInvitation } from '../models/invitation.model';

const schema = new EntitySchema({
   email: {
      type: String,
      required: [true, 'The user email is required'],
      trim: true,
      unique: [true, 'The email of the invited user must be unique!']
   },
   roleCode: {
      type: String,
      required: [true, 'The user role code is required'],
      default: null
   },
   hostessId: {
      type: String,
      required: true,
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
}, { timestamps: true, strict: false, versionKey: false });

const Invitation = schema.getModel<IInvitation>('Invitation');

export default Invitation;