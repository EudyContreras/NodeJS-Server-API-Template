/* eslint-disable @typescript-eslint/no-var-requires */

import fs from 'fs';
import cors from 'cors';
import http from 'http';
import http2 from 'spdy';
import hsts from 'hsts';
import helmet from 'helmet';
import logger from 'morgan';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from '../configs/config.server';
import Interceptor from './middleware/interceptor';
import Controller from './controllers/controller';
import ErrorHandler from './handlers/error.handler';
import LoggingHandler from './handlers/logging.handler';
import ViewRenderer from './middleware/renderer';
import shrinkRay from 'shrink-ray-current';
import expressStatic from 'express-static-gzip';
import expressEnforceSSL from 'express-enforces-ssl';
import DataInitializer from './initializers/database.initializer';
import reactRender from 'express-react-views';

const cachePolicy = (): ((Response, Request, NextFunction) => void) => {
	const policy = config.resources.cachePolicy;
	return (request: Request, response: Response, next: NextFunction): void => {
		response.set(policy.LABEL, policy.VALUE);
		next();
	};
};

const ignoreFavicon = (): ((Response, Request, NextFunction) => void) => (request: Request, response: Response, next: NextFunction): void => {
	if (config.resources.ignored.indexOf(request.originalUrl) !== -1) {
		response.status(204).json({});
	} else {
		next();
	}
};

const serveCompressed = (app: express.Application): ((Response, Request, NextFunction) => void) => (
	request: Request,
	response: Response,
	next: NextFunction
): void => {
	app.get('*.js', (req, res, next) => {
		req.url = req.url + '.br';
		res.set('Content-Encoding', 'br');
		next();
	});
};

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
	}

	public startlistening(): void {
		const secure = config.ssl.ACTIVE;

		const port = config.host.PORT;

		if (secure) {
			const port = config.host.PORT_HTTPS;
			const options = {
				key: fs.readFileSync(config.ssl.key),
				cert: fs.readFileSync(config.ssl.cert)
			};
			http2.createServer(options, this.app).listen(port, () => {
				console.log(`HTTPS Server listening on the port ${port}`);
			});
		}

		const server = http.createServer(this.app);

		server.listen(port, () => {
			console.log(`Web Server listening on the port ${port}`);
		});
	}

	private setupExpress(): void {
		const render = config.presentation;
		const clientRender = render.viewEngine.client;

		if (!config.presentation.IS_SSR) {
			this.app.use(ignoreFavicon());
		}
		if (!config.enviroment.PRODUCTION) {
			this.app.use(logger('dev'));
		}
		if (config.ssl.ACTIVE) {
			this.app.enable('trust proxy');
			this.app.use(expressEnforceSSL());
		}

		this.app.use(cors());
		this.app.use(helmet());
		// this.app.use(cachePolicy());
		this.app.use(cookieParser());
		this.app.use(shrinkRay());
		this.app.use(hsts(config.host.secureTransport));
		this.app.use(expressStatic(config.application.FILE_DIRECTORY, config.compression));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
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
		if (viewRenderers !== undefined) {
			viewRenderers.forEach((renderer) => {
				this.app.use(renderer.getRoute(), renderer.getRouter());
			});
		}
	}

	private initializeErrorHandling(middleware: Interceptor): void {
		this.app.use(middleware.getNotFoundHandler());
		this.app.use(middleware.getErrorHandler());
	}

	private initializeWebjobs(): void {}

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
