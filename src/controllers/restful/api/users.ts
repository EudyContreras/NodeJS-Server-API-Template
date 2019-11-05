
import { Router, NextFunction, Request, Response } from 'express';
import Controller from '../../controller';
import express from 'express';

class Users extends Controller {
   
   private routing: string = '/rest/api/users';
   private router: Router;
   private roles: string[];

   constructor(...allowedRoles: string[]) {
      super('user')
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
      router.get('/', this.get);
      router.put('/', this.create);
      router.patch('/', this.update);
      router.delete('/', this.delete);
   }

   private get = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'ursers'
      };
      return response.json(apiResponse);
   }

   private getOne = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'users fetch one'
      };
      return response.json(apiResponse);
   }

   private getAll = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'users fetch all'
      };
      return response.json(apiResponse);
   }

   private create = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'users create one'
      };
      return response.json(apiResponse);
   }

   private update = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'users update one'
      };
      return response.json(apiResponse);
   }

   private delete = async (request: Request, response: Response, next: NextFunction) => {
      const apiResponse = {
         message: 'users delete one'
      };
      return response.json(apiResponse);
   }
}

export default Users;