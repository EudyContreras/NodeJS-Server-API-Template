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
const accessrole_store_1 = __importDefault(require("../../localstore/accessrole.store"));
const priviledge_store_1 = __importDefault(require("../../localstore/priviledge.store"));
const priviledge_service_1 = __importDefault(require("../../services/priviledge.service"));
const message_response_1 = require("../../messages/message.response");
const request_response_1 = require("../../responses/request.response");
const httpMethod_1 = require("../../definitions/httpMethod");
function controlAccess(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const method = request.method;
        const userId = request.user.userId;
        const roleName = request.role.name;
        const parts = request.baseUrl.split('/');
        if (roleName === accessrole_store_1.default.ROOT) {
            return next();
        }
        const priviledgeResponse = new request_response_1.PriviledgeResponse();
        const controllerIndex = 2;
        if (parts[controllerIndex]) {
            const controller = parts[controllerIndex];
            const priviledges = new priviledge_service_1.default();
            const query = createQuery(method, controller);
            const { error, result } = yield priviledges.hasPermission(userId, query);
            if (error) {
                priviledgeResponse.hasAccess = false;
                priviledgeResponse.permission = query.permission;
                priviledgeResponse.message = message_response_1.PriviledgeMessages.NOT_GRANTED;
                priviledgeResponse.errors.push(error);
                return response.status(httpCode_1.default.UNAUTHORIZED).json(response);
            }
            if (result === false) {
                priviledgeResponse.hasAccess = false;
                priviledgeResponse.permission = query.permission;
                priviledgeResponse.message = message_response_1.PriviledgeMessages.NOT_GRANTED;
                priviledgeResponse.errors.push(message_response_1.PriviledgeMessages.ACCESS_DENIED);
                return response.status(httpCode_1.default.UNAUTHORIZED).json(response);
            }
        }
        next();
    });
}
function createQuery(method, controller) {
    switch (method) {
        case httpMethod_1.GET:
            return { controller: controller, permission: priviledge_store_1.default.READ };
        case httpMethod_1.PUT:
            return { controller: controller, permission: priviledge_store_1.default.UPDATE };
        case httpMethod_1.POST:
            return { controller: controller, permission: priviledge_store_1.default.CREATE };
        case httpMethod_1.DELETE:
            return { controller: controller, permission: priviledge_store_1.default.DELETE };
    }
    return { controller: null, permission: null };
}
exports.default = controlAccess;
