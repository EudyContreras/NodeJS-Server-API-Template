"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entitySchema_1 = __importDefault(require("../entitySchema"));
const schema = new entitySchema_1.default({
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    expiresIn: {
        type: Number,
        required: false,
        default: 172800
    },
    isTemp: {
        type: Boolean,
        required: true
    }
}, { timestamps: true, strict: true, versionKey: false });
const Password = schema.getModel('Password');
exports.default = Password;
