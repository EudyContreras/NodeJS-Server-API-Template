"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vault_1 = __importDefault(require("../config/vault"));
class PriviledgeData {
    constructor(type, code) {
        this.type = type;
        this.code = code;
    }
}
const CODES = [...vault_1.default.priviledges.CODES];
const READ = 'read';
exports.READ = READ;
const CREATE = 'create';
exports.CREATE = CREATE;
const UPDATE = 'update';
exports.UPDATE = UPDATE;
const DELETE = 'delete';
exports.DELETE = DELETE;
const PRIVILEDGES = [
    new PriviledgeData(READ, CODES[0]),
    new PriviledgeData(CREATE, CODES[1]),
    new PriviledgeData(UPDATE, CODES[2]),
    new PriviledgeData(DELETE, CODES[3]),
];
exports.PRIVILEDGES = PRIVILEDGES;
const ALL = [
    READ,
    CREATE,
    UPDATE,
    DELETE
];
exports.ALL = ALL;
exports.default = {
    READ,
    CREATE,
    UPDATE,
    DELETE
};
