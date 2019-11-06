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
const priviledge_entity_1 = __importDefault(require("../entitymodel/entities/priviledge.entity"));
function dataTransferDocument(data) {
    const { userId, permissions, controller } = data;
    return new PriviledgeDTO(userId, permissions, controller);
}
class PriviledgeDTO {
    constructor(userId, permissions, controller) {
        this.userId = userId;
        this.permissions = permissions;
        this.controller = controller;
    }
}
exports.PriviledgeDTO = PriviledgeDTO;
/**
 * @description Data access layer Repository used
 * for interfacing with the priviledge data.
 */
class PriviledgeRepository {
    constructor() {
        this.exclude = null;
        this.options = {
            new: true,
            upsert: true,
            useFindAndModify: false,
            runValidators: true
        };
    }
    hasPriviledge(priviledgeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield priviledge_entity_1.default
                .countDocuments({ _id: priviledgeId })
                .exec();
            return count > 0;
        });
    }
    hasPriviledgeWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield priviledge_entity_1.default
                .countDocuments(query)
                .exec();
            return count > 0;
        });
    }
    getAllPriviledges(options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledges = yield priviledge_entity_1.default
                .find()
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return priviledges.map(x => dataTransferDocument(x));
            }
            return priviledges;
        });
    }
    getAllPriviledgesWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledges = yield priviledge_entity_1.default
                .find(query)
                .select(this.exclude)
                .exec();
            if (options.dto === true) {
                return priviledges.map(x => dataTransferDocument(x));
            }
            return priviledges;
        });
    }
    getPriviledge(priviledgeId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .findById(priviledgeId)
                .select(this.exclude)
                .exec();
            const result = priviledge ? priviledge : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getPriviledgeWhere(criteria, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .findOne(criteria)
                .select(this.exclude)
                .exec();
            const result = priviledge ? priviledge : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    getFromPriviledge(priviledgeId, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .findById(priviledgeId)
                .select(select)
                .exec();
            const result = priviledge ? priviledge : null;
            return result;
        });
    }
    insertPriviledge(data, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = new priviledge_entity_1.default(data);
            yield priviledge.validate();
            const saved = yield priviledge.save(this.options);
            const result = saved ? saved : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updateOrInsertPriviledge(query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .updateOne(query, update, this.options)
                .select(this.exclude);
            return priviledge;
        });
    }
    updatePriviledge(priviledgeId, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .findByIdAndUpdate(priviledgeId, update, this.options)
                .select(this.exclude)
                .exec();
            const result = priviledge ? priviledge : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    updatePriviledgeWhere(query, update, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .findOneAndUpdate(query, update, this.options)
                .select(this.exclude)
                .exec();
            const result = priviledge ? priviledge : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deletePriviledge(priviledgeId, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .findByIdAndDelete(priviledgeId)
                .exec();
            const result = priviledge ? priviledge : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    deletePriviledgeWhere(query, options = { dto: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const priviledge = yield priviledge_entity_1.default
                .findOneAndDelete(query)
                .exec();
            const result = priviledge ? priviledge : null;
            if (options.dto === true && result != null) {
                return dataTransferDocument(result);
            }
            return result;
        });
    }
    clearAllWhere(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield priviledge_entity_1.default
                .deleteMany(query)
                .exec();
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield priviledge_entity_1.default
                .deleteMany({})
                .exec();
        });
    }
}
exports.default = PriviledgeRepository;
