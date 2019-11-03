import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import vault from './config/vault';
import Interceptor from './middleware/interceptor';
import Controller from '../src/controllers/controller';

class Application {

   private dbOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
   }

   public app: express.Application;

   constructor(controllers: Controller[], middleware: Interceptor) {
      this.app = express();

      this.setupExpress();
      this.initializeMiddleware(middleware);
      this.initializeControllers(controllers);
      this.initializeErrorHandling(middleware);
      this.connectToTheDatabase();
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

   private connectToTheDatabase() {
      const userName = vault.databse.DB_USERNAME;
      const password = vault.databse.DB_PASSWORD;
      const dbURIPath = vault.databse.DB_URI_PATH;

      const connectionString = `mongodb+srv://${userName}:${password}${dbURIPath}`; 

      mongoose.connect(connectionString, this.dbOptions);

      mongoose.connection.once('open', () => {
         console.log('MongoDB connected successfully');
      });
   }
}

export default Application;