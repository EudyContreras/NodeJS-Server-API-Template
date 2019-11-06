"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entitySchema_1 = __importDefault(require("../entitySchema"));
const schema = new entitySchema_1.default({
    name: {
        unique: true,
        type: String,
        lowercase: true,
        trim: true,
        minlength: 3
    },
    code: {
        type: String,
        unique: true
    },
    level: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 10,
    }
}, { timestamps: true, strict: true, versionKey: false });
const Role = schema.getModel('Role');
exports.default = Role;
