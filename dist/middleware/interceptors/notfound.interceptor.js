"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpCode_1 = __importDefault(require("../../definitions/httpCode"));
const http_exceptions_1 = require("../../exceptions/http.exceptions");
function intercept(request, response, next) {
    const status = httpCode_1.default.NOT_FOUND;
    const message = 'Resource not found!';
    const error = new http_exceptions_1.HttpException(status, message);
    next(error);
}
exports.default = intercept;
