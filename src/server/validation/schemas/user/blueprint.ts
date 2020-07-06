import Joi from '@hapi/joi';
import config from '../../../server.config';

import { SchemaValidation  } from '../../../messages/message.validation';
import { ALL } from '../../../localstore/accessrole.store';

export const USER_CREATE = Symbol('user_create');
export const USER_UPDATE = Symbol('user_update');
export const USER_QUERY = Symbol('user_query');
export const USER_PASSORD = Symbol('user_password');

export const schamaType = {
	USER_QUERY,
	USER_CREATE,
	USER_UPDATE,
	USER_PASSORD
};

export const validateUserCreate = (data: any): any => {

	const schema = Joi.object({
		name: Joi
			.string()
			.required(),
		email: Joi
			.string()
			.required()
			.email(),
		password: Joi
			.string()
			.required()
			.min(config.validation.passwords.MIN_LENGTH)
			.max(config.validation.passwords.MAX_LEGHTH)
	});
	
	return {
		message: SchemaValidation.CREATE_DATA('user'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export const validateUserUpdate = (data: any): any => {

	const schema = Joi.object({
		name: Joi
			.string()
			.optional(),
		email: Joi
			.string()
			.optional()
			.email(),
		active: Joi
			.boolean()
			.optional()
			.required(),
		role: Joi
			.string()
			.optional()
			.allow(...ALL)
			.only(),
		password: Joi
			.string()
			.optional()
			.min(config.validation.passwords.MIN_LENGTH)
			.max(config.validation.passwords.MAX_LEGHTH)
	});
	
	return {
		message: SchemaValidation.CREATE_DATA('user'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};


export const validatePasswordUpdate = (data: any): any => {

	const schema = Joi.object({
		userId: Joi
			.string()
			.required(),
		oldPassword: Joi
			.string()
			.required()
			.min(config.validation.passwords.MIN_LENGTH)
			.max(config.validation.passwords.MAX_LEGHTH),
		newPassword: Joi
			.string()
			.required()
			.min(config.validation.passwords.MIN_LENGTH)
			.max(config.validation.passwords.MAX_LEGHTH)
	});
	
	return {
		message: SchemaValidation.CREATE_DATA('user'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};


export default schamaType;