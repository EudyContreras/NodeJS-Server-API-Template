
import { NextFunction, Request } from 'express';

import LoggingHandler from '../handlers/loggingHandler';

function requestInterceptor(request: Request, response: Response, next: NextFunction) {
  console.log(`${request.method} ${request.path}`);
  next();
}

export default requestInterceptor;