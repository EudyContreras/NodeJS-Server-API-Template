"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpCode_1 = __importDefault(require("../../definitions/httpCode"));
function intercept(error, request, response, next) {
    const status = error.status || httpCode_1.default.ERROR;
    const message = error.message || 'Something went wrong';
    const apiResponse = {
        error: {
            status: status,
            message: message,
        }
    };
    response.status(status).json(apiResponse);
}
exports.default = intercept;
