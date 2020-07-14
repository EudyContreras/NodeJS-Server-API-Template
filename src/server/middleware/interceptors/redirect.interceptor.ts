import config from '../../../configs/config.server';
import httpMethod from '../../definitions/httpMethod';
import httpCodes from '../../definitions/httpCode';
import { MiddlewareMessages } from '../../messages/message.response';
import { NextFunction, Response, Request } from 'express';

const intercept = (request: Request, response: Response, next: NextFunction): void => {
	if(!request.secure && config.host.REDIRECT_TO_HTTPS) {

		if (request.method === httpMethod.GET) {
			response.redirect(httpCodes.REDIRECT, `https://'${request.headers.host}${request.originalUrl}`);
		} else {
			response.status(httpCodes.FORBIDDEN_ACCESS).send(MiddlewareMessages.INVALID_PROTOCOL);
		}
	}
	next();
};

export default intercept;