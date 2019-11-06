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
const invitation_service_1 = __importDefault(require("./invitation.service"));
const encryption_service_1 = __importDefault(require("./encryption.service"));
const authentication_service_1 = __importDefault(require("./authentication.service"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const password_repository_1 = __importDefault(require("../repositories/password.repository"));
const message_response_1 = require("../messages/message.response");
class UserService {
    /**
     * @description Returns a result with all the users which are currently in
     * the database.
     * @returns the potential result represented as a list of users or
     * the possible generated error.
     */
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const users = yield repository.getAllUsers();
                return { result: users };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Returns a result with the user with the matching id
     * the database.
     * @param  userId The id of the user to return
     * @returns the potential result represented as the user that matches
     * the given id or the possible generated error.
     */
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const user = yield repository.getUser(userId);
                if (!user)
                    return { error: message_response_1.UserMessages.NO_SUCH_ID };
                return { result: user };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Returns a result with the user with the matching email
     * the database.
     * @param email The email of the user to return
     * @returns the potential result represented as  user that matches the
     * given email or the possible generated error.
     */
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const user = yield repository.getUserWhere({ email: email });
                if (!user)
                    return { error: message_response_1.UserMessages.NO_SUCH_EMAIL };
                return { result: user };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Returns a result with the user with the matching email
     * the database.
     * @param criteria The criteria used for finding the user.
     * @returns the potential result represented as  user that matches the
     * given email or the possible generated error.
     */
    getUserWhere(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const user = yield repository.getUserWhere(criteria);
                if (!user)
                    return { error: message_response_1.UserMessages.NO_SUCH_USER };
                return { result: user };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Updates the user with the matching id with the specified data
     * Only the first name, last name and company id of the user can be updated by this
     * function.
     * @param userId The id of the user to return
     * @param  update data with the updated user details.
     * @returns the potential result represented as the user who has been
     * updated or the possible generated error.
     */
    updateUser(userId, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const user = yield repository.updateUser(userId, update);
                if (!user)
                    return { error: message_response_1.UserMessages.NO_SUCH_ID };
                return { result: user };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Updates the user role for the user with the given user id.
     * @param userId The id of the user.
     * @param update The new role code data to be assigned.
     * @returns the potential result represented as the user whose role was
     * updated or the possible generated error.
     */
    updateUserRole(userId, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const user = yield repository.updateUser(userId, update);
                if (!user)
                    return { error: message_response_1.UserMessages.NO_SUCH_ID };
                return { result: user };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Updates the passsword of the user with the new password
     * given that the old password matches the user records. A password
     * update invalidates any possible token issued to the user.
     * @param  userId The id of the user.
     * @param passwordData The data containing the old and new passwords.
     * @returns the potential result represented as the user whose password
     * was updated or the possible generated error.
     */
    updateUserPassword(userId, passwordData, internal = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPassword = passwordData.oldPassword;
            const newPassword = passwordData.newPassword;
            try {
                const userRepository = new user_repository_1.default();
                const passwordRepository = new password_repository_1.default();
                const encryptionService = new encryption_service_1.default();
                const authenticationService = new authentication_service_1.default();
                const user = yield userRepository.getUser(userId, { dto: false });
                if (user === null)
                    return { error: message_response_1.UserMessages.NO_SUCH_USER };
                const isMatch = yield encryptionService.comparePasswords(currentPassword, user.password);
                if (isMatch || internal) {
                    const { error, hash } = yield encryptionService.encryptPassword(newPassword);
                    if (error) {
                        return { error };
                    }
                    const update = {
                        password: hash,
                        updateDate: Date.now
                    };
                    const result = yield userRepository.updateUser(userId, update);
                    if (!result) {
                        return { error: message_response_1.UserMessages.NO_SUCH_USER };
                    }
                    const revokeResult = yield authenticationService.invalidateTokens(result);
                    yield passwordRepository.clearAllWhere({ userId: user.id });
                    return { result: result, error: revokeResult.error };
                }
                else {
                    return { error: message_response_1.UserMessages.WRONG_PASSWORD };
                }
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Registers a user given that the user has a pending active
     * invitation.
     * @param userData The data of the user to be registered.
     * @returns the potential result represented as the user who was just
     * created or the possible generated error.
     */
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = userData.email;
            const encryptionService = new encryption_service_1.default();
            const invitationService = new invitation_service_1.default();
            const passwordRepository = new password_repository_1.default();
            const authenticationService = new authentication_service_1.default();
            try {
                const result = yield invitationService.getInvitationWhere({ email: email });
                if (result.error)
                    return { error: result.error };
                const invitation = result.result;
                const repository = new user_repository_1.default();
                const exists = yield repository.hasUserWhere({ email: email });
                if (exists)
                    return { error: message_response_1.UserMessages.EMAIL_TAKEN };
                const encryptResult = yield encryptionService.encryptPassword(userData.password);
                if (!encryptResult.hash)
                    return { error: encryptResult.error };
                const name = userData.name;
                const roleCode = invitation.roleCode;
                const password = encryptResult.hash;
                const data = {
                    name: name,
                    email: email,
                    roleCode: roleCode,
                    password: password,
                    lastLogin: null,
                    active: true
                };
                const user = yield repository.insertUser(data);
                if (user === null)
                    return { error: message_response_1.UserMessages.NO_SUCH_USER };
                const tokeResult = yield authenticationService.createToken(user);
                const { error } = yield this.updateInviteStatus(invitation.id, invitationService);
                if (error)
                    return { error };
                return { result: { user: user, token: tokeResult.token, error: tokeResult.error } };
            }
            catch (error) {
                return { error };
            }
        });
    }
    updateInviteStatus(inviteId, invitationService) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                pending: false
            };
            return yield invitationService.updateInvitation(inviteId, data);
        });
    }
    /**
     * @description Removes the user that matches the given user id from
     * our records.
     * @param userId The id of the user to be deleted
     * @returns the potential result represented as the user who was just
     * removed or the possible generated error.
     */
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const user = yield repository.deleteUser(userId);
                return { result: user };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Removes all the users from the database.
     * @returns the potential result represented as number of deleted users
     * or the possible generated error.
     */
    clearUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new user_repository_1.default();
                const result = yield repository.clearAll();
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.default = UserService;
