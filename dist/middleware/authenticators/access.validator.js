"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpCode_1 = __importDefault(require("../../definitions/httpCode"));
const priviledge_validator_1 = __importDefault(require("./priviledge.validator"));
const role_service_1 = __importDefault(require("../../services/role.service"));
const request_response_1 = require("../../responses/request.response");
const message_validation_1 = require("../../messages/message.validation");
function allow(...allowed) {
    const service = new role_service_1.default();
    const isUserAllowed = (roleCode, request) => __awaiter(this, void 0, void 0, function* () {
        const { error, result } = yield service.getRoleByCode(roleCode);
        if (error)
            return { error: message_validation_1.AccessRoleValidation.INVALID_CODE };
        request.role = result;
        return { allowed: allowed.indexOf(result.name) > -1 };
    });
    const doRolesMatch = (userId, roleCode) => __awaiter(this, void 0, void 0, function* () {
        const { error, result } = yield service.getUserRole(userId);
        if (error)
            return { error: message_validation_1.AccessRoleValidation.NONE_FOUND };
        return { match: result.code === roleCode };
    });
    return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
        const { userId, roleCode } = request.user;
        const accessResponse = new request_response_1.AccessResponse();
        const isAllowed = yield isUserAllowed(roleCode, request);
        const rolesMatch = yield doRolesMatch(userId, roleCode);
        if (isAllowed.error) {
            accessResponse.granted = false;
            accessResponse.errors.push(isAllowed.error);
        }
        if (rolesMatch.error) {
            accessResponse.granted = false;
            accessResponse.errors.push(rolesMatch.error);
        }
        if (request.user && isAllowed.allowed && rolesMatch.match)
            yield priviledge_validator_1.default(request, response, next);
        else {
            accessResponse.granted = false;
            accessResponse.errors.push(message_validation_1.AccessRoleValidation.DENIED);
            return response.status(httpCode_1.default.FORBIDDEN_ACCESS).json(accessResponse);
        }
    });
}
exports.default = allow;
