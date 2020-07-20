
import express, { Router, Request, Response } from 'express';
import Controller from '../../controller';
import validate from '../../../middleware/validators/body.validator';
import authenticate from '../../../middleware/authenticators/token.validator';
import schemaType from '../../../validation/schemas/authentication/blueprint';
import AuthenticationService from '../../../services/authentication.service';
import RequestAction from '../../../definitions/requestAction';

import { AuthenticationResponse } from '../../../responses/request.response';
import { AuthenticationMessages } from '../../../messages/message.response';
import HttpCode from '../../../definitions/httpCode';

class Authentication extends Controller {

	private service: AuthenticationService = new AuthenticationService();
	private routing = '/rest/api/authentication';
	private router: Router;

	constructor(...allowedRoles: string[]) {
		super('authentication');
		this.router = express.Router();
		this.setupRoutes(this.router);
	}

	public getRoute(): string {
		return this.routing;
	}

	public getRouter(): Router {
		return this.router;
	}

	private setupRoutes(router: Router): void {
		router.get('/', authenticate, this.getCredentials);
		router.put('/recover', this.recoverPassword);
		router.post('/', validate(schemaType.CREDENTIALS), this.performAuthentication);
	}

	private getCredentials = async (request: any, response: Response): Promise<Response> => {
		const userId = request.user.userId;

		const { result, error } = await this.service.getUser(userId);

		return this.buildResult(result, error, response, RequestAction.GET);
	};

	private performAuthentication = async (request: any, response: Response): Promise<Response> => {

		const { result, error } = await this.service.authenticate(request.data);

		return this.buildResult(result, error, response, RequestAction.AUTHENTICATE);
	};

	private recoverPassword = async (request: Request, response: Response): Promise<Response> => {
		const email = request.query.email;

		const { result, error } = await this.service.recoverPassword(email);

		return this.buildResult(result, error, response, RequestAction.RECOVER);
	};

	public buildResult(result: any, error: any, response: Response, requestAction: RequestAction): Response {
		const apiResponse = new AuthenticationResponse();

		if (error) {
			switch (requestAction) {
				case RequestAction.GET:
					apiResponse.message = AuthenticationMessages.NOT_FETCHED;
					break;
				case RequestAction.AUTHENTICATE:
					apiResponse.message = AuthenticationMessages.NOT_AUTHORIZED;
					break;
				case RequestAction.RECOVER:
					apiResponse.message = AuthenticationMessages.NOT_RECOVERED;
					break;
				default:
			}

			apiResponse.errors.push(error);
			return response.status(HttpCode.UNAUTHORIZED).json(apiResponse);
		}

		apiResponse.authorized = !error;
		apiResponse.content = result;

		return response.json(apiResponse);
	}
}

export default Authentication;
