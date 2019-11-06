"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const priviledge_store_1 = require("../../../localstore/priviledge.store");
const message_validation_1 = require("../../../messages/message.validation");
exports.PRIVILEDGE_CREATE = Symbol('priviledge_create');
exports.PRIVILEDGE_UPDATE = Symbol('priviledge_update');
exports.PRIVILEDGE_QUERY = Symbol('priviledge_query');
exports.schamaType = {
    PRIVILEDGE_CREATE: exports.PRIVILEDGE_CREATE,
    PRIVILEDGE_UPDATE: exports.PRIVILEDGE_UPDATE,
    PRIVILEDGE_QUERY: exports.PRIVILEDGE_QUERY
};
exports.validatePriviledgeCreate = (data) => {
    if (data.permissions) {
        const permissionSchema = joi_1.default.object({
            permission: joi_1.default
                .string()
                .required()
                .allow(...priviledge_store_1.ALL)
                .only()
        });
        for (const permission of data.permissions) {
            const result = permissionSchema.validate({ permission }, {
                abortEarly: false
            });
            if (result.error) {
                return {
                    message: message_validation_1.SchemaValidation.CREATE_DATA('priviledge'),
                    result: result
                };
            }
        }
        ;
    }
    const schema = joi_1.default.object({
        userId: joi_1.default
            .string()
            .required(),
        permissions: joi_1.default
            .array()
            .required(),
        controller: joi_1.default
            .string()
            .required()
    });
    return {
        message: message_validation_1.SchemaValidation.CREATE_DATA('priviledge'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.validatePriviledgeUpdate = (data) => {
    const schema = joi_1.default.object({
        userId: joi_1.default
            .string()
            .required(),
        permissions: joi_1.default
            .array()
            .required(),
        controller: joi_1.default
            .string()
            .required()
    });
    return {
        message: message_validation_1.SchemaValidation.UPDATE_DATA('priviledge'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.validatePriviledgeQuery = (data) => {
    const schema = joi_1.default.object({
        userId: joi_1.default
            .string()
            .required(),
        controller: joi_1.default
            .string()
            .optional()
    });
    return {
        message: message_validation_1.SchemaValidation.FETCH_DATA('priviledge'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.default = exports.schamaType;
