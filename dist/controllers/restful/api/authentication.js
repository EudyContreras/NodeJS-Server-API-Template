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
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../../controller"));
const body_validator_1 = __importDefault(require("../../../middleware/validators/body.validator"));
const token_validator_1 = __importDefault(require("../../../middleware/authenticators/token.validator"));
const blueprint_1 = __importDefault(require("../../../validation/schemas/authentication/blueprint"));
const authentication_service_1 = __importDefault(require("../../../services/authentication.service"));
const requestAction_1 = __importDefault(require("../../../definitions/requestAction"));
const request_response_1 = require("../../../responses/request.response");
const message_response_1 = require("../../../messages/message.response");
const httpCode_1 = __importDefault(require("../../../definitions/httpCode"));
class Authentication extends controller_1.default {
    constructor(...allowedRoles) {
        super('authentication');
        this.service = new authentication_service_1.default();
        this.routing = '/rest/api/authentication';
        this.getCredentials = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const userId = request.user.userId;
            const { result, error } = yield this.service.getUser(userId);
            return this.buildResult(result, error, response, requestAction_1.default.GET);
        });
        this.performAuthentication = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.service.authenticate(request.data);
            return this.buildResult(result, error, response, requestAction_1.default.AUTHENTICATE);
        });
        this.recoverPassword = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const email = request.query.email;
            const { result, error } = yield this.service.recoverPassword(email);
            return this.buildResult(result, error, response, requestAction_1.default.RECOVER);
        });
        this.roles = allowedRoles;
        this.router = express_1.default.Router();
        this.setupRoutes(this.router);
    }
    getRoute() {
        return this.routing;
    }
    getRouter() {
        return this.router;
    }
    setupRoutes(router) {
        router.get('/', token_validator_1.default, this.getCredentials);
        router.put('/recover', this.recoverPassword);
        router.post('/', body_validator_1.default(blueprint_1.default.CREDENTIALS), this.performAuthentication);
    }
    buildResult(result, error, response, requestAction) {
        const apiResponse = new request_response_1.AuthenticationResponse();
        if (error) {
            switch (requestAction) {
                case requestAction_1.default.GET:
                    apiResponse.message = message_response_1.AuthenticationMessages.NOT_FETCHED;
                    break;
                case requestAction_1.default.AUTHENTICATE:
                    apiResponse.message = message_response_1.AuthenticationMessages.NOT_AUTHORIZED;
                    break;
                case requestAction_1.default.RECOVER:
                    apiResponse.message = message_response_1.AuthenticationMessages.NOT_RECOVERED;
                    break;
            }
            apiResponse.errors.push(error);
            return response.status(httpCode_1.default.UNAUTHORIZED).json(apiResponse);
        }
        apiResponse.authorized = !error;
        apiResponse.content = result;
        return response.json(apiResponse);
    }
}
exports.default = Authentication;
