import { NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/httpException';
import errorInterceptor from './interceptors/errorInterceptor';
import notFoundInterceptor from './interceptors/notfoundInterceptor';
import requestInterceptor from './interceptors/requestInterceptor';

class Interceptor {
   getInterceptors(): Array<(request: Request, response: Response, next: NextFunction) => void> {
      return [
         requestInterceptor
      ];
   }

   getErrorHandler(): (error: HttpException, request: Request, response: Response, next: NextFunction) => void {
      return errorInterceptor;
   }

   getNotFoundHandler(): (request: Request, response: Response, next: NextFunction) => void {
      return notFoundInterceptor;
   }
}

export default Interceptor