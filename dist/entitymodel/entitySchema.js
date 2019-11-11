"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
class EntitySchema extends mongoose_2.Schema {
    constructor(definition, options) {
        super(definition, options);
    }
    getModel(name) {
        return mongoose_1.default.model(name, this);
    }
}
exports.default = EntitySchema;
