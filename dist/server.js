"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("./application"));
const interceptor_1 = __importDefault(require("./middleware/interceptor"));
const roles_1 = __importDefault(require("./controllers/restful/api/roles"));
const users_1 = __importDefault(require("./controllers/restful/api/users"));
const invitations_1 = __importDefault(require("./controllers/restful/api/invitations"));
const priviledges_1 = __importDefault(require("./controllers/restful/api/priviledges"));
const authentication_1 = __importDefault(require("./controllers/restful/api/authentication"));
const accessrole_store_1 = require("./localstore/accessrole.store");
const roleController = new roles_1.default(accessrole_store_1.ROOT);
const userController = new users_1.default(accessrole_store_1.ROOT, accessrole_store_1.ADMIN, accessrole_store_1.USER);
const inviteController = new invitations_1.default(accessrole_store_1.ROOT, accessrole_store_1.ADMIN);
const priviledgeController = new priviledges_1.default(accessrole_store_1.ROOT, accessrole_store_1.ADMIN);
const authenticationController = new authentication_1.default(...accessrole_store_1.ALL);
new application_1.default([
    roleController,
    userController,
    inviteController,
    priviledgeController,
    authenticationController
], new interceptor_1.default()).startlistening();
