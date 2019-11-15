import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';

import compression from 'compression';
import Interceptor from './middleware/interceptor';
import Controller from './controllers/controller';
import ErrorHandler from './handlers/error.handler';
import LoggingHandler from './handlers/logging.handler';
import ViewRenderer from './middleware/renderer';
import DataInitializer from './initializers/database.initializer';

const reactRender = require('express-react-views');

export default class Application {

   public app: express.Application;

   private loggHandler: LoggingHandler;
   private errorHandler: ErrorHandler;

   private dbOptions: any = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
   }

   constructor(args: { controllers: Controller[], viewRenderer?: ViewRenderer[], interceptor: Interceptor }) {
      this.app = express();
      this.loggHandler = new LoggingHandler();
      this.errorHandler = new ErrorHandler(this.loggHandler)

      this.setupExpress();
      this.initializeMiddleware(args.interceptor);
      this.initializeControllers(args.controllers);
      this.initializeViewRenderers(args.viewRenderer);
      this.initializeErrorHandling(args.interceptor);
      this.connectToTheDatabase(true);
      this.initializeWebjobs();
   }

   public startlistening() {
      const port = config.host.PORT;

      this.app.listen(port, () => {
         console.log(`Server listening on the port ${port}`);
      });
   }

   private setupExpress() {
      const render = config.presentation;
      const clientRender = render.viewEngine.client;
      const stylesRender = render.viewEngine.styles;
      const scriptRender = render.viewEngine.scripts;

      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(morgan('combined'));
      this.app.use(compression());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }))
      this.app.use(express.static(config.application.FILE_DIRECTORY));
      this.app.use(express.static(render.path));
      this.app.use(clientRender.alias, express.static(clientRender.path));
      this.app.use(stylesRender.alias, express.static(stylesRender.path));
      this.app.use(scriptRender.alias, express.static(scriptRender.path));
      this.app.set(render.viewEngine.alias, render.viewEngine.path);
      this.app.set(render.viewEngine.label, render.viewEngine.type);
      this.app.engine(render.viewEngine.type, reactRender.createEngine());
   }

   private initializeMiddleware(middleware: Interceptor) {
      middleware.getInterceptors().forEach((middleware) => {
         this.app.use(middleware);
      });
   }

   private initializeControllers(controllers: Controller[]) {
      controllers.forEach((controller) => {
         this.app.use(controller.getRoute(), controller.getRouter());
      });
   }

   private initializeViewRenderers(viewRenderers?: ViewRenderer[]) {
      if (viewRenderers != undefined) {
         viewRenderers.forEach((renderer) => {
            this.app.use(renderer.getRoute(), renderer.getRouter());
         });
      }
   }

   private initializeErrorHandling(middleware: Interceptor) {
      this.app.use(middleware.getNotFoundHandler());
      this.app.use(middleware.getErrorHandler());
   }

   private initializeWebjobs() {
      /*const dataCollector = new DataCollectionJob();

      dataCollector.scheduleA(scheduler);
      dataCollector.scheduleB(scheduler);
      dataCollector.scheduleC(scheduler);*/
   }

   private connectToTheDatabase(createInitialData: boolean = false) {
      const dataInitializer = new DataInitializer(this.errorHandler, this.loggHandler);

      const prepend = config.database.DB_PREPEND;
      const userName = config.database.DB_USERNAME;
      const password = config.database.DB_PASSWORD;
      const dbURIPath = config.database.DB_URI_PATH;

      const connectionString = `${prepend}${userName}:${password}${dbURIPath}`; 

      mongoose.connect(connectionString, this.dbOptions);

      mongoose.connection.once('open', async () => {
         console.log('MongoDB connected successfully');
         if (createInitialData) {
            await dataInitializer.createInitialRoles();
            await dataInitializer.createInitialAdministrators();
         }     
      });
   }
}