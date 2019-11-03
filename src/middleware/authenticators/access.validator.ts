
import httpCode from '../../definitions/httpCode';

import priviledgeValidator from './priviledge.validator';
import PermissionsService from '../../services/role.service';

import { RoleMessages } from '../../messages/message.response';
import { AccessResponse } from '../../responses/request.response';
import { Response, NextFunction } from 'express'

function allow(...allowed: string[]) {

   const service = new PermissionsService();

   const isUserAllowed = async (roleCode: string, request: any) => {

      const { error, result } = await service.getRoleByCode(roleCode);

      if (error) {
         return { error: error }
      }
      if (!result) {
         return { error: RoleMessages.INVALID_CODE }
      }

      request.role = result;
      return { allowed: allowed.indexOf(result.name) > -1 };
   }

   const doRolesMatch = async (userId: string, roleCode: string) => {

      const { error, result } = await service.getUserRole(userId);

      if (error) {
         return { error: error }
      }

      if (!result) {
         return { error: RoleMessages.NONE_FOUND }
      }

      return { match: result.code === roleCode };
   }

   return async (request: any, response: Response, next: NextFunction) => {
      const userId = request.user.userId;
      const roleCode = request.user.roleCode;

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

      if (request.user && isAllowed.allowed && rolesMatch.match)
         await priviledgeValidator(request, response, next);
      else {
         accessResponse.granted = false;
         accessResponse.errors.push(RoleMessages.DENIED);
         return response.status(httpCode.FORBIDDEN_ACCESS).json(accessResponse);
      }
   }
}

export default allow;