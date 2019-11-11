"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vault_1 = __importDefault(require("../config/vault"));
class RoleData {
    constructor(type, code, level) {
        this.type = type;
        this.code = code;
        this.level = level;
    }
}
const CODES = [...vault_1.default.roles.CODES];
exports.CODES = CODES;
const ROOT = 'root';
exports.ROOT = ROOT;
const ADMIN = 'admin';
exports.ADMIN = ADMIN;
const GUEST = 'guest';
exports.GUEST = GUEST;
const USER = 'user';
exports.USER = USER;
const NONE = 'none';
exports.NONE = NONE;
const ACCESS_ROLES = [
    new RoleData(ROOT, CODES[0], vault_1.default.roles.CLEARANCE.ROOT),
    new RoleData(ADMIN, CODES[1], vault_1.default.roles.CLEARANCE.VERY_HIGH),
    new RoleData(USER, CODES[2], vault_1.default.roles.CLEARANCE.NORMAL),
    new RoleData(GUEST, CODES[3], vault_1.default.roles.CLEARANCE.LOW)
];
exports.ACCESS_ROLES = ACCESS_ROLES;
const ALL = [ROOT, ADMIN, GUEST, USER];
exports.ALL = ALL;
exports.default = {
    ROOT, ADMIN, GUEST, USER, ACCESS_ROLES
};
