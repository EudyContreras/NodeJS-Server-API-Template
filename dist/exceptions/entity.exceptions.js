"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoDBException extends Error {
    constructor(document, action, message) {
        super(message);
        this.document = document;
        this.action = action;
        this.message = message;
    }
}
exports.MongoDBException = MongoDBException;
