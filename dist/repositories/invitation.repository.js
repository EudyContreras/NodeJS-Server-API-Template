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
const invitation_entity_1 = __importDefault(require("../entitymodel/entities/invitation.entity"));
function dataTransferDocument(data) {
    return {
        id: data.id,
        email: data.email,
        pending: data.pending,
        expired: data.expired,
        roleCode: data.roleCode,
        expirationTime: data.expirationTime
    };
}
/**
 * @description Data access layer Repository used
 * for interfacing with the invitation data.
 */
class InvitationRepository {
    constructor() {
        this.exclude = null;
        this.options = {
            new: true,
            upsert: false,
            useFindAndModify: false,
            runValidators: true
        };
    }
    hasInvitation(invitationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield invitation_entity_1.default
                .countDocuments({ _id: invitationId })
                .exec();
            return count > 0;
        });
    }
    hasInvitationWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield invitation_entity_1.default
                .countDocuments(query)
                .exec();
            return count > 0;
        });
    }
    getAllInvitations(options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitations = yield invitation_entity_1.default
                .find()
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return invitations.map(x => dataTransferDocument(x));
            }
            return invitations;
        });
    }
    getAllInvitationsWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitations = yield invitation_entity_1.default
                .find(query)
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return invitations.map(x => dataTransferDocument(x));
            }
            return invitations;
        });
    }
    getInvitation(invitationId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield invitation_entity_1.default
                .findById(invitationId)
                .select(this.exclude)
                .exec();
            if (options.dto === true && invitation != null) {
                return dataTransferDocument(invitation);
            }
            return invitation;
        });
    }
    getInvitationWhere(criteria, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield invitation_entity_1.default
                .findOne(criteria)
                .select(this.exclude)
                .exec();
            if (options.dto === true && invitation != null) {
                return dataTransferDocument(invitation);
            }
            return invitation;
        });
    }
    getFromInvitation(invitationId, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield invitation_entity_1.default
                .findById(invitationId)
                .select(select)
                .exec();
            return invitation;
        });
    }
    insertInvitation(data, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = new invitation_entity_1.default(data);
            yield invitation.validate();
            const saved = yield invitation.save(this.options);
            if (options.dto === true && saved != null) {
                return dataTransferDocument(saved);
            }
            return saved;
        });
    }
    updateInvitation(invitationId, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield invitation_entity_1.default
                .findByIdAndUpdate(invitationId, update, this.options)
                .select(this.exclude)
                .exec();
            if (options.dto === true && invitation != null) {
                return dataTransferDocument(invitation);
            }
            return invitation;
        });
    }
    updateInvitationWhere(query, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield invitation_entity_1.default
                .findOneAndUpdate(query, update, this.options)
                .select(this.exclude)
                .exec();
            if (options.dto === true && invitation != null) {
                return dataTransferDocument(invitation);
            }
            return invitation;
        });
    }
    deleteInvitation(invitationId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield invitation_entity_1.default
                .findByIdAndDelete(invitationId)
                .exec();
            const result = invitation ? invitation : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deleteInvitationWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield invitation_entity_1.default
                .findOneAndDelete(query)
                .exec();
            const result = invitation ? invitation : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    clearAllWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield invitation_entity_1.default
                .deleteMany(query)
                .exec();
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield invitation_entity_1.default
                .deleteMany({})
                .exec();
        });
    }
}
exports.default = InvitationRepository;
