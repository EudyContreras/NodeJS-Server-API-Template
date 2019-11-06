"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpCode_1 = __importDefault(require("../../definitions/httpCode"));
const request_response_1 = require("../../responses/request.response");
const AuthSchema = __importStar(require("../../validation/schemas/authentication/blueprint"));
const UserSchema = __importStar(require("../../validation/schemas/user/blueprint"));
const InviteSchema = __importStar(require("../../validation/schemas/invitation/blueprint"));
const PriviledgeSchema = __importStar(require("../../validation/schemas/priviledge/blueprint"));
const httpMethod_1 = require("../../definitions/httpMethod");
function validate(schemaType) {
    return (request, response, next) => {
        const data = request.body;
        const query = request.query;
        const method = request.method;
        if (!data)
            return next({ error: 'No data has been specified in the body' });
        switch (method) {
            case httpMethod_1.GET:
                return buildResponse(handleRetrieval(schemaType, data, query), request, response, next);
            case httpMethod_1.PUT:
                return buildResponse(handleCreation(schemaType, data), request, response, next);
            case httpMethod_1.POST:
                return buildResponse(handlePosting(schemaType, data), request, response, next);
            case httpMethod_1.PATCH:
                return buildResponse(handleUpdate(schemaType, data), request, response, next);
            case httpMethod_1.DELETE:
                return buildResponse(handleDeletion(schemaType, data), request, response, next);
        }
    };
}
function handlePosting(schemaType, data) {
    switch (schemaType) {
        case AuthSchema.CREDENTIALS:
            return AuthSchema.validateCredentials(data);
    }
    return null;
}
function handleDeletion(schemaType, data) {
    switch (schemaType) {
        case PriviledgeSchema.PRIVILEDGE_QUERY:
            return PriviledgeSchema.validatePriviledgeQuery(data);
    }
    return null;
}
function handleRetrieval(schemaType, data, query) {
    const hasProps = Object.keys(query).length > 0;
    if (hasProps) {
        switch (schemaType) {
            case InviteSchema.INVITATION_QUERY:
                return InviteSchema.validateInviteQuery(query);
            case PriviledgeSchema.PRIVILEDGE_QUERY:
                return PriviledgeSchema.validatePriviledgeQuery(data);
        }
    }
    return null;
}
function handleCreation(schemaType, data) {
    switch (schemaType) {
        case UserSchema.USER_CREATE:
            return UserSchema.validateUserCreate(data);
        case InviteSchema.INVITATION_CREATE:
            return InviteSchema.validateInviteCreate(data);
        case PriviledgeSchema.PRIVILEDGE_CREATE:
            return PriviledgeSchema.validatePriviledgeCreate(data);
    }
    return null;
}
function handleUpdate(schemaType, data) {
    switch (schemaType) {
        case InviteSchema.INVITATION_UPDATE:
            return InviteSchema.validateInviteUpdate(data);
        case PriviledgeSchema.PRIVILEDGE_UPDATE:
            return PriviledgeSchema.validatePriviledgeUpdate(data);
    }
    return null;
}
function isEmptyObject(obj) {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function buildResponse(validation, request, response, next) {
    if (validation === null)
        return next();
    const { error, value } = validation.result;
    if (error) {
        const validateResponse = new request_response_1.ValidationResponse();
        const errors = error.message.split('.');
        if (errors.length > 0) {
            const messages = errors.map(x => x.trim().replace(/"/g, ''));
            validateResponse.errors.push(...messages);
        }
        else {
            const message = error.message.replace(/"/g, '');
            validateResponse.errors.push(message);
        }
        validateResponse.message = validation.message;
        validateResponse.valid = false;
        return response.status(httpCode_1.default.BAD_REQUEST).json(validateResponse);
    }
    if (value) {
        request.data = value;
    }
    return next();
}
exports.default = validate;
