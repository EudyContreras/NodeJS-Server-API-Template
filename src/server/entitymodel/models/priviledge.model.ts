
import { Document } from 'mongoose';

export interface IPriviledge extends Document {
   userId: string;
   permissions: string[];
   controller: string;
}
