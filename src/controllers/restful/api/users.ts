
import { Router } from 'express';
import Controller from '../../controller';

class Users implements Controller {
   private router: Router;

   constructor() {
      this.router = Router();
      this.setupRoutes(this.router);
   }

   getRouter(): Router {
      return this.router;
   }

   setupRoutes(router: Router): void {
      throw new Error("Method not implemented.");
   }
}

export default Users;