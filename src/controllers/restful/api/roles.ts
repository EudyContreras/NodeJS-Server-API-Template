
import { Router, NextFunction, Request, Response } from 'express';
import RoleService from '../../../services/role.service';
import Controller from '../../controller';
import express from 'express';

class Roles implements Controller {
   
   private roleService = new RoleService();
   private routing: string = '/rest/api/roles';
   private router: Router;

   constructor() {
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
      router.get('/', this.get);
      router.put('/', this.create);
      router.patch('/', this.update);
      router.delete('/', this.delete);
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

   private delete = async (request: Request, response: Response, next: NextFunction) => {
      const apiResponse = {
         message: 'roles delete one'
      };
      return response.json(apiResponse);
   }
}

export default Roles;