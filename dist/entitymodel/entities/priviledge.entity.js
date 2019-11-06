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
    permissions: [{
            type: String,
            trim: true,
            lowercase: true,
            required: true
        }],
    controller: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 3,
        required: true,
    }
}, { timestamps: false, strict: false, versionKey: false });
schema.index({ userId: 1, controller: 1, }, { unique: true });
const Priviledge = schema.getModel('Priviledge');
exports.default = Priviledge;
