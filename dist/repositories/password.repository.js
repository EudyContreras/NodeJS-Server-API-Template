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
const password_entity_1 = __importDefault(require("../entitymodel/entities/password.entity"));
function dataTransferDocument(data) {
    const { userId, password, isTemp, expiresIn } = data;
    return { userId, password, isTemp, expiresIn };
}
class PasswordDTO {
    constructor(userId, password, isTemp, expiresIn) {
        this.userId = userId;
        this.password = password;
        this.isTemp = isTemp;
        this.expiresIn = expiresIn;
    }
}
exports.PasswordDTO = PasswordDTO;
/**
 * @description Data access layer Repository used
 * for interfacing with the password data.
 */
class PasswordRepository {
    constructor() {
        this.exclude = null;
        this.options = {
            new: true,
            upsert: false,
            useFindAndModify: false,
            runValidators: true
        };
    }
    hasPassword(passwordId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield password_entity_1.default
                .countDocuments({ _id: passwordId })
                .exec();
            return count > 0;
        });
    }
    hasPasswordWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield password_entity_1.default
                .countDocuments(query)
                .exec();
            return count > 0;
        });
    }
    getAllPasswords(options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwords = yield password_entity_1.default
                .find()
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return passwords.map(x => dataTransferDocument(x));
            }
            return passwords;
        });
    }
    getAllPasswordsWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwords = yield password_entity_1.default
                .find(query)
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return passwords.map(x => dataTransferDocument(x));
            }
            return passwords;
        });
    }
    getPassword(passwordId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_entity_1.default
                .findById(passwordId)
                .select(this.exclude)
                .exec();
            const result = password ? password : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getPasswordWhere(criteria, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_entity_1.default
                .findOne(criteria)
                .select(this.exclude)
                .exec();
            const result = password ? password : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getFromPassword(passwordId, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_entity_1.default
                .findById(passwordId)
                .select(select)
                .exec();
            const result = password ? password : null;
            return result;
        });
    }
    insertPassword(data, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = new password_entity_1.default(data);
            yield password.validate();
            const saved = yield password.save(this.options);
            const result = saved ? saved : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updatePassword(passwordId, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_entity_1.default
                .findByIdAndUpdate(passwordId, update, this.options)
                .select(this.exclude)
                .exec();
            const result = password ? password : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updatePasswordWhere(query, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_entity_1.default
                .findOneAndUpdate(query, update, this.options)
                .select(this.exclude)
                .exec();
            const result = password ? password : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deletePassword(passwordId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_entity_1.default
                .findByIdAndDelete(passwordId)
                .exec();
            const result = password ? password : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deletePasswordWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield password_entity_1.default
                .findOneAndDelete(query)
                .exec();
            const result = password ? password : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    clearAllWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield password_entity_1.default
                .deleteMany(query)
                .exec();
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield password_entity_1.default
                .deleteMany({})
                .exec();
        });
    }
}
exports.default = PasswordRepository;
