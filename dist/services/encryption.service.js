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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const vault_1 = __importDefault(require("../config/vault"));
class EncryptionService {
    /**
     * @description Compares the old password as plain text with the current
     * hashed and salted password.
     * @param oldPassword The password input as plain text
     * @param currentPassword The current password as a hash.
     * @returns True if the passwords match otherwise false.
     */
    comparePasswords(oldPassword, currentPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(oldPassword, currentPassword);
        });
    }
    /**
     * @description Used for encrypting passwords by hashing using salt.
     * @param password The password to be encrypted
     * @param iterations The number of iterations used for creating the hash salt.
     * @returns The hashed and salted password or a generated error.
     */
    encryptPassword(password, iterations = vault_1.default.encryption.SALT_ITERATIONS) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password)
                return { error: new Error('The given password is empty or null') };
            try {
                const salt = yield bcryptjs_1.default.genSaltSync(iterations);
                const hash = yield bcryptjs_1.default.hashSync(password, salt);
                return { hash };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.default = EncryptionService;
