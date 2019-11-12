
import { Router } from 'express'

abstract class ViewController {
   protected name: string;

   constructor(name: string) {
      this.name = name;
   }

   abstract getRoute(): string
   abstract getRouter(): Router;
}

export default ViewController;