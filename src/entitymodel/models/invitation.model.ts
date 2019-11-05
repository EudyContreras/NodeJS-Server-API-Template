
import { Document } from 'mongoose';

export interface IInvitation extends Document {
   email: string,
   roleCode: string,
   hostId: string | null,
   pending: boolean,
   expired: boolean,
   expirationTime: number | null,
}