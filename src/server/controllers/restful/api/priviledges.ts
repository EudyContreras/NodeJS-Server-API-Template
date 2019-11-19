
import express from 'express';
import Controller from '../../controller';
import RequestAction from '../../../definitions/requestAction';
import PriviledgeService from '../../../services/priviledge.service';
import authenticate from '../../../middleware/authenticators/token.validator';
import allowed from '../../../middleware/authenticators/access.validator';
import validate from '../../../middleware/validators/body.validator';
import schemaType from '../../../validation/schemas/priviledge/blueprint';

import { Router, Response } from 'express';

class Priviledges extends Controller {

   private priviledgeService: PriviledgeService = new PriviledgeService();
   private routing: string = '/rest/api/priviledges';
   private router: Router;
   private roles: string[];

   constructor(...allowedRoles: string[]) {
      super('priviledge');
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

   private setupRoutes(router: Router) {
      router.get('/', authenticate, allowed(...this.roles), validate(schemaType.PRIVILEDGE_QUERY), this.getAll);
      router.put('/', authenticate, allowed(...this.roles), validate(schemaType.PRIVILEDGE_CREATE), this.create);
      router.patch('/', authenticate, allowed(...this.roles), validate(schemaType.PRIVILEDGE_UPDATE), this.update);
      router.delete('/', authenticate, allowed(...this.roles), validate(schemaType.PRIVILEDGE_QUERY), this.delete);
   }

   private getAll = async (request: any, response: Response) => {
      const { result, error } = await this.priviledgeService.getPriviledges(request.data);

      return this.buildResult(result, error, response, RequestAction.GET_ALL);
   }

   private create = async (request: any, response: Response) => {
      const { result, error } = await this.priviledgeService.createPriviledge(request.data);

      return this.buildResult(result, error, response, RequestAction.CREATE);
   }

   private update = async (request: any, response: Response) => {
      const { result, error } = await this.priviledgeService.updatePriviledge(request.data);

      return this.buildResult(result, error, response, RequestAction.UPDATE);
   }

   private delete = async (request: any, response: Response) => {
      const { result, error } = await this.priviledgeService.revokePriviledge(request.data);

      return this.buildResult(result, error, response, RequestAction.DELETE);
   }
}

export default Priviledges;