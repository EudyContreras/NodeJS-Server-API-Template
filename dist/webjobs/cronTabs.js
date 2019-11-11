"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabs = {
    cleanup_invitations: {
        JOB: 'remove expired invitation',
        TAB: '30 2 * * *'
    },
    cleanup_passwords: {
        JOB: 'remove old teporary passwords',
        TAB: '30 3 * * *'
    },
};
exports.default = tabs;
