class LoggingHandler {
   /**
    * Loggs information using an injected dependency.
    * @param info The information to be logged
    */
   logInfo(info: any) {
      console.log(info);
   }

   /**
    * Loggs debug information using an injected dependency.
    * @param info The debug information to be logged
    */
   logDebug(text: any) {
      console.debug(text);
   }

   /**
    * Loggs error using an injected dependency.
    * @param info The error to be logged
    */
   logError(error: any) {
      console.error(error);
   }
}

export default LoggingHandler;