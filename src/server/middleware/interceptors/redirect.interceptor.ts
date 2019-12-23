import config from '../../config';
import { NextFunction, Response, Request } from 'express';

const intercept = (request: Request, response: Response, next: NextFunction): void => {
	if(!request.secure && config.host.REDIRECT_TO_HTTPS) {
		console.log('insecure');
		return response.redirect(['https://', request.get('Host'), request.url].join(''));
	}
	next();
};

export default intercept;