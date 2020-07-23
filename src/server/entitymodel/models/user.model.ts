import { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	roleCode: string;
	password: string;
	active: boolean;
	lastLogin: Date | null;
}
