import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import vault from './config/vault';
import compression from 'compression';
import Interceptor from './middleware/interceptor';
import Controller from '../src/controllers/controller';
import ErrorHandler from './handlers/error.handler';
import LoggingHandler from './handlers/logging.handler';
import ViewController from './controllers/controller.view';
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

   constructor(args: { controllers: Controller[], viewControllers: ViewController[], interceptor: Interceptor }) {
      this.app = express();
      this.loggHandler = new LoggingHandler();
      this.errorHandler = new ErrorHandler(this.loggHandler)

      this.setupExpress();
      this.initializeMiddleware(args.interceptor);
      this.initializeViewControllers(args.viewControllers);
      this.initializeControllers(args.controllers);
      this.initializeErrorHandling(args.interceptor);
      this.connectToTheDatabase(true);
      this.initializeWebjobs();
   }

   public startlistening() {
      const port = vault.host.PORT;

      this.app.listen(port, () => {
         console.log(`Server listening on the port ${port}`);
      });
   }

   private setupExpress() {
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }))
      this.app.use(express.static(vault.application.FILE_DIRECTORY));
      this.app.use(express.static('presentation'));
      this.app.use('/static', express.static('public'));
      this.app.set('views', 'src/presentation/views');
      this.app.set('view engine', vault.presentation.vieEngine.type);
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

   private initializeViewControllers(controllers: ViewController[]) {
      controllers.forEach((controller) => {
         this.app.use(controller.getRoute(), controller.getRouter());
      });
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

      const prepend = vault.databse.DB_PREPEND;
      const userName = vault.databse.DB_USERNAME;
      const password = vault.databse.DB_PASSWORD;
      const dbURIPath = vault.databse.DB_URI_PATH;

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