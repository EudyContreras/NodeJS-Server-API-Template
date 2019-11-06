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
const user_entity_1 = __importDefault(require("../entitymodel/entities/user.entity"));
const date_utility_1 = __importDefault(require("../utilities/date.utility"));
function dataTransferDocument(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        lastLogin: user.lastLogin,
        roleCode: user.roleCode,
        active: user.active,
        createdAt: date_utility_1.default.normalize(new Date(user.createdAt)),
        updatedAt: date_utility_1.default.normalize(new Date(user.updatedAt))
    };
}
function normalized(user) {
    return user;
}
/**
 * @description Data access layer Repository used
 * for interfacing with the user data.
 */
class UserRepository {
    constructor() {
        this.exclude = null;
        this.options = {
            new: true,
            upsert: false,
            useFindAndModify: false,
            runValidators: true
        };
    }
    hasUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield user_entity_1.default
                .countDocuments({ _id: userId })
                .exec();
            return count > 0;
        });
    }
    hasUserWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield user_entity_1.default
                .countDocuments(query)
                .exec();
            return count > 0;
        });
    }
    getAllUsers(options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_entity_1.default
                .find()
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return users.map(x => dataTransferDocument(x));
            }
            return users;
        });
    }
    getAllUsersWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_entity_1.default
                .find(query)
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return users.map(x => dataTransferDocument(x));
            }
            return users;
        });
    }
    getUser(userId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.default
                .findById(userId)
                .select(this.exclude)
                .exec();
            const result = user ? user : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getUserWhere(criteria, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.default
                .findOne(criteria)
                .select(this.exclude)
                .exec();
            const result = user ? user : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getFromUser(userId, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.default
                .findById(userId)
                .select(select)
                .exec();
            const result = user ? user : null;
            return result;
        });
    }
    insertUser(data, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_entity_1.default(data);
            yield user.validate();
            const saved = yield user.save(this.options);
            const result = saved ? saved : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updateUser(userId, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.default
                .findByIdAndUpdate(userId, update, this.options)
                .select(this.exclude)
                .exec();
            const result = user ? user : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updateUserWhere(query, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.default
                .findOneAndUpdate(query, update, this.options)
                .select(this.exclude)
                .exec();
            const result = user ? user : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deleteUser(userId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.default
                .findByIdAndDelete(userId)
                .exec();
            const result = user ? user : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deleteUserWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_entity_1.default
                .findOneAndDelete(query)
                .exec();
            const result = user ? user : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    clearAllWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_entity_1.default
                .deleteMany(query)
                .exec();
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_entity_1.default
                .deleteMany({})
                .exec();
        });
    }
}
exports.default = UserRepository;
