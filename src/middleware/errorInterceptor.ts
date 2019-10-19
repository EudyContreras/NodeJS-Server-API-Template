import { NextFunction, Request, Response } from 'express';

import HttpCodes from '../definitions/httpCode';
import HttpException from '../exceptions/httpException';

function notFoundInterceptor(request: Request, response: Response, next: NextFunction) {
   const status = HttpCodes.NOT_FOUND;
   const message = 'Resource not found!';

   const error = new HttpException(status, message);

   response
      .status(status)
      .send(error);
}

export default notFoundInterceptor;