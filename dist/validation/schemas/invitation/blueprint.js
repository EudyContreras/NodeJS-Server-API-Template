"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const accessrole_store_1 = require("../../../localstore/accessrole.store");
const message_validation_1 = require("../../../messages/message.validation");
exports.INVITATION_CREATE = Symbol('invitation_create');
exports.INVITATION_UPDATE = Symbol('invitation_update');
exports.INVITATION_QUERY = Symbol('invitation_query');
exports.schamaType = {
    INVITATION_CREATE: exports.INVITATION_CREATE,
    INVITATION_UPDATE: exports.INVITATION_UPDATE,
    INVITATION_QUERY: exports.INVITATION_QUERY
};
exports.validateInviteCreate = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default
            .string()
            .required()
            .email(),
        role: joi_1.default
            .string()
            .required()
            .allow(...accessrole_store_1.ALL)
            .only(),
        expirationTime: joi_1.default
            .number()
            .optional()
    });
    return {
        message: message_validation_1.SchemaValidation.CREATE_DATA('invitation'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.validateInviteUpdate = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default
            .string()
            .optional()
            .email(),
        role: joi_1.default
            .string()
            .optional()
            .allow(...accessrole_store_1.ALL)
            .only(),
        expirationTime: joi_1.default
            .number()
            .optional()
    });
    return {
        message: message_validation_1.SchemaValidation.UPDATE_DATA('invitation'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.validateInviteQuery = (data) => {
    const { id, inviteId } = data;
    if (id) {
        data._id = id;
        delete data.id;
    }
    if (inviteId) {
        data._id = inviteId;
        delete data.inviteId;
    }
    const schema = joi_1.default.object({
        _id: joi_1.default
            .string()
            .optional(),
        inviteId: joi_1.default
            .string()
            .optional(),
        email: joi_1.default
            .string()
            .optional()
            .email(),
        role: joi_1.default
            .string()
            .optional()
            .allow(...accessrole_store_1.ALL)
            .only(),
    })
        .or('_id', 'email');
    return {
        message: message_validation_1.SchemaValidation.FETCH_DATA('invitation'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.default = exports.schamaType;
