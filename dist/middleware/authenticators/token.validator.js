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
const vault_1 = __importDefault(require("../../config/vault"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpCode_1 = __importDefault(require("../../definitions/httpCode"));
const authentication_service_1 = __importDefault(require("../../services/authentication.service"));
const message_response_1 = require("../../messages/message.response");
const request_response_1 = require("../../responses/request.response");
const httpHeader = vault_1.default.self.headers;
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = getToken(req);
        const response = new request_response_1.AuthenticationResponse();
        if (!token) {
            response.authorized = false;
            response.message = message_response_1.AuthorizationMessages.NO_TOKEN;
            response.errors.push(message_response_1.AuthorizationMessages.NO_TOKEN_FOUND);
            return res.status(httpCode_1.default.UNAUTHORIZED).json(response);
        }
        try {
            const secret = vault_1.default.jwt.TOKEN_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const blackListed = yield isBlackListed(token);
            if (blackListed) {
                throw new Error(message_response_1.AuthorizationMessages.NO_ACTIVE_TOKEN);
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            response.authorized = false;
            response.message = message_response_1.AuthorizationMessages.NO_VALID_TOKEN;
            response.errors.push(error.message);
            return res.status(httpCode_1.default.UNAUTHORIZED).json(response);
        }
    });
}
function isBlackListed(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = new authentication_service_1.default();
        const { result, error } = yield service.isBlackListed(token);
        if (error)
            return true;
        return result;
    });
}
function getToken(req) {
    const bearer = vault_1.default.jwt.PREFIX;
    const token = req.header(httpHeader.TOKEN_HEADER) || req.header(httpHeader.AUTHORIZATION);
    if (!token)
        return null;
    if (token.startsWith(bearer)) {
        return token.slice(bearer.length, token.length);
    }
    return token;
}
exports.default = authenticate;
