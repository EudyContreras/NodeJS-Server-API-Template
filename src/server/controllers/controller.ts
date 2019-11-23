
import HttpCode from '../definitions/httpCode';
import RequestAction from '../definitions/requestAction';

import { Router, Response} from 'express';
import { ApiResponse } from '../responses/request.response';
import { ResponseMessages } from '../messages/message.response';

abstract class Controller {
	protected name: string;

	constructor(name: string) {
		this.name = name;
	}

	public abstract getRoute(): string;
	public abstract getRouter(): Router;

	/**
	 * Builds a response to send to the client
	 * @param result The result of the request
	 * @param error The possible generated error.
	 * @param response The request reponse object.
	 * @param requestAction A enum that represents
	 * the type of request that was made.
	 * @returns  The response produced based
	 * on the given arguements and the controller type.
	 */
	public buildResult(result: any, error: any, response: Response, requestAction: RequestAction): Response {
		const apiResponse = new ApiResponse();

		if (error) {
			switch (requestAction) {
				case RequestAction.GET:
					apiResponse.message = ResponseMessages.NOT_FETCHED(this.name);
					break;
				case RequestAction.GET_ALL:
					apiResponse.message = ResponseMessages.NOT_FETCHED_ALL(this.name);
					break;
				case RequestAction.CREATE:
					apiResponse.message = ResponseMessages.NOT_CREATED(this.name);
					break;
				case RequestAction.UPDATE:
					apiResponse.message = ResponseMessages.NOT_UPDATED(this.name);
					break;
				case RequestAction.DELETE:
					apiResponse.message = ResponseMessages.NOT_DELETED(this.name);
					break;
				default:
			}

			apiResponse.errors.push(error);
			return response.status(HttpCode.BAD_REQUEST).json(apiResponse);
		}

		apiResponse.content = result;
		return response.json(apiResponse);
	}
}

export default Controller;