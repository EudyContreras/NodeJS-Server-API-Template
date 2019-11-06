"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_interceptor_1 = __importDefault(require("./interceptors/error.interceptor"));
const notfound_interceptor_1 = __importDefault(require("./interceptors/notfound.interceptor"));
const request_interceptor_1 = __importDefault(require("./interceptors/request.interceptor"));
class Interceptor {
    getInterceptors() {
        return [
            request_interceptor_1.default
        ];
    }
    getErrorHandler() {
        return error_interceptor_1.default;
    }
    getNotFoundHandler() {
        return notfound_interceptor_1.default;
    }
}
exports.default = Interceptor;
