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
const password_repository_1 = __importDefault(require("../repositories/password.repository"));
const message_response_1 = require("../messages/message.response");
class PasswordService {
    /**
     * @description Retrieves all the available passwords
     * @returns A list containing all the passwords or a produced error.
     */
    getAllPasswords() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new password_repository_1.default();
                const result = yield repository.getAllPasswords();
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrieves the password that matches the password id
     * @param passwordId The id of the password to retrieve
     * @returns The password that matches the given id or a produced error.
     */
    getPasswordFor(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new password_repository_1.default();
                const result = yield repository.getPasswordWhere({ userId });
                if (!result)
                    return { error: message_response_1.PasswordMessages.NO_SUCH_PASSWORD };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Creates a new password with the specifed data.
     * @param password The password data to use for creating the new password.
     * @returns The password that has just been created or a produced error.
     */
    createPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new password_repository_1.default();
                const result = yield repository.insertPassword(password);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Deletes the password with the matching id.
     * @param passwordId The id of the password to be deleted.
     * @returns The password that has just been deleted or a produced error.
     */
    deletePassword(passwordId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new password_repository_1.default();
                const result = yield repository.deletePassword(passwordId);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.default = PasswordService;
