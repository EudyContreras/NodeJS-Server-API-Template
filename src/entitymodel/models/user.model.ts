
import { Document } from 'mongoose';

export interface IUser extends Document {
   name: string,
   email: string,
   roleCode: string,
   password: string,
   lastLogin: Date | null,
   active: boolean
}
