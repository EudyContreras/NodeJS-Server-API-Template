export default class LoggingHandler {
	/**
	 * Loggs information using an injected dependency.
	 * @param info The information to be logged
	 */
	public logInfo(info: any): any {
		console.log(info);
	}

	/**
	 * Loggs debug information using an injected dependency.
	 * @param info The debug information to be logged
	 */
	public logDebug(text: any): any {
		console.debug(text);
	}

	/**
	 * Loggs error using an injected dependency.
	 * @param info The error to be logged
	 */
	public logError(error: any): any {
		console.error(error);
	}
}
