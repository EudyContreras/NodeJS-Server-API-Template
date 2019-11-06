"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = {
    EMAIL_EMPTY: 'The email is empty.',
    INVALID_EMAIL: 'The given email is not valid',
    LENGTH_EXCEEDED: (length) => `The email is too long as it exceeds ${length} characters`,
    USERNAME_TOOLONG: (length) => `The given email user name length is lesser than ${length} characters long`,
    DOMAIN_TOOLONG: (length) => `The given email domain name length is lesser than ${length} characters long`,
};
exports.PasswordValidation = {
    PASSWORD_EMPTY: 'The password is empty!',
    ALPHA_NUMERIC: 'Password is not alpha numeric.',
    MIN_LENGTH: (length) => `Password length is lesser than ${length} characters long`,
    MAX_LENGTH: (length) => `Password length is greater than ${length} characters long`
};
exports.PriviledgeValidation = {
    ADD_PRIVILEDGE: 'Please submit a priviledge',
    UNDEFINED_ERROR: 'The priviledge is undefined!',
    INVALID_PRIVILEDGE: 'The priviledge action is invalid',
    VALID_ACTIONS: (args) => `The valid actions are ${args}`
};
exports.AuthenticationValidation = {
    CREDENTIALS: ''
};
exports.SchemaValidation = {
    FETCH_DATA: (arg) => `The ${arg} query data is invalid`,
    CREATE_DATA: (arg) => `The ${arg} creation data is invalid`,
    UPDATE_DATA: (arg) => `The ${arg} update data is invalid`
};
exports.InvitationValidation = {
    INVITE_FETCH_DATA: 'The invitation query data is invalid',
    INVITE_CREATE_DATA: 'The invitation creation data is invalid',
    INVITE_UPDATE_DATA: 'The invitation update data is invalid'
};
exports.UserValidation = {
    USER_FETCH_DATA: 'The user query data is invalid',
    USER_CREATE_DATA: 'The user creation data is invalid',
    USER_UPDATE_DATA: 'The user update data is invalid'
};
exports.AccessRoleValidation = {
    DENIED: 'Access for the specified role has been denied',
    NONE_FOUND: 'No role with the given criteria was found for the user',
    INVALID_CODE: 'The role code for the user is invalid',
};
exports.RoleValidation = {
    ADD_ROLE: 'Please submit a role type name',
    UNDEFINED_ERROR: 'The role type name is undefined!',
    INVALID_ROLE: 'The role type name is invalid',
    NOT_FETCHED: 'The role could not be retrieved',
    NOT_FETCHED_ALL: 'The roles could not be retrieved',
    NOT_CREATED: 'The role could not be created',
    NOT_DELETED: 'The role could not be deleted',
    NOT_UPDATED: 'THe role could not be updated',
    VALID_ROLES: (args) => `The valid role type names are ${args}`
};
