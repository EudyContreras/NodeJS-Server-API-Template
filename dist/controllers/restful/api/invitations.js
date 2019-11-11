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
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../../controller"));
const requestAction_1 = __importDefault(require("../../../definitions/requestAction"));
const invitation_service_1 = __importDefault(require("../../../services/invitation.service"));
const token_validator_1 = __importDefault(require("../../../middleware/authenticators/token.validator"));
const access_validator_1 = __importDefault(require("../../../middleware/authenticators/access.validator"));
const body_validator_1 = __importDefault(require("../../../middleware/validators/body.validator"));
const blueprint_1 = __importDefault(require("../../../validation/schemas/invitation/blueprint"));
class Invitations extends controller_1.default {
    constructor(...allowedRoles) {
        super('invitation');
        this.invitationService = new invitation_service_1.default();
        this.routing = '/rest/api/invitations';
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const hasProps = request.data ? Object.keys(request.data).length > 0 : null;
            if (hasProps) {
                return this.getOne(request.data, response);
            }
            else {
                return this.getAll(response);
            }
        });
        this.getOne = (query, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.invitationService.getInvitationWhere(query);
            return this.buildResult(result, error, response, requestAction_1.default.GET);
        });
        this.getAll = (response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.invitationService.getAllInvitations();
            return this.buildResult(result, error, response, requestAction_1.default.GET_ALL);
        });
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.invitationService.createInvitation(null, request.data);
            return this.buildResult(result, error, response, requestAction_1.default.CREATE);
        });
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inviteId = request.query.inviteId;
            const { result, error } = yield this.invitationService.updateInvitation(inviteId, request.data);
            return this.buildResult(result, error, response, requestAction_1.default.UPDATE);
        });
        this.delete = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inviteId = request.query.inviteId;
            const { result, error } = yield this.invitationService.deleteInvitation(inviteId);
            return this.buildResult(result, error, response, requestAction_1.default.DELETE);
        });
        this.roles = allowedRoles;
        this.router = express_1.default.Router();
        this.setupRoutes(this.router);
    }
    getRoute() {
        return this.routing;
    }
    getRouter() {
        return this.router;
    }
    setupRoutes(router) {
        router.get('/', token_validator_1.default, access_validator_1.default(...this.roles), body_validator_1.default(blueprint_1.default.INVITATION_QUERY), this.get);
        router.put('/', token_validator_1.default, access_validator_1.default(...this.roles), body_validator_1.default(blueprint_1.default.INVITATION_CREATE), this.create);
        router.patch('/', token_validator_1.default, access_validator_1.default(...this.roles), body_validator_1.default(blueprint_1.default.INVITATION_UPDATE), this.update);
        router.delete('/', token_validator_1.default, access_validator_1.default(...this.roles), this.delete);
    }
}
exports.default = Invitations;
