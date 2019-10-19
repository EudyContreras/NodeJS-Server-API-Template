import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Middleware from '../src/middleware/middleware';
import Controller from '../src/controllers/controller';

import errorInterceptor from '../src/middleware/interceptors/errorInterceptor';
import notFoundInterceptor from '../src/middleware/interceptors/notfoundInterceptor';
import requestInterceptor from '../src/middleware/interceptors/requestInterceptor';

import { Request, Response } from 'express';

class Application {

   private dbOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
   }

   public app: express.Application;

   constructor(controllers: Controller[], middleware: Middleware) {
      this.app = express();

      this.setupExpress();
      this.initializeMiddleware(middleware);
      this.initializeControllers(controllers);
      this.initializeErrorHandling(middleware);
      this.initializeWebjobs();

   }

   public startlistening() {
      const port = process.env.PORT;

      this.app.listen(5000, () => {
         console.log(`Server listening on the port ${port}`);
      });
   }

   private setupExpress() {
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }))
   }

   private initializeMiddleware(middleware: Middleware) {
      middleware.getInterceptors().forEach((middleware) => {
         this.app.use(middleware);
      });
   }

   private initializeControllers(controllers: Controller[]) {
      controllers.forEach((controller) => {
         this.app.use(controller.getRoute(), controller.getRouter());
      });
   }

   private initializeErrorHandling(middleware: Middleware) {
      this.app.use(middleware.getNotFoundHandler());
      this.app.use(middleware.getErrorHandler());
   }

   private initializeWebjobs() {
      /*const dataCollector = new DataCollectionJob();

      dataCollector.scheduleA(scheduler);
      dataCollector.scheduleB(scheduler);
      dataCollector.scheduleC(scheduler);*/
   }

   private async connectToTheDatabase() {
      const {
         DB_USERNAME,
         DB_PASSWORD,
         DB_URI_PATH,
      } = process.env;

      const connectionString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}${DB_URI_PATH}`;

      await mongoose.connect(connectionString, this.dbOptions);

      mongoose.connection.once('open', () => {
         console.log('MongoDB connected successfully');
      });
   }
}

export default Application;