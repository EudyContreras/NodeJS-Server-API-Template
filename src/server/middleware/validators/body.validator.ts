import httpCodes from '../../definitions/httpCode';

import { ValidationResult } from '@hapi/joi';
import { ValidationResponse } from '../../responses/request.response';
import { Response, Request, NextFunction } from 'express';

import * as AuthSchema from '../../validation/schemas/authentication/blueprint';
import * as UserSchema from '../../validation/schemas/user/blueprint';
import * as InviteSchema from '../../validation/schemas/invitation/blueprint';
import * as PriviledgeSchema from '../../validation/schemas/priviledge/blueprint';

import { GET, POST, PUT, DELETE, PATCH } from '../../definitions/httpMethod';

function buildResponse(
	validation: { message: string; result: ValidationResult } | null,
	request: any,
	response: Response,
	next: NextFunction
): void | Response {
	if (validation === null) return next();

	const { error, value } = validation.result;

	if (error) {
		const validateResponse = new ValidationResponse();

		const errors = error.message.split('.');

		if (errors.length > 0) {
			const messages = errors.map((x) => x.trim().replace(/"/g, ''));
			validateResponse.errors.push(...messages);
		} else {
			const message = error.message.replace(/"/g, '');
			validateResponse.errors.push(message);
		}

		validateResponse.message = validation.message;
		validateResponse.valid = false;

		return response.status(httpCodes.BAD_REQUEST).json(validateResponse);
	}

	if (value) {
		request.data = value;
	}

	return next();
}

function handlePosting(schemaType: symbol, data: any): any | null {
	switch (schemaType) {
		case AuthSchema.CREDENTIALS:
			return AuthSchema.validateCredentials(data);
		default:
	}
	return null;
}

function handleDeletion(schemaType: symbol, data: any): any | null {
	switch (schemaType) {
		case PriviledgeSchema.PRIVILEDGE_QUERY:
			return PriviledgeSchema.validatePriviledgeQuery(data);
		default:
	}
	return null;
}

function handleRetrieval(schemaType: symbol, data: any, query: any): any | null {
	const hasProps = Object.keys(query).length > 0;

	if (hasProps) {
		switch (schemaType) {
			case InviteSchema.INVITATION_QUERY:
				return InviteSchema.validateInviteQuery(query);
			case PriviledgeSchema.PRIVILEDGE_QUERY:
				return PriviledgeSchema.validatePriviledgeQuery(data);
			default:
		}
	}

	return null;
}

function handleCreation(schemaType: symbol, data: any): any | null {
	switch (schemaType) {
		case UserSchema.USER_CREATE:
			return UserSchema.validateUserCreate(data);
		case InviteSchema.INVITATION_CREATE:
			return InviteSchema.validateInviteCreate(data);
		case PriviledgeSchema.PRIVILEDGE_CREATE:
			return PriviledgeSchema.validatePriviledgeCreate(data);
		default:
	}
	return null;
}

function handleUpdate(schemaType: symbol, data: any): any | null {
	switch (schemaType) {
		case InviteSchema.INVITATION_UPDATE:
			return InviteSchema.validateInviteUpdate(data);
		case PriviledgeSchema.PRIVILEDGE_UPDATE:
			return PriviledgeSchema.validatePriviledgeUpdate(data);
		default:
	}
	return null;
}

function validate(schemaType: symbol) {
	return (request: Request, response: Response, next: NextFunction): void | Response => {
		const data = request.body;
		const query = request.query;
		const method = request.method;

		if (!data) return next({ error: 'No data has been specified in the body' });

		switch (method) {
			case GET:
				return buildResponse(handleRetrieval(schemaType, data, query), request, response, next);
			case PUT:
				return buildResponse(handleCreation(schemaType, data), request, response, next);
			case POST:
				return buildResponse(handlePosting(schemaType, data), request, response, next);
			case PATCH:
				return buildResponse(handleUpdate(schemaType, data), request, response, next);
			case DELETE:
				return buildResponse(handleDeletion(schemaType, data), request, response, next);
			default:
		}
	};
}

export default validate;
