"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["FORBIDDEN_ACCESS"] = 403] = "FORBIDDEN_ACCESS";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["SUCCESS"] = 200] = "SUCCESS";
    HttpCode[HttpCode["ERROR"] = 500] = "ERROR";
})(HttpCode || (HttpCode = {}));
exports.default = HttpCode;
