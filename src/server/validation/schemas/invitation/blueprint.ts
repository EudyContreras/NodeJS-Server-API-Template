import Joi from '@hapi/joi';

import { ALL } from '../../../localstore/accessrole.store';
import { SchemaValidation  } from '../../../messages/message.validation';

export const INVITATION_CREATE = Symbol('invitation_create');
export const INVITATION_UPDATE = Symbol('invitation_update');
export const INVITATION_QUERY = Symbol('invitation_query');

export const schamaType = {
	INVITATION_CREATE,
	INVITATION_UPDATE,
	INVITATION_QUERY
};

export const validateInviteCreate = (data: any): any => {

	const schema = Joi.object({
		email: Joi
			.string()
			.required()
			.email(),
		role: Joi
			.string()
			.required()
			.allow(...ALL)
			.only(),
		expirationTime: Joi
			.number()
			.optional()
	});

	return {
		message: SchemaValidation.CREATE_DATA('invitation'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export const validateInviteUpdate = (data: any): any => {

	const schema = Joi.object({
		email: Joi
			.string()
			.optional()
			.email(),
		role: Joi
			.string()
			.optional()
			.allow(...ALL)
			.only(),
		expirationTime: Joi
			.number()
			.optional()
	});

	return {
		message: SchemaValidation.UPDATE_DATA('invitation'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export const validateInviteQuery = (data: any): any => {
	const { id, inviteId } = data;

	if (id) {
		data._id = id;
		delete data.id;
	}
	if (inviteId) {
		data._id = inviteId;
		delete data.inviteId;
	}

	const schema = Joi.object({
		_id: Joi
			.string()
			.optional(),
		inviteId: Joi
			.string()
			.optional(),
		email: Joi
			.string()
			.optional()
			.email(),
		role: Joi
			.string()
			.optional()
			.allow(...ALL)
			.only()
	}).or('_id', 'email');

	return {
		message: SchemaValidation.FETCH_DATA('invitation'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export default schamaType;
