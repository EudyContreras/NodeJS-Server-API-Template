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
const invitation_repository_1 = __importDefault(require("../repositories/invitation.repository"));
const notification_service_1 = __importDefault(require("./notification.service"));
const role_service_1 = __importDefault(require("./role.service"));
const message_response_1 = require("../messages/message.response");
class InviationService {
    /**
     * @description Checks if there if an invitation has been issued to
     * the current user.
     * @param email The email of the possibly invited user.
     * @returns The possible flag indicating if the user has
     * received and invitation or the generated error.
     */
    hasInvitation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.hasInvitationWhere({ email: email });
                if (!result)
                    return { error: message_response_1.InvitationMessages.NO_INVITATION };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Checks if there if an invitation has been issued to
     * the current user and if the invitation is active.
     * @information An invitation is active when it has not expired.
     * @param email The email of the possibly invited user.
     * @returns The possible flag indicating if the user has received
     * and invitation or the generated error.
     */
    hasActiveInvitation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.hasInvitationWhere({ email: email, expired: false });
                if (!result)
                    return { error: message_response_1.InvitationMessages.EXPIRED };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Checks if there if an invitation has been issued to
     * the current user and if the invitation is active and pending.
     * @information An invitation is active when it has not expired.
     * @param email The email of the possibly invited user.
     * @returns  The possible flag indicating if the user has received
     * and invitation or the generated error.
     */
    hasActivePendingInvitation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { email: email, expired: false, pending: true };
                const repository = new invitation_repository_1.default();
                const result = yield repository.getInvitationWhere(query);
                if (!result)
                    return { error: message_response_1.InvitationMessages.NOT_PENDING };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Gets all the available invitations.
     * @returns The possible listof invitations or the generated error.
     */
    getAllInvitations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.getAllInvitations();
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
      * @description Gets all the available invitations.
      * @param criteria The criteria used for making the search.
      * @returns The possible list of invitations or the generated error.
      */
    getAllInvitationsWhere(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.getAllInvitationsWhere(criteria);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrieves the invitation attached to the given
     * email if there is any.
     * @param criteria the criteria used for the invitation search.
     * invitation.
     * @returns The invitation attached to the given email or the generated error.
     */
    getInvitationWhere(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.getInvitationWhere(criteria);
                if (!result)
                    return { error: message_response_1.InvitationMessages.NO_INVITATION };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrieves the invitation attached to the given
     * invitation id if there is any.
     * @param inviteId The invitation id of the invitation to
     * retrieve
     * @returns The invitation attached to the given id or the generated error.
     */
    getInvitation(inviteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.getInvitation(inviteId);
                if (!result)
                    return { error: message_response_1.InvitationMessages.NO_INVITATION };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Updates the role code of the invitation that
     * matches the given invite Id.
     * @param inviteId The invitation id of the invitation.
     * @param updateData The invitation data used for the update.
     * @returns {{result: any, error: string}} The invitation
     * attached to the given id or the generated error.
     */
    updateInvitation(inviteId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                if (data.role) {
                    const service = new role_service_1.default();
                    const { result } = yield service.getRoleCode(data.role);
                    delete data.role;
                    if (result)
                        data.roleCode = result;
                }
                const result = yield repository.updateInvitation(inviteId, data);
                if (!result)
                    return { error: message_response_1.InvitationMessages.NO_INVITATION };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
   * @description Updates the role code of the invitation that
   * matches the given invite Id.
   * @param criteria The invitation criteria.
   * @param update The invitation data used for the update.
   * @returns The invitation attached to the given id or the generated error.
   */
    updateInvitationWhere(criteria, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.updateInvitationWhere(criteria, update);
                if (!result)
                    return { error: message_response_1.InvitationMessages.NO_INVITATION };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Creates an invitation with the given invitation
     * data and the given creator id.
     * @param creatorId The user that issued the invitaiton.
     * @param inviteData  The data containing the invitation details.
     * @returns The created invitation attached to the given id or the generated error.
     * @throws
     */
    createInvitation(hostId, inviteData) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = inviteData.email;
            const roleName = inviteData.role;
            const expirationTime = inviteData.expirationTime;
            try {
                const service = new role_service_1.default();
                const repository = new invitation_repository_1.default();
                const { error, result } = yield service.getRoleCode(roleName);
                if (error)
                    return { error: error };
                const exists = yield repository.hasInvitationWhere({ email: email });
                if (exists)
                    return this.handleExisting(email, repository);
                const invitation = {
                    email: email,
                    hostId: hostId,
                    roleCode: result,
                    expirationTime: expirationTime
                };
                const invite = yield repository.insertInvitation(invitation);
                if (invite) {
                    const emailService = yield new notification_service_1.default();
                    yield emailService.sendInvitationEmail(invite);
                }
                return { result: invite };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Revokes the invitation for the given user
     * email if any is present..
     * @param email The user email to revoke the invitation from.
     * @returns The revoked invitation or the generated error.
     */
    revokeInvitation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.deleteInvitationWhere({ email: email });
                if (!result)
                    return { error: message_response_1.InvitationMessages.NO_INVITATION };
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Deletes the invitation that matches the given invitation id.
     * @param inviteId The id of the invitation to delete.
     * @returns The deleted invitation or the generated error.
     */
    deleteInvitation(inviteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.deleteInvitation(inviteId);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Deletes all the available invitations.
     * @returns {{result: any, error: string}} The number invitations
     * deleted or the generated error.
     */
    clearInvitations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new invitation_repository_1.default();
                const result = yield repository.clearAll();
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Handles the case when there already exists
     * an invitation attached to the given email.
     * @param email The emai attached to the invitation.
     * @param repository The repository used for interfacing with the invivation data.
     */
    handleExisting(email, repository) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invitation = yield repository.getInvitationWhere({ email: email });
                if (invitation === null)
                    return { error: message_response_1.InvitationMessages.NO_INVITATION };
                if (invitation.pending && !invitation.expired) {
                    return { error: message_response_1.InvitationMessages.IS_PENDING };
                }
                if (!invitation.pending && !invitation.expired) {
                    return { error: message_response_1.InvitationMessages.IS_ACTIVE };
                }
                return { error: null };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.default = InviationService;
