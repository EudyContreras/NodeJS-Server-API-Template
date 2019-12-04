
import express from 'express';
import Controller from '../../controller';
import RequestAction from '../../../definitions/requestAction';
import InvitationService from '../../../services/invitation.service';
import authenticate from '../../../middleware/authenticators/token.validator';
import allowed from '../../../middleware/authenticators/access.validator';
import validate from '../../../middleware/validators/body.validator';
import schemaType from '../../../validation/schemas/invitation/blueprint';

import { Router, Request, Response } from 'express';

class Invitations extends Controller {

	private invitationService: InvitationService = new InvitationService();
	private routing = '/rest/api/invitations';
	private router: Router;
	private roles: string[];

	constructor(...allowedRoles: string[]) {
		super('invitation');
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
		router.get('/', authenticate, allowed(...this.roles), validate(schemaType.INVITATION_QUERY), this.get);
		router.put('/', authenticate, allowed(...this.roles), validate(schemaType.INVITATION_CREATE), this.create);
		router.patch('/', authenticate, allowed(...this.roles), validate(schemaType.INVITATION_UPDATE), this.update);
		router.delete('/', authenticate, allowed(...this.roles), this.delete);
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
		const { result, error } = await this.invitationService.getInvitationWhere(query);

		return this.buildResult(result, error, response, RequestAction.GET);
	};

	private getAll = async (response: Response): Promise<Response> => {
		const { result, error } = await this.invitationService.getAllInvitations();

		return this.buildResult(result, error, response, RequestAction.GET_ALL);
	};

	private create = async (request: any, response: Response): Promise<Response> => {
		const { result, error } = await this.invitationService.createInvitation(null, request.data);

		return this.buildResult(result, error, response, RequestAction.CREATE);
	};

	private update = async (request: any, response: Response): Promise<Response> => {
		const inviteId = request.query.inviteId;

		const { result, error } = await this.invitationService.updateInvitation(inviteId, request.data);

		return this.buildResult(result, error, response, RequestAction.UPDATE);
	};

	private delete = async (request: Request, response: Response): Promise<Response> => {
		const inviteId = request.query.inviteId;

		const { result, error } = await this.invitationService.deleteInvitation(inviteId);

		return this.buildResult(result, error, response, RequestAction.DELETE);
	};
}

export default Invitations;