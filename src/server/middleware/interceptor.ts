import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exceptions';

import errorInterceptor from './interceptors/error.interceptor';
import notFoundInterceptor from './interceptors/notfound.interceptor';
import redirectInterceptor from './interceptors/redirect.interceptor';

class Interceptor {
	public getInterceptors(): Array<(request: Request, response: Response, next: NextFunction) => void> {
		return [redirectInterceptor];
	}

	public getErrorHandler(): (error: HttpException, request: Request, response: Response, next: NextFunction) => void {
		return errorInterceptor;
	}

	public getNotFoundHandler(): (request: Request, response: Response, next: NextFunction) => void {
		return notFoundInterceptor;
	}
}

export default Interceptor;