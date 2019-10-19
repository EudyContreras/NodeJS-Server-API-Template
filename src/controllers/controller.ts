import { Router } from 'express'

interface Controller {
   getRouter(): Router;
   setupRoutes(router: Router): void;
}

export default Controller;