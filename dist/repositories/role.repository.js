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
const role_entity_1 = __importDefault(require("../entitymodel/entities/role.entity"));
function dataTransferDocument(role) {
    const { id, name, code, level } = role;
    return { id, name, code, level };
}
/**
 * @description Data access layer Repository used
 * for interfacing with the role data.
 */
class RoleRepository {
    constructor() {
        this.exclude = null;
        this.options = {
            new: true,
            upsert: false,
            useFindAndModify: false,
            runValidators: true
        };
    }
    hasRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield role_entity_1.default
                .countDocuments({ _id: roleId })
                .exec();
            return count > 0;
        });
    }
    hasRoleWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield role_entity_1.default
                .countDocuments(query)
                .exec();
            return count > 0;
        });
    }
    getAllRoles(options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield role_entity_1.default
                .find()
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return roles.map(x => dataTransferDocument(x));
            }
            return roles;
        });
    }
    getAllRolesWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield role_entity_1.default
                .find(query)
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return roles.map(x => dataTransferDocument(x));
            }
            return roles;
        });
    }
    getRole(roleId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_entity_1.default
                .findById(roleId)
                .select(this.exclude)
                .exec();
            const result = role ? role : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getRoleWhere(criteria, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_entity_1.default
                .findOne(criteria)
                .select(this.exclude)
                .exec();
            const result = role ? role : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getFromRole(roleId, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_entity_1.default
                .findById(roleId)
                .select(select)
                .exec();
            const result = role ? role : null;
            return result;
        });
    }
    insertRole(data, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = new role_entity_1.default(data);
            yield role.validate();
            const saved = yield role.save(this.options);
            const result = saved ? saved : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updateRole(roleId, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_entity_1.default
                .findByIdAndUpdate(roleId, update, this.options)
                .select(this.exclude)
                .exec();
            const result = role ? role : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updateRoleWhere(query, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_entity_1.default
                .findOneAndUpdate(query, update, this.options)
                .select(this.exclude)
                .exec();
            const result = role ? role : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deleteRole(roleId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_entity_1.default
                .findByIdAndDelete(roleId)
                .exec();
            const result = role ? role : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deleteRoleWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_entity_1.default
                .findOneAndDelete(query)
                .exec();
            const result = role ? role : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    clearAllWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_entity_1.default
                .deleteMany(query)
                .exec();
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield role_entity_1.default
                .deleteMany({})
                .exec();
        });
    }
}
exports.default = RoleRepository;
