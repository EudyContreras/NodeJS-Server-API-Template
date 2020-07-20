import Joi from '@hapi/joi';

import config from '../../../../configs/config.server';

import { SchemaValidation } from '../../../messages/message.validation';

export const CREDENTIALS = Symbol('credentials');

export const schamaType = {
	CREDENTIALS
};

export const validateCredentials = (data: any): any => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(config.validation.passwords.MIN_LENGTH).max(config.validation.passwords.MAX_LEGHTH)
	});

	return {
		message: SchemaValidation.CREATE_DATA('credentials'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export default schamaType;
