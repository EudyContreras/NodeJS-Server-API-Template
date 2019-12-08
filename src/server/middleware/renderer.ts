
import { Router } from 'express';

abstract class ViewRenderer {
   public abstract getRoute(): string;
   public abstract getRouter(): Router;
}

export default ViewRenderer;