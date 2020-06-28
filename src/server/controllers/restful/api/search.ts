
import express from 'express';
import Controller from '../../controller';
import RequestAction from '../../../definitions/requestAction';

import { Router, Response, Request } from 'express';

export default class Search extends Controller {

	private routing = '/rest/api/search';
	private router: Router;
	private roles: string[];

	constructor(...allowedRoles: string[]) {
		super('search');
		this.roles = allowedRoles;
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
		router.get('/', this.getAll);
	}

	private getAll = async (request: Request, response: Response): Promise<Response> => {
		const result = {
			query: request.query
		};

		console.log(result);
		return this.buildResult(result, undefined, response, RequestAction.GET_ALL);
	};
}
