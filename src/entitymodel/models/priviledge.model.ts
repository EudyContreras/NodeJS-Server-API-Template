
import { Document } from 'mongoose';

export interface IPriviledge extends Document {
   userId: string,
   actionId: string,
   controllerId: string
}