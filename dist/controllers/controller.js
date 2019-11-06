"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpCode_1 = __importDefault(require("../definitions/httpCode"));
const requestAction_1 = __importDefault(require("../definitions/requestAction"));
const request_response_1 = require("../responses/request.response");
const message_response_1 = require("../messages/message.response");
class Controller {
    constructor(name) {
        this.name = name;
    }
    /**
     * Builds a response to send to the client
     * @param result The result of the request
     * @param error The possible generated error.
     * @param response The request reponse object.
     * @param requestAction A enum that represents
     * the type of request that was made.
     * @returns  The response produced based
     * on the given arguements and the controller type.
     */
    buildResult(result, error, response, requestAction) {
        const apiResponse = new request_response_1.ApiResponse();
        if (error) {
            switch (requestAction) {
                case requestAction_1.default.GET:
                    apiResponse.message = message_response_1.ResponseMessages.NOT_FETCHED(this.name);
                    break;
                case requestAction_1.default.GET_ALL:
                    apiResponse.message = message_response_1.ResponseMessages.NOT_FETCHED_ALL(this.name);
                    break;
                case requestAction_1.default.CREATE:
                    apiResponse.message = message_response_1.ResponseMessages.NOT_CREATED(this.name);
                    break;
                case requestAction_1.default.UPDATE:
                    apiResponse.message = message_response_1.ResponseMessages.NOT_UPDATED(this.name);
                    break;
                case requestAction_1.default.DELETE:
                    apiResponse.message = message_response_1.ResponseMessages.NOT_DELETED(this.name);
                    break;
            }
            apiResponse.errors.push(error);
            return response.status(httpCode_1.default.BAD_REQUEST).json(apiResponse);
        }
        apiResponse.content = result;
        return response.json(apiResponse);
    }
}
exports.default = Controller;
