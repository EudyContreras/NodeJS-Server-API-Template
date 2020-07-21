import Joi from '@hapi/joi';

import { ALL } from '../../../localstore/priviledge.store';
import { SchemaValidation } from '../../../messages/message.validation';

export const PRIVILEDGE_CREATE = Symbol('priviledge_create');
export const PRIVILEDGE_UPDATE = Symbol('priviledge_update');
export const PRIVILEDGE_QUERY = Symbol('priviledge_query');

export const schamaType = {
	PRIVILEDGE_CREATE,
	PRIVILEDGE_UPDATE,
	PRIVILEDGE_QUERY
};

export const validatePriviledgeCreate = (data: any): any => {
	if (data.permissions) {
		const permissionSchema = Joi.object({
			permission: Joi.string()
				.required()
				.allow(...ALL)
				.only()
		});
		for (const permission of data.permissions) {
			const result = permissionSchema.validate(
				{ permission },
				{
					abortEarly: false
				}
			);
			if (result.error) {
				return {
					message: SchemaValidation.createData('priviledge'),
					result: result
				};
			}
		}
	}

	const schema = Joi.object({
		userId: Joi.string().required(),
		permissions: Joi.array().required(),
		controller: Joi.string().required()
	});

	return {
		message: SchemaValidation.createData('priviledge'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export const validatePriviledgeUpdate = (data: any): any => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		permissions: Joi.array().required(),
		controller: Joi.string().required()
	});

	return {
		message: SchemaValidation.updateData('priviledge'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export const validatePriviledgeQuery = (data: any): any => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		controller: Joi.string().optional()
	});

	return {
		message: SchemaValidation.fetchData('priviledge'),
		result: schema.validate(data, {
			abortEarly: false
		})
	};
};

export default schamaType;
