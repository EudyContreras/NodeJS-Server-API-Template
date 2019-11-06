"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestAction;
(function (RequestAction) {
    RequestAction[RequestAction["GET"] = 0] = "GET";
    RequestAction[RequestAction["GET_ALL"] = 1] = "GET_ALL";
    RequestAction[RequestAction["CREATE"] = 2] = "CREATE";
    RequestAction[RequestAction["UPDATE"] = 3] = "UPDATE";
    RequestAction[RequestAction["DELETE"] = 4] = "DELETE";
    RequestAction[RequestAction["RECOVER"] = 5] = "RECOVER";
    RequestAction[RequestAction["AUTHENTICATE"] = 6] = "AUTHENTICATE";
})(RequestAction || (RequestAction = {}));
;
exports.default = RequestAction;
