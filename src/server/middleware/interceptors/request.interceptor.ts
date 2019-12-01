
import { NextFunction, Response, Request } from 'express';

function intercept(request: Request, response: Response, next: NextFunction): void {
	console.log(`Method: ${request.method} | Path: ${request.path}`);
	next();
}

export default intercept;