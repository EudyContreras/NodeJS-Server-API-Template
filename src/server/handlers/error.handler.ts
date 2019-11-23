import Logger from './logging.handler';

export default class ErrorHandler {
	private logger: Logger;
	/**
	 * Constructs an ErrorHandler with an error logger.
	 * @param logger The logger used by this
	 * error handler for logging handled errors.  
	 */
	constructor(logger: Logger) {
		this.logger = logger;
	}

	/**
	 * Handles a produce error and logs information about 
	 * the error.
	 * @param error The error that was produced.
	 * @param type The type of error to handle.
	 */
	public onError(error: any): void {
		if (error instanceof Error) {
			this.logger.logError(error.message);
		} else {
			this.logger.logError(error);
		}
	}
}