
import { Document } from 'mongoose';

export interface IUser extends Document {
   invitationId: string;
   roleCode: string,
   name: string,
   email: string,
   password: string,
   lastLogin: Date,
   active: boolean
}
