"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("./application"));
const interceptor_1 = __importDefault(require("./middleware/interceptor"));
const roles_1 = __importDefault(require("./controllers/restful/api/roles"));
const users_1 = __importDefault(require("./controllers/restful/api/users"));
const index_1 = __importDefault(require("./controllers/views/index"));
const invitations_1 = __importDefault(require("./controllers/restful/api/invitations"));
const priviledges_1 = __importDefault(require("./controllers/restful/api/priviledges"));
const authentication_1 = __importDefault(require("./controllers/restful/api/authentication"));
const accessrole_store_1 = require("./localstore/accessrole.store");
const args = {
    controllers: [
        new roles_1.default(accessrole_store_1.ROOT),
        new users_1.default(accessrole_store_1.ROOT, accessrole_store_1.ADMIN, accessrole_store_1.USER),
        new invitations_1.default(accessrole_store_1.ROOT, accessrole_store_1.ADMIN),
        new priviledges_1.default(accessrole_store_1.ROOT, accessrole_store_1.ADMIN),
        new authentication_1.default(...accessrole_store_1.ALL)
    ],
    viewControllers: [
        new index_1.default()
    ],
    interceptor: new interceptor_1.default()
};
new application_1.default(args).startlistening();
