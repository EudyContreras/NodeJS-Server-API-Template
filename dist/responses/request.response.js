"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Response produced when an authentication
 * is requested by a user.
 */
class AuthenticationResponse {
    constructor() {
        this.authorized = false;
        this.errors = [];
    }
}
exports.AuthenticationResponse = AuthenticationResponse;
/**
 * @description Response produced when a request for user
 * credential data is requested by a user.
 */
class CredentialsResponse {
    constructor() {
        this.authorized = false;
        this.errors = [];
    }
}
exports.CredentialsResponse = CredentialsResponse;
/**
 * @description Response produced when validation of
 * data takes place.
 */
class ValidationResponse {
    constructor() {
        this.valid = false;
        this.message = '';
        this.errors = [];
    }
}
exports.ValidationResponse = ValidationResponse;
/**
 * @description Response produced when a permission is
 * requested for access to certain resource.
 */
class AccessResponse {
    constructor() {
        this.granted = false;
        this.errors = [];
    }
}
exports.AccessResponse = AccessResponse;
/**
 * @description Response produced when a priviledge is requested
 * to perform a certain action within a resouce.
 */
class PriviledgeResponse {
    constructor() {
        this.errors = [];
    }
}
exports.PriviledgeResponse = PriviledgeResponse;
/**
 * @description Response produced when a registration takes
 * place.
 */
class RegistrationResponse {
    constructor() {
        this.errors = [];
    }
}
exports.RegistrationResponse = RegistrationResponse;
/**
 * @description A common api response to a request.
 */
class ApiResponse {
    constructor() {
        this.errors = [];
    }
}
exports.ApiResponse = ApiResponse;
