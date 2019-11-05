
import authenticate from '../../../middleware/authenticators/token.validator'
import allowed from '../../../middleware/authenticators/access.validator'
import validate from '../../../middleware/validators/body.validator'
import RoleService from '../../../services/role.service';
import Controller from '../../controller';
import express from 'express';

import { Router, Request, Response } from 'express';

class Roles extends Controller {
   
   private roleService = new RoleService();
   private routing: string = '/rest/api/roles';
   private router: Router;
   private roles: string[];

   constructor(...allowedRoles: string[]) {
      super('role')
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
      router.get('/', authenticate, allowed(...this.roles), this.get);
      router.put('/', authenticate, allowed(...this.roles), this.create);
      router.patch('/', authenticate, allowed(...this.roles), this.update);
      router.delete('/', authenticate, allowed(...this.roles), this.delete);
   }

   private get = async (request: Request, response: Response) => {
      const roleId = request.query.roleId;
      
      if (roleId) {
         return this.getOne(roleId, request, response)
      } else {
         return this.getAll(request, response)
      }
   }

   private getOne = async (id: string, request: Request, response: Response) => {
      const roles = await this.roleService.getRole(id);

      return response.json(roles);
   }

   private getAll = async (request: Request, response: Response) => {
      const roles = await this.roleService.getAllRoles();

      return response.json(roles);
   }

   private create = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'roles create one'
      };
      return response.json(apiResponse);
   }

   private update = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'roles update one'
      };
      return response.json(apiResponse);
   }

   private delete = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'roles delete one'
      };
      return response.json(apiResponse);
   }
}

export default Roles;