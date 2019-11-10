import express from 'express';
import ViewController from '../controller.view';

import { Router, Response } from 'express';

class IndexController extends ViewController {

   private routing: string = '/';
   private router: Router;

   constructor() {
      super('index')
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
      router.get('/', this.render);
      router.post('/', this.handlePost);
   }

   private render = (request: any, response: Response) => {
      response.render('index', { title: 'Template API', name: 'Eudy Contreras' });
   }

   private handlePost = (request: any, response: Response) => {
      response.send('What');
   }
}

export default IndexController;