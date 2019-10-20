import Logger from './logging.handler';

class ErrorHandler {
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
    * @param {Error} error The error that was produced.
    * @param {string} type The type of error to handle.
    */
   onError(error: any) {
      if (error instanceof Error) {
         this.logger.logError(error);
      } else {
         this.logger.logError(Error(error));
      }
   }
}

export default ErrorHandler;