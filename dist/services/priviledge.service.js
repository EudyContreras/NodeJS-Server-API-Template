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
const priviledge_respository_1 = __importDefault(require("../repositories/priviledge.respository"));
const message_response_1 = require("../messages/message.response");
class AccessPriviledgeService {
    /**
     * @description Retrieves the priviledges for the user matching the given
     * user id which also match the specified query criteria.
     * @param  query The criteria that the priviledges need to fulfill.
     * @returns A list of the matched priviledges or a produced error.
     */
    getPriviledges(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new priviledge_respository_1.default();
                const result = yield repository.getAllPriviledgesWhere(query);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Retrieves the priviledges for the user matching the given
     * user id which also match the specified query criteria.
     * @param userId The user id attached to the priviledges to retrieve.
     * @param queryData The criteria that the priviledges need to fulfill.
     * @returns A list of the matched priviledges or a produced error.
     */
    hasPermission(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new priviledge_respository_1.default();
                const controller = query.controller;
                const priviledge = yield repository.getPriviledgeWhere({ userId, controller });
                if (!priviledge) {
                    return { error: message_response_1.PriviledgeMessages.ACCESS_DENIED };
                }
                const hasPermission = priviledge.permissions.some(x => x === query.permission);
                return { result: hasPermission };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Creates a new priviledge based on the given data.
     * @param priviledge The data containing information about the new priviledge.
     * @returns The newly created priviledge or a produced error.
     */
    createPriviledge(priviledge) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new priviledge_respository_1.default();
                const result = yield repository.insertPriviledge(priviledge);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Updates a priviledge based on the given data.
     * @param priviledge The data containing information about the priviledge.
     * @returns The newly created priviledge or a produced error.
     */
    updatePriviledge(priviledge) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new priviledge_respository_1.default();
                const { controller, userId } = priviledge;
                const result = yield repository.updatePriviledgeWhere({ userId, controller }, priviledge);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Revokes/deletes a new priviledge that matches the specified
     * action data for the specified user id.
     * @param actionData The data containing information about the priviledge.
     * @returns The revoked priviledge
     * or a produced error.
     */
    revokePriviledge(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new priviledge_respository_1.default();
                const result = yield repository.deletePriviledgeWhere(data);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
    /**
     * @description Revokes/deletes all priviledges for the specified user id.
     * @param userId The user id attached to the priviledges to revoke.
     * @returns The number of priviledges that have been revoked or a produced error.
     */
    revokeAllPriviledges(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new priviledge_respository_1.default();
                const query = { userId };
                const result = yield repository.clearAllWhere(query);
                return { result };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.default = AccessPriviledgeService;
