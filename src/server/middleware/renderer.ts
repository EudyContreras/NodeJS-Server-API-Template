
import { Router } from 'express'

abstract class ViewRenderer {
   abstract getRoute(): string
   abstract getRouter(): Router;
}

export default ViewRenderer;