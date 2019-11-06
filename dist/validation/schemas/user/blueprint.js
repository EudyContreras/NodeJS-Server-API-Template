"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const vault_1 = __importDefault(require("../../../config/vault"));
const message_validation_1 = require("../../../messages/message.validation");
const accessrole_store_1 = require("../../../localstore/accessrole.store");
exports.USER_CREATE = Symbol('user_create');
exports.USER_UPDATE = Symbol('user_update');
exports.USER_QUERY = Symbol('user_query');
exports.USER_PASSORD = Symbol('user_password');
exports.schamaType = {
    USER_QUERY: exports.USER_QUERY,
    USER_CREATE: exports.USER_CREATE,
    USER_UPDATE: exports.USER_UPDATE,
    USER_PASSORD: exports.USER_PASSORD
};
exports.validateUserCreate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default
            .string()
            .required(),
        email: joi_1.default
            .string()
            .required()
            .email(),
        password: joi_1.default
            .string()
            .required()
            .min(vault_1.default.validation.passwords.MIN_LENGTH)
            .max(vault_1.default.validation.passwords.MAX_LEGHTH)
    });
    return {
        message: message_validation_1.SchemaValidation.CREATE_DATA('user'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.validateUserUpdate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default
            .string()
            .optional(),
        email: joi_1.default
            .string()
            .optional()
            .email(),
        active: joi_1.default
            .boolean()
            .optional()
            .required(),
        role: joi_1.default
            .string()
            .optional()
            .allow(...accessrole_store_1.ALL)
            .only(),
        password: joi_1.default
            .string()
            .optional()
            .min(vault_1.default.validation.passwords.MIN_LENGTH)
            .max(vault_1.default.validation.passwords.MAX_LEGHTH)
    });
    return {
        message: message_validation_1.SchemaValidation.CREATE_DATA('user'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.validatePasswordUpdate = (data) => {
    const schema = joi_1.default.object({
        userId: joi_1.default
            .string()
            .required(),
        oldPassword: joi_1.default
            .string()
            .required()
            .min(vault_1.default.validation.passwords.MIN_LENGTH)
            .max(vault_1.default.validation.passwords.MAX_LEGHTH),
        newPassword: joi_1.default
            .string()
            .required()
            .min(vault_1.default.validation.passwords.MIN_LENGTH)
            .max(vault_1.default.validation.passwords.MAX_LEGHTH)
    });
    return {
        message: message_validation_1.SchemaValidation.CREATE_DATA('user'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.default = exports.schamaType;
