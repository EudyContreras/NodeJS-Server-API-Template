
import Controller from '../../controller';
import RequestAction from '../../../definitions/requestAction';
import schema from '../../../resources/json/schema.json';
import express, { Router, Response } from 'express';

export default class Search extends Controller {

	private routing = '/rest/api/schema';
	private router: Router;
	private roles: string[];

	constructor(...allowedRoles: string[]) {
		super('schema');
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

	private getAll = async (request: any, response: Response): Promise<Response> => this.buildResult(schema, undefined, response, RequestAction.GET_ALL);
}
