import { NextFunction, Request, Response } from 'express';

import HttpCodes from '../definitions/httpCode';
import HttpException from '../exceptions/httpException';

function errorInterceptor(error: HttpException, request: Request, response: Response, next: NextFunction) {
   const status = error.status || HttpCodes.ERROR;
   const message = error.message || 'Something went wrong';

   const apiResponse = {
      status,
      message,
   };

   response
      .status(status)
      .send(apiResponse);
}

export default errorInterceptor;