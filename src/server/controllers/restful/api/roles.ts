
import authenticate from '../../../middleware/authenticators/token.validator';
import allowed from '../../../middleware/authenticators/access.validator';
import RoleService from '../../../services/role.service';
import Controller from '../../controller';
import express from 'express';

import { Router, Request, Response } from 'express';
import RequestAction from '../../../definitions/requestAction';

class Roles extends Controller {
	
	private service = new RoleService();
	private routing = '/rest/api/roles';
	private router: Router;
	private roles: string[];

	constructor(...allowedRoles: string[]) {
		super('role');
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
		router.get('/', authenticate, allowed(...this.roles), this.get);
	}

	private get = async (request: Request, response: Response): Promise<Response> => {
		const roleId = request.query.roleId;
		
		if (roleId) {
			return this.getOne(roleId, request, response);
		} else {
			return this.getAll(request, response);
		}
	}

	private getOne = async (id: string, request: Request, response: Response): Promise<Response> => {
		const { result, error } = await this.service.getRole(id);

		return this.buildResult(result, error, response, RequestAction.GET);
	}

	private getAll = async (request: Request, response: Response): Promise<Response> => {
		const { result, error } = await this.service.getAllRoles();

		return this.buildResult(result, error, response, RequestAction.GET_ALL);
	}
}

export default Roles;