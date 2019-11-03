import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exceptions';

import errorInterceptor from './interceptors/error.interceptor';
import notFoundInterceptor from './interceptors/notfound.interceptor';
import requestInterceptor from './interceptors/request.interceptor';

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