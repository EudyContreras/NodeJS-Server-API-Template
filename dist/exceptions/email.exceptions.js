"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmainNotificationException extends Error {
    constructor(sender, recipient, message) {
        super(message);
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
    }
}
exports.EmainNotificationException = EmainNotificationException;
