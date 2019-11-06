"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const vault_1 = __importDefault(require("../../config/vault"));
const endpoints_1 = __importDefault(require("./endpoints"));
const httpContent_1 = __importDefault(require("../../definitions/httpContent"));
const httpMethod_1 = __importDefault(require("../../definitions/httpMethod"));
class ApiClient extends client_1.default {
    constructor() {
        super(...arguments);
        this.baseUrl = vault_1.default.api.someapi.baseUrl;
        this.userName = vault_1.default.api.someapi.auth.USER_NAME;
        this.password = vault_1.default.api.someapi.auth.PASSWORD;
    }
    getSomeDataOne(onSuccess, onError, extra) {
        const endPoint = this.baseUrl(endpoints_1.default.ENDPOINT_ONE);
        const options = {
            url: endPoint,
            parse: true,
            headers: {
                accept: httpContent_1.default.JSON,
            },
            auth: {
                username: this.userName,
                password: this.password
            }
        };
        this.performRequest(httpMethod_1.default.GET, options, onSuccess, onError, extra);
    }
    getSomeDataTwo(argument, onSuccess, onError, extra) {
        const endPoint = this.baseUrl(endpoints_1.default.ENDPOINT_TWO);
        const query = {
            arg: argument
        };
        const options = {
            qs: query,
            url: endPoint,
            parse: true,
            headers: {
                accept: httpContent_1.default.JSON,
            },
            auth: {
                username: this.userName,
                password: this.password
            }
        };
        this.performRequest(httpMethod_1.default.GET, options, onSuccess, onError, extra);
    }
    getSomeDataThree(argument, onSuccess, onError, extra) {
        const endPoint = this.baseUrl(endpoints_1.default.endpointThree(argument));
        const options = {
            url: endPoint,
            parse: true,
            headers: {
                accept: httpContent_1.default.JSON,
            },
            auth: {
                username: this.userName,
                password: this.password
            }
        };
        this.performRequest(httpMethod_1.default.GET, options, onSuccess, onError, extra);
    }
}
exports.default = ApiClient;
