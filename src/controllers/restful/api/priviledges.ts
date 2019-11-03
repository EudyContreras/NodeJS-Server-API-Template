
import { Router, NextFunction, Request, Response } from 'express';
import Controller from '../../controller';
import express from 'express';

class Priviledges implements Controller {
   
   private routing: string = '/rest/api/priviledges';
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
      router.get('/', this.getOne);
   }

   private getOne = async (request: Request, response: Response) => {
      const apiResponse = {
         message: 'priviledge'
      };
      return response.json(apiResponse);
   }

   private getAll = async (request: Request, response: Response) => {

   }

   private create = async (request: Request, response: Response) => {

   }

   private delete = async (request: Request, response: Response, next: NextFunction) => {

   }
}

export default Priviledges;