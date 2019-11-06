"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["POST"] = "POST";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PATCH"] = "PATCH";
})(HttpMethod || (HttpMethod = {}));
exports.GET = 'GET';
exports.PUT = 'PUT';
exports.POST = 'POST';
exports.DELETE = 'DELETE';
exports.PATCH = 'PATCH';
exports.default = HttpMethod;
