import { Router } from 'express'

interface Controller {
   getRoute(): string
   getRouter(): Router;
}

export default Controller;