
import express from 'express';
import Controller from '../../controller';
import RequestAction from '../../../definitions/requestAction';
import UserService from '../../../services/user.service';
import authenticate from '../../../middleware/authenticators/token.validator';
import allowed from '../../../middleware/authenticators/access.validator';
import validate from '../../../middleware/validators/body.validator';
import schemaType from '../../../validation/schemas/user/blueprint';

import { ROOT, ADMIN } from '../../../localstore/accessrole.store';
import { Router, Request, Response } from 'express';

class Users extends Controller {

	private userService = new UserService();
	private routing = '/rest/api/users';
	private router: Router;
	private roles: string[];

	constructor(...allowedRoles: string[]) {
		super('user');
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
		router.get('/',authenticate, allowed(...this.roles), validate(schemaType.USER_QUERY), this.get);
		router.put('/',authenticate, allowed(...this.roles), validate(schemaType.USER_CREATE), this.create);
		router.delete('/',authenticate, allowed(...this.roles), this.delete);

		router.patch('/',authenticate, allowed(ROOT, ADMIN), validate(schemaType.USER_UPDATE), this.update);
		router.put('/password',authenticate, allowed(ROOT, ADMIN), validate(schemaType.USER_PASSORD), this.updatePassword);
	}

	private get = async (request: any, response: Response): Promise<Response> => {
		const hasProps = request.data ? Object.keys(request.data).length > 0 : null;

		if (hasProps) {
			return this.getOne(request.data, response);
		} else {
			return this.getAll(response);
		}
	};

	private getOne = async (query: any, response: Response): Promise<Response> => {
		const { result, error } = await this.userService.getUserWhere(query);

		return this.buildResult(result, error, response, RequestAction.GET);
	};

	private getAll = async (response: Response): Promise<Response> => {
		const { result, error } = await this.userService.getAllUsers();

		return this.buildResult(result, error, response, RequestAction.GET_ALL);
	};

	private create = async (request: any, response: Response): Promise<Response> => {
		const data = request.data;

		const { result, error } = await this.userService.registerUser(data);

		return this.buildResult(result, error, response, RequestAction.CREATE);
	};

	private update = async (request: any, response: Response): Promise<Response> => {
		const userId = request.query.userId || request.user.userId;

		const { result, error } = await this.userService.updateUser(userId, request.data);

		return this.buildResult(result, error, response, RequestAction.UPDATE);
	};

	private delete = async (request: Request, response: Response): Promise<Response> => {
		const userId = request.query.userId;

		const { result, error } = await this.userService.deleteUser(userId);

		return this.buildResult(result, error, response, RequestAction.DELETE);
	};

	private updatePassword = async (request: any, response: Response): Promise<Response> => {
		const userId = request.query.userId || request.user.userId;

		const { result, error } = await this.userService.updateUserPassword(userId, request.data);

		return this.buildResult(result, error, response, RequestAction.UPDATE);
	};

}

export default Users;