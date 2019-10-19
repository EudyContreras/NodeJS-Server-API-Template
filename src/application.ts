import express from 'express';
import mongoose from 'mongoose';
import Controller from '../src/controllers/controller';
import { Request, Response } from 'express';

class Application {

   private dbOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
   }
   
   public app: express.Application;

   constructor(controllers: Controller[]) {
      this.app = express();

      this.connectToTheDatabase();
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
      this.initializeErrorHandling();
      this.initializeWebjobs();
   }

   public startlistening() {
      const port = process.env.PORT;

      this.app.listen(port, () => {
         console.log(`Server listening on the port ${port}`);
      });
   }

   private initializeMiddlewares() {
      this.app.use();
   }

   private initializeErrorHandling() {
      this.app.use();
   }

   private initializeWebjobs() {
      /*const dataCollector = new DataCollectionJob();

      dataCollector.scheduleA(scheduler);
      dataCollector.scheduleB(scheduler);
      dataCollector.scheduleC(scheduler);*/
   }

   private initializeControllers(controllers: Controller[]) {
      this.app.get('/', (request: Request, response: Response) => {
         return response.json({
            message: 'Hello there'
         });
      })
      
      controllers.forEach((controller) => {
         this.app.use('/', controller.getRouter());
      });
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