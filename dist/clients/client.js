"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const httpMethod_1 = __importDefault(require("../definitions/httpMethod"));
class Client {
    /**
     * Performs an API request with the given parameters.
     * @param type The type of request to be made to our server.
     * @param options The options used for building our request.
     * @param onSuccess The callback which is triggered upon success.
     * @param onError The callback which is triggered upon an error.
     * @param extra Extra data to be passed down to a successful request.
     */
    performRequest(type, options, onSuccess, onError, extra) {
        const callback = function callback(error, response, body) {
            if (error)
                return onError(error);
            const data = options.parse ? JSON.parse(body) : body;
            const content = options.parse ? JSON.parse(response.body) : response.body;
            if (onSuccess) {
                onSuccess(content, data, extra);
            }
        };
        try {
            switch (type) {
                case httpMethod_1.default.GET:
                    request_1.default.get(options, callback);
                    break;
                case httpMethod_1.default.POST:
                    request_1.default.post(options, callback);
                    break;
            }
        }
        catch (error) {
            if (onError) {
                onError(error.message);
            }
        }
    }
}
exports.default = Client;
