"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggingHandler {
    /**
     * Loggs information using an injected dependency.
     * @param info The information to be logged
     */
    logInfo(info) {
        console.log(info);
    }
    /**
     * Loggs debug information using an injected dependency.
     * @param info The debug information to be logged
     */
    logDebug(text) {
        console.debug(text);
    }
    /**
     * Loggs error using an injected dependency.
     * @param info The error to be logged
     */
    logError(error) {
        console.error(error);
    }
}
exports.default = LoggingHandler;
