
import express from 'express';
import Controller from '../../controller';
import RequestAction from '../../../definitions/requestAction';
import InvitationService from '../../../services/invitation.service';
import authenticate from '../../../middleware/authenticators/token.validator'
import allowed from '../../../middleware/authenticators/access.validator'
import validate from '../../../middleware/validators/body.validator'
import schemaType from '../../../validation/schemas/invitation/blueprint'

import { Router, Request, Response } from 'express';

class Invitations extends Controller {

   private invitationService = new InvitationService();
   private routing: string = '/rest/api/invitations';
   private router: Router;
   private roles: string[];

   constructor(...allowedRoles: string[]) {
      super('invitation')
      this.roles = allowedRoles;
      this.router = express.Router();
      this.setupRoutes(this.router);
   }

   getRoute(): string {
      return this.routing;
   }

   getRouter(): Router {
      return this.router;
   }

   private setupRoutes(router: Router) {
      router.get('/', validate(schemaType.INVITATION_QUERY), this.get);
      router.put('/', validate(schemaType.INVITATION_CREATE), this.create);
      router.patch('/', validate(schemaType.INVITATION_UPDATE), this.update);
      router.delete('/', this.delete);
   }

   private get = async (request: any, response: Response) => {
      const hasProps = Object.keys(request.data).length > 0;

      if (hasProps) {
         return this.getOne(request.data, response)
      } else {
         return this.getAll(response)
      }
   }

   private getOne = async (query: any, response: Response) => {
      const { result, error } = await this.invitationService.getInvitationWhere(query);

      return this.buildResult(result, error, response, RequestAction.GET)
   }

   private getAll = async (response: Response) => {
      const { result, error } = await this.invitationService.getAllInvitations();

      return this.buildResult(result, error, response, RequestAction.GET_ALL)
   }

   private create = async (request: any, response: Response) => {
      const data = request.data;

      const { result, error } = await this.invitationService.createInvitation(null, data);

      return this.buildResult(result, error, response, RequestAction.CREATE)
   }

   private update = async (request: any, response: Response) => {
      const data = request.data;
      const inviteId = request.query.inviteId

      const { result, error } = await this.invitationService.updateInvitation(inviteId, data);

      return this.buildResult(result, error, response, RequestAction.UPDATE)
   }

   private delete = async (request: Request, response: Response) => {
      const inviteId = request.query.inviteId;

      const { result, error } = await this.invitationService.deleteInvitation(inviteId);

      return this.buildResult(result, error, response, RequestAction.DELETE)
   }
}

export default Invitations;