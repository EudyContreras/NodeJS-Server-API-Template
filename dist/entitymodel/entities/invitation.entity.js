"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entitySchema_1 = __importDefault(require("../entitySchema"));
const schema = new entitySchema_1.default({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    roleCode: {
        type: String,
        required: true,
        default: null
    },
    hostessId: {
        type: String,
        required: false,
    },
    pending: {
        type: Boolean,
        required: false,
        default: true
    },
    expired: {
        type: Boolean,
        required: false,
        default: false
    },
    expirationTime: {
        type: Number,
        required: false,
        default: null
    }
}, { timestamps: true, strict: true, versionKey: false });
const Invitation = schema.getModel('Invitation');
exports.default = Invitation;
