/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs';
import cors from 'cors';
import http from 'http';
import http2 from 'spdy';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import Interceptor from './middleware/interceptor';
import Controller from './controllers/controller';
import ErrorHandler from './handlers/error.handler';
import LoggingHandler from './handlers/logging.handler';
import ViewRenderer from './middleware/renderer';
import shrinkRay from 'shrink-ray-current';
import expressStaticGzip from 'express-static-gzip';
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
		const secure = config.ssl.ACTIVE;

		if (secure) {
			const port1 = config.host.PORT_HTTPS;
			const port2 = config.host.PORT_HTTP;

			const options = {
				key: fs.readFileSync('./ssl/localhost.key'),
				cert: fs.readFileSync('./ssl/localhost.crt')
			};
			http2.createServer(options, this.app).listen(port1, () => {
				console.log(`Server listening on the port ${port1}`);
			});
			http.createServer(this.app).listen(port2, () => {
				console.log(`Server listening on the port ${port2}`);
			});
		
		} else {
			const port = config.host.PORT_HTTP;
			http.createServer(this.app).listen(port, () => {
				console.log(`Server listening on the port ${port}`);
			});
		}
	}

	private setupExpress(): void {
		const render = config.presentation;
		const clientRender = render.viewEngine.client;

		if (process.env.NODE_ENV === 'development') {

			const webpack = require('webpack');
			const webpackHotMiddleware = require('webpack-hot-middleware');
			const webpackDevMiddleware = require('webpack-dev-middleware');
			const serverConfig = require('../../webpack/configs/webpack.server.config');

			const serverCompiler = webpack(serverConfig);
		
			this.app.use(webpackHotMiddleware(serverCompiler));
			this.app.use(webpackDevMiddleware(serverCompiler,{
				serverSideRender: true,
				publicPath: serverConfig.output.publicPath,
				writeToDisk(filePath: string): boolean {
					return /loadable-stats/.test(filePath);
				}
			}));
		}
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(shrinkRay());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use('/', expressStaticGzip(config.application.FILE_DIRECTORY, {
			index: false,
			enableBrotli: true,
			customCompressions: [{
				encodingName: 'deflate',
				fileExtension: 'zz'
			}],
			orderPreference: ['br']
		}));
		this.app.use(clientRender.alias, express.static(clientRender.path));
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