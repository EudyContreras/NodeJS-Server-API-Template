import httpCode from '../../definitions/httpCode';

import priviledgeValidator from './priviledge.validator';
import PermissionsService from '../../services/role.service';

import { AccessResponse } from '../../responses/request.response';
import { AccessRoleValidation } from '../../messages/message.validation';
import { Response, NextFunction } from 'express';

function allow(
	...allowed: string[]
): (request: any, response: Response, next: NextFunction) => Promise<void | Response> {
	const service = new PermissionsService();

	const isUserAllowed = async (roleCode: string, request: any): Promise<any> => {
		const { error, result } = await service.getRoleByCode(roleCode);

		if (error) return { error: AccessRoleValidation.INVALID_CODE };

		request.role = result;
		return { allowed: allowed.indexOf(result.name) > -1 };
	};

	const doRolesMatch = async (userId: string, roleCode: string): Promise<any> => {
		const { error, result } = await service.getUserRole(userId);

		if (error) return { error: AccessRoleValidation.NONE_FOUND };

		return { match: result.code === roleCode };
	};

	return async (request: any, response: Response, next: NextFunction): Promise<void | Response> => {
		const { userId, roleCode } = request.user;

		const accessResponse = new AccessResponse();

		const isAllowed = await isUserAllowed(roleCode, request);
		const rolesMatch = await doRolesMatch(userId, roleCode);

		if (isAllowed.error) {
			accessResponse.granted = false;
			accessResponse.errors.push(isAllowed.error);
		}

		if (rolesMatch.error) {
			accessResponse.granted = false;
			accessResponse.errors.push(rolesMatch.error);
		}

		if (request.user && isAllowed.allowed && rolesMatch.match) {
			return await priviledgeValidator(request, response, next);
		} else {
			accessResponse.granted = false;
			accessResponse.errors.push(AccessRoleValidation.DENIED);
			return response.status(httpCode.FORBIDDEN_ACCESS).json(accessResponse);
		}
	};
}

export default allow;
