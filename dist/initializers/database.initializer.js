"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_service_1 = __importDefault(require("../services/role.service"));
const invitation_service_1 = __importDefault(require("../services/invitation.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const accessrole_store_1 = __importDefault(require("../localstore/accessrole.store"));
const vault_1 = __importDefault(require("../config/vault"));
class DatabaseIntializer {
    constructor(errorHandler, logger) {
        this.handler = errorHandler;
        this.logger = logger;
    }
    /**
     * @description Populates the invitation collection with some
     * initital invitation related data.
     */
    createInitialInvitation() {
        return __awaiter(this, void 0, void 0, function* () {
            const inviteService = new invitation_service_1.default();
        });
    }
    /**
     * @description Populates the user collection with some
     * initital user related data for users with
     * role admin.
     */
    createInitialAdministrators() {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new user_service_1.default();
            const user = {
                name: vault_1.default.admin.ADMIN_NAME,
                email: vault_1.default.admin.ADMIN_USERNAME,
                password: vault_1.default.admin.ADMIN_PASSWORD
            };
            const { result, error } = yield userService.registerUser(user);
            if (error) {
                this.logger.logInfo(error);
            }
            else {
                this.logger.logInfo(result);
            }
        });
    }
    /**
     * @description Populates the role collection with some
     * initital role related data.
     */
    createInitialRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new role_service_1.default();
            for (let i = 0; i < accessrole_store_1.default.ACCESS_ROLES.length; i++) {
                const type = accessrole_store_1.default.ACCESS_ROLES[i].type;
                const code = accessrole_store_1.default.ACCESS_ROLES[i].code;
                const level = accessrole_store_1.default.ACCESS_ROLES[i].level;
                const role = {
                    name: type,
                    code: code,
                    level: level
                };
                const { error } = yield service.createRole(role);
                if (error) {
                    this.handler.onError(error);
                    continue;
                }
                this.logger.logInfo(`Initialized role of type: ${type}`);
            }
        });
    }
}
exports.default = DatabaseIntializer;
