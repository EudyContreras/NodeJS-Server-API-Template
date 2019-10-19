
import HttpCodes from '../../definitions/httpCode'
import HttpException from '../../exceptions/httpException';

import { NextFunction, Response, Request } from 'express';

function intercept(request: Request, response: Response, next: NextFunction) {
  const status = HttpCodes.NOT_FOUND;
  const message = 'Resource not found!';

  const error = new HttpException(status, message);

  next(error);
}

export default intercept;