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
const token_validator_1 = __importDefault(require("../../../middleware/authenticators/token.validator"));
const access_validator_1 = __importDefault(require("../../../middleware/authenticators/access.validator"));
const role_service_1 = __importDefault(require("../../../services/role.service"));
const controller_1 = __importDefault(require("../../controller"));
const express_1 = __importDefault(require("express"));
const requestAction_1 = __importDefault(require("../../../definitions/requestAction"));
class Roles extends controller_1.default {
    constructor(...allowedRoles) {
        super('role');
        this.service = new role_service_1.default();
        this.routing = '/rest/api/roles';
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const roleId = request.query.roleId;
            if (roleId) {
                return this.getOne(roleId, request, response);
            }
            else {
                return this.getAll(request, response);
            }
        });
        this.getOne = (id, request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.service.getRole(id);
            return this.buildResult(result, error, response, requestAction_1.default.GET);
        });
        this.getAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { result, error } = yield this.service.getAllRoles();
            return this.buildResult(result, error, response, requestAction_1.default.GET_ALL);
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
        router.get('/', token_validator_1.default, access_validator_1.default(...this.roles), this.get);
        ;
    }
}
exports.default = Roles;
