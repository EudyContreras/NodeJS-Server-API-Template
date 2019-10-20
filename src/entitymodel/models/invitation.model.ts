
import { Document } from 'mongoose';

export interface IInvitation extends Document {
   email: string,
   roleCode: string,
   hostId: string,
   pending: boolean,
   expired: boolean,
   expirationTime: Number,
}