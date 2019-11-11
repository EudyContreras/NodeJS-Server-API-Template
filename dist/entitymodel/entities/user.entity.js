"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entitySchema_1 = __importDefault(require("../entitySchema"));
const schema = new entitySchema_1.default({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roleCode: {
        type: String,
        required: true,
        default: null
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
    lastLogin: {
        type: Date,
        required: false
    },
}, { timestamps: true, strict: true, versionKey: false });
const User = schema.getModel('User');
exports.default = User;
