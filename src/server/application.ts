
import fs from 'fs';
import cors from 'cors';
import https from 'https';
import helmet from 'helmet';
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
import reactRender from 'express-react-views';

export default class Application {

	public app: express.Application;

	private loggHandler: LoggingHandler;
	private errorHandler: ErrorHandler;

	private dbOptions: any = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	};

	constructor(args: { controllers: Controller[]; viewRenderer?: ViewRenderer[]; interceptor: Interceptor }) {
		this.app = express();
		this.loggHandler = new LoggingHandler();
		this.errorHandler = new ErrorHandler(this.loggHandler);

		this.setupExpress();
		this.initializeMiddleware(args.interceptor);
		this.initializeControllers(args.controllers);
		this.initializeViewRenderers(args.viewRenderer);
		this.initializeErrorHandling(args.interceptor);
		this.connectToTheDatabase(true);
		this.initializeWebjobs();
	}

	public startlistening(): void {
		const port = config.host.PORT;
		const secure = config.ssl.ACTIVE;

		const listener = (): void => {
			console.log(`Server listening on the port ${port}`);
		};

		if (secure) {
			https.createServer({
				key: fs.readFileSync('./ssl/sslkey.pem'),
				cert: fs.readFileSync('./ssl/sslcert.pem'),
				passphrase: config.ssl.PASS_PHRASE,
			}, this.app).listen(port, listener);
		} else {
			this.app.listen(port, listener);
		}
	}

	private setupExpress(): void {
		const render = config.presentation;
		const clientRender = render.viewEngine.client;
		const stylesRender = render.viewEngine.styles;
		const scriptRender = render.viewEngine.scripts;
		const imageRender = render.viewEngine.images;

		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.static(config.application.FILE_DIRECTORY));
		this.app.use(express.static(render.path));
		this.app.use(clientRender.alias, express.static(clientRender.path));
		this.app.use(stylesRender.alias, express.static(stylesRender.path));
		this.app.use(scriptRender.alias, express.static(scriptRender.path));
		this.app.use(imageRender.alias, express.static(imageRender.path));
		this.app.set(render.viewEngine.alias, render.viewEngine.path);
		this.app.set(render.viewEngine.label, render.viewEngine.type);
		this.app.engine(render.viewEngine.type, reactRender.createEngine());
	}

	private initializeMiddleware(middleware: Interceptor): void {
		middleware.getInterceptors().forEach((middleware) => {
			this.app.use(middleware);
		});
	}

	private initializeControllers(controllers: Controller[]): void {
		controllers.forEach((controller) => {
			this.app.use(controller.getRoute(), controller.getRouter());
		});
	}

	private initializeViewRenderers(viewRenderers?: ViewRenderer[]): void {
		if (viewRenderers != undefined) {
			viewRenderers.forEach((renderer) => {
				this.app.use(renderer.getRoute(), renderer.getRouter());
			});
		}
	}

	private initializeErrorHandling(middleware: Interceptor): void {
		this.app.use(middleware.getNotFoundHandler());
		this.app.use(middleware.getErrorHandler());
	}

	private initializeWebjobs(): void {
		/*const dataCollector = new DataCollectionJob();

		dataCollector.scheduleA(scheduler);
		dataCollector.scheduleB(scheduler);
		dataCollector.scheduleC(scheduler);*/
	}

	private connectToTheDatabase(createInitialData = false): void {
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