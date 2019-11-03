
import HttpCodes from '../../definitions/httpCode'

import { HttpException } from '../../exceptions/http.exceptions';
import { NextFunction, Response, Request } from 'express';

function intercept(error: HttpException, request: Request, response: Response, next: NextFunction) {
   const status = error.status || HttpCodes.ERROR;
   const message = error.message || 'Something went wrong';

   const apiResponse = {
      error: {
         status: status,
         message: message,
      }
   };

   response
      .status(status)
      .json(apiResponse);
}


export default intercept;

