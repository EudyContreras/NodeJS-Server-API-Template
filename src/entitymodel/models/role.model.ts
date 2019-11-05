
import { Document } from 'mongoose';

export interface IRole extends Document {
   name: string,
   code: string,
   level: number
}