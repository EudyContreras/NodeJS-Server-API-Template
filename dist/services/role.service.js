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
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const role_repository_1 = __importDefault(require("../repositories/role.repository"));
const message_response_1 = require("../messages/message.response");
class AccessRoleService {
    /**
     * @description Retrieves all the available roles
     * @returns A list containing all the roles or a produced error.
     */
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new role_repository_1.default();
                const result = yield repository.getAllRoles();
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrieves the role that matches the role id
     * @param roleId The id of the role to retrieve
     * @returns The role that matches the given id or a produced error.
     */
    getRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new role_repository_1.default();
                const result = yield repository.getRole(roleId);
                if (!result)
                    return { error: message_response_1.AccessRoleMessages.NO_SUCH_ROLE };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrives the role code for the role with the matching name.
     * @param name The type name of the role to retrieve.
     * @returns The role that matches the given name or a produced error.
     */
    getRoleCode(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new role_repository_1.default();
                const result = yield repository.getRoleWhere({ name: name });
                if (!result)
                    return { error: message_response_1.AccessRoleMessages.NO_SUCH_ROLE };
                return { result: result.code };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrives the role with the matching code.
     * @param roleCode The code of the role to retrieve.
     * @returns The role that matches the given role code or a produced error.
     */
    getRoleByCode(roleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new role_repository_1.default();
                const result = yield repository.getRoleWhere({ code: roleCode });
                if (!result)
                    return { error: message_response_1.AccessRoleMessages.NO_SUCH_ROLE };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrieves the role for the user with the specified id.
     * @param userId The id of the user.
     * @returns The role that matches the given id or a produced error.
     */
    getUserRole(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = new user_repository_1.default();
                const roleRepostiory = new role_repository_1.default();
                const user = yield userRepository.getUser(userId, { dto: false });
                if (!user)
                    return { error: message_response_1.UserMessages.NO_SUCH_USER };
                const result = yield roleRepostiory.getRoleWhere({ code: user.roleCode });
                if (!result)
                    return { error: message_response_1.AccessRoleMessages.NO_SUCH_ROLE };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Creates a new role with the specifed data.
     * @param role The role data to use for creating the new role.
     * @returns The role that has just been created or a produced error.
     */
    createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new role_repository_1.default();
                const exists = yield repository.hasRoleWhere({ name: role.name });
                if (exists)
                    return { error: message_response_1.AccessRoleMessages.ROLE_EXIST };
                const result = yield repository.insertRole(role);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Updates the role that matches the specified role id.
     * @param roleId The role id of the role to be updated.
     * @param role The data to use for updating the role.
     * @returns The role that has just been updated or a produced error.
     */
    updateRole(roleId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = {
                    name: data.name,
                    code: data.code
                };
                const repository = new role_repository_1.default();
                const result = yield repository.updateRole(roleId, update);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Deletes the role with the matching id.
     * @param roleId The id of the role to be deleted.
     * @returns The role that has just been deleted or a produced error.
     */
    deleteRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new role_repository_1.default();
                const result = yield repository.deleteRole(roleId);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.default = AccessRoleService;
