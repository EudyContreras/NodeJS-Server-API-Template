"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    /**
     * Constructs an ErrorHandler with an error logger.
     * @param logger The logger used by this
     * error handler for logging handled errors.
     */
    constructor(logger) {
        this.logger = logger;
    }
    /**
     * Handles a produce error and logs information about
     * the error.
     * @param error The error that was produced.
     * @param type The type of error to handle.
     */
    onError(error) {
        if (error instanceof Error) {
            this.logger.logError(error.message);
        }
        else {
            this.logger.logError(error);
        }
    }
}
exports.default = ErrorHandler;
