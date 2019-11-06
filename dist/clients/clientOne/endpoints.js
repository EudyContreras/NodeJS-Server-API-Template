"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = Object.freeze({
    ENDPOINT_ONE: 'something',
    ENDPOINT_TWO: 'something',
    endpointThree: function (arg) {
        return `somethings/${arg}`;
    }
});
exports.default = endpoints;
