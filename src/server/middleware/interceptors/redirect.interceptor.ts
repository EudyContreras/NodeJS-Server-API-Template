
import { NextFunction, Response, Request } from 'express';

function intercept(request: Request, response: Response, next: NextFunction): void {
	// if (!request.secure) {
	// 	console.log('Unsecure!');
	// }
	next();
}

export default intercept;