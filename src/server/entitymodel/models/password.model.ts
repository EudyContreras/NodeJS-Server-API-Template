import { Document } from 'mongoose';

export interface IPassword extends Document {
	userId: string;
	password: string;
	active: boolean;
	isTemp: boolean;
	expiresIn: number;
}
