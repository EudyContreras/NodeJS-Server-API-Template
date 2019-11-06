"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function intercept(request, response, next) {
    console.log(`Method: ${request.method} | Path: ${request.path}`);
    next();
}
exports.default = intercept;
