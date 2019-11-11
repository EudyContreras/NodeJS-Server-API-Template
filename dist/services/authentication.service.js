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
const vault_1 = __importDefault(require("../config/vault"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("./user.service"));
const password_repository_1 = __importDefault(require("../repositories/password.repository"));
const notification_service_1 = __importDefault(require("./notification.service"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const cache_handler_1 = __importDefault(require("../handlers/cache.handler"));
const encryption_service_1 = __importDefault(require("./encryption.service"));
const message_response_1 = require("../messages/message.response");
const string_utility_1 = require("../utilities/string.utility");
class AuthenticationService {
    constructor() {
        this.redisCacheHandler = new cache_handler_1.default();
    }
    /**
     * @description Authenticates the user by verifying that
     * the credetials match our internal records.
     * @param credentials The email and password used for athentication
     * @returns The possible user id and token or an error that has been produced.
     */
    authenticate(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = credentials;
                const repository = new user_repository_1.default();
                const passwordRepository = new password_repository_1.default();
                const encryptionService = new encryption_service_1.default();
                const user = yield repository.getUserWhere({ email: email }, { dto: false });
                if (!user)
                    return { error: message_response_1.AuthenticationMessages.NO_USER_EMAIL };
                const isMatch = yield encryptionService.comparePasswords(password, user.password);
                if (!isMatch) {
                    const tempPasswords = yield passwordRepository.getAllPasswordsWhere({ userId: user.id });
                    if (tempPasswords.length > 0) {
                        var noMatch = true;
                        for (const tempPassword of tempPasswords) {
                            const isMatch = yield encryptionService.comparePasswords(password, tempPassword.password);
                            if (isMatch)
                                noMatch = false;
                        }
                        if (noMatch)
                            return { error: message_response_1.AuthenticationMessages.WRONG_PASSWORD };
                    }
                }
                const { token, error } = yield this.createToken(user);
                if (error)
                    return { error };
                const result = { userId: user.id, token: token };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Sends an email to the user with the specified email with
     * a temporary password which the user is to use to enter his/her account.
     * @param data T
     * @returns the potential result represented as a message indicating that
     * a recovery email was succesfully sent or the possible generated error.
     */
    recoverPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = data.email;
            const passwordLength = 32;
            const randomPassword = string_utility_1.randomString(passwordLength);
            try {
                const userService = new user_service_1.default();
                const passwordRepository = new password_repository_1.default();
                const notificationService = yield new notification_service_1.default();
                const encryptionService = new encryption_service_1.default();
                const result = yield userService.getUserByEmail(email);
                if (!result.result)
                    return { error: result.error };
                const user = result.result;
                const { error, hash } = yield encryptionService.encryptPassword(randomPassword);
                if (error)
                    return { error };
                const passwordData = {
                    userId: user.id,
                    password: hash,
                    isTemp: true
                };
                const password = yield passwordRepository.insertPassword(passwordData);
                if (!password)
                    return { error: message_response_1.AuthenticationMessages.FAILURE };
                yield notificationService.sendPasswordRecoveryEmail(email, randomPassword);
                return { result: message_response_1.NotificationMessages.RECOVERY_EMAIL };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
    * @description Retrieves the user data for the user with the
    * matching id.
    * @param userId The user id of the user to retrieve
    * credentials for.
    * @param getDTO Flag for determine if the a dto should
    * be returned
    * @returns The possible user or an error that has been produced.
    */
    getUser(userId, getDTO = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const result = yield repository.getUser(userId, { dto: getDTO });
                if (!result)
                    return { error: message_response_1.AuthenticationMessages.NO_USER_FOUND };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Creates the token for the given user.
     * @param user The user to create a token for
     * @param redisCache The cache handler used for caching tokens.
     * @returns {{token: string, error: string}} The possible token
     * or an error that has been produced.
     */
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    userId: user.id,
                    roleCode: user.roleCode
                };
                const token = yield jsonwebtoken_1.default.sign(payload, vault_1.default.jwt.TOKEN_SECRET, { expiresIn: vault_1.default.jwt.EXPIRATION_TIME });
                if (this.redisCacheHandler.available()) {
                    const { error } = yield this.redisCacheHandler.saveValues(payload.userId, token);
                    if (error)
                        throw new Error(error);
                }
                return { token };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Checks if the given token is black listed and no longer valid.
     * A token is blacklisted when a new token has been issued to the same user.
     * @param token The token to be checked.
     * @returns true if the token is found in the blacklist
     * records and false if it isnt.
     */
    isBlackListed(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.redisCacheHandler.available()) {
                return Promise.resolve(false).then();
            }
            return Promise.resolve(false).then();
        });
    }
    /**
     * @description Invalidates the tokens issued to the given user.
     * The user will need to reauthenticate in order to regain access.
     * @param user The user to invalidate the tokens for.
     * @returns The flag indicating token invalidation an error that has been produced.
     */
    invalidateTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(() => { });
        });
    }
}
exports.default = AuthenticationService;
