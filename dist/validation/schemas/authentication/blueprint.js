"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const vault_1 = __importDefault(require("../../../config/vault"));
const message_validation_1 = require("../../../messages/message.validation");
exports.CREDENTIALS = Symbol('credentials');
exports.schamaType = {
    CREDENTIALS: exports.CREDENTIALS
};
exports.validateCredentials = (data) => {
    const schema = joi_1.default.object({
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
        message: message_validation_1.SchemaValidation.CREATE_DATA('credentials'),
        result: schema.validate(data, {
            abortEarly: false
        })
    };
};
exports.default = exports.schamaType;
