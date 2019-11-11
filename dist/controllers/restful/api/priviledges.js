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
const priviledge_service_1 = __importDefault(require("../../../services/priviledge.service"));
const token_validator_1 = __importDefault(require("../../../middleware/authenticators/token.validator"));
const access_validator_1 = __importDefault(require("../../../middleware/authenticators/access.validator"));
const body_validator_1 = __importDefault(require("../../../middleware/validators/body.validator"));
const blueprint_1 = __importDefault(require("../../../validation/schemas/priviledge/blueprint"));
class Priviledges extends controller_1.default {
    constructor(...allowedRoles) {
        super('priviledge');
        this.priviledgeService = new priviledge_service_1.default();
        this.routing = '/rest/api/priviledges';
        this.getAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.priviledgeService.getPriviledges(request.data);
            return this.buildResult(result, error, response, requestAction_1.default.GET_ALL);
        });
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.priviledgeService.createPriviledge(request.data);
            return this.buildResult(result, error, response, requestAction_1.default.CREATE);
        });
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.priviledgeService.updatePriviledge(request.data);
            return this.buildResult(result, error, response, requestAction_1.default.UPDATE);
        });
        this.delete = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.priviledgeService.revokePriviledge(request.data);
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
        router.get('/', token_validator_1.default, access_validator_1.default(...this.roles), body_validator_1.default(blueprint_1.default.PRIVILEDGE_QUERY), this.getAll);
        router.put('/', token_validator_1.default, access_validator_1.default(...this.roles), body_validator_1.default(blueprint_1.default.PRIVILEDGE_CREATE), this.create);
        router.patch('/', token_validator_1.default, access_validator_1.default(...this.roles), body_validator_1.default(blueprint_1.default.PRIVILEDGE_UPDATE), this.update);
        router.delete('/', token_validator_1.default, access_validator_1.default(...this.roles), body_validator_1.default(blueprint_1.default.PRIVILEDGE_QUERY), this.delete);
    }
}
exports.default = Priviledges;
