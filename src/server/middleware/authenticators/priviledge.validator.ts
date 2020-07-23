import httpCode from '../../definitions/httpCode';
import roles from '../../localstore/accessrole.store';
import actions from '../../localstore/priviledge.store';
import PriviledgeService from '../../services/priviledge.service';

import { PriviledgeMessages } from '../../messages/message.response';
import { PriviledgeResponse } from '../../responses/request.response';

import { Response, NextFunction } from 'express';
import HttpMethod, { GET, POST, PUT, DELETE } from '../../definitions/httpMethod';

function createQuery(method: HttpMethod, controller: string): any {
	switch (method) {
		case GET:
			return { controller: controller, permission: actions.READ };
		case PUT:
			return { controller: controller, permission: actions.UPDATE };
		case POST:
			return { controller: controller, permission: actions.CREATE };
		case DELETE:
			return { controller: controller, permission: actions.DELETE };
		default:
	}
	return { controller: null, permission: null };
}

async function controlAccess(request: any, response: Response, next: NextFunction): Promise<void | Response> {
	const method = request.method;
	const userId = request.user.userId;
	const roleName = request.role.name;
	const parts = request.baseUrl.split('/');

	if (roleName === roles.ROOT) {
		return next();
	}

	const priviledgeResponse = new PriviledgeResponse();

	const controllerIndex = 2;

	if (parts[controllerIndex]) {
		const controller = parts[controllerIndex];
		const priviledges = new PriviledgeService();

		const query = createQuery(method, controller);

		const { error, result } = await priviledges.hasPermission(userId, query);

		if (error) {
			priviledgeResponse.hasAccess = false;
			priviledgeResponse.permission = query.permission;
			priviledgeResponse.message = PriviledgeMessages.NOT_GRANTED;
			priviledgeResponse.errors.push(error);

			return response.status(httpCode.UNAUTHORIZED).json(response);
		}

		if (result === false) {
			priviledgeResponse.hasAccess = false;
			priviledgeResponse.permission = query.permission;
			priviledgeResponse.message = PriviledgeMessages.NOT_GRANTED;
			priviledgeResponse.errors.push(PriviledgeMessages.ACCESS_DENIED);

			return response.status(httpCode.UNAUTHORIZED).json(response);
		}
	}
	next();
}

export default controlAccess;
