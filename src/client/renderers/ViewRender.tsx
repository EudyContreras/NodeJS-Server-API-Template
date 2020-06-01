import config from '../config';
import path from 'path';
import configureStore from '../stores/store';
import ViewRenderer from '../../server/middleware/renderer';
import appStyle from './../styles/app.scss';
import { routes } from '../components/Routes';
import { ChunkExtractor } from '@loadable/server';
import { Store } from 'redux';
import { application } from '../views';
import { Router, Request, Response } from 'express';
import favicon from '../resources/images/favicon.ico';
import touchIcon from '../resources/images/icons/touch-icon.png';
import IAction from '../actions/action';

const statsFile = path.resolve('./build/public/loadable-stats.json');

class IndexViewRenderer extends ViewRenderer {

	private routing = '/';
	private router: Router;
	private context = {};
	private store: Store<any, IAction>;
	private state: any;
	private styling: Set<any>;
	private appStyle: any;

	constructor() {
		super();
		this.router = Router();
		this.store = configureStore({});
		this.state = this.store.getState();
		this.appStyle = appStyle._getCss();
		this.styling = new Set([this.appStyle]);
		this.setupRoutes(this.router);
	}

	public getRoute = (): string => {
		return this.routing;
	};

	public getRouter = (): Router => {
		return this.router;
	};

	public setupRoutes = (router: Router): void => {
		routes.map((x) => router.get(x.path, this.renderRoutes));
	};

	private renderRoutes = async (req: Request, res: Response): Promise<void> => {
		const shell = req.query.shell !== undefined;

		const extractor = new ChunkExtractor({ statsFile });

		const cssInjector = (...styles: any[]): void => styles.forEach(style => this.styling.add(style._getCss()));

		if (config.app.CSR) {
			res.status(200).send('');
		} else {
			if (shell) {
				return await this.renderShell(req, res, cssInjector);
			} else {
				return await this.renderApplication(req, res, cssInjector, extractor);
			}
		}
	};

	private renderApplication = async (req: Request, res: Response, cssInjector: Function, extractor: ChunkExtractor): Promise<void> => {
		const content = extractor.collectChunks(application(req.url, this.store, this.context, cssInjector));

		const props = {
			css: this.styling,
			state: this.state,
			title: config.app.TITLE,
			favicon: favicon,
			entryPoints: extractor.getMainAssets(),
			touchIcon: touchIcon,
			enableSW: config.app.USE_SW,
			content: content,
			cache: true
		};

		config.headers.forEach(header => {
			res.setHeader(header.LABEL, header.VALUE);
		});
		res.render(config.app.APP_LAYOUT, props);
	};

	private renderShell = async (req: Request, res: Response, cssInjector: Function): Promise<void> => {
	
		const content = application(req.url, this.store, this.context, cssInjector);

		const props = {
			css: this.styling,
			title: config.app.TITLE,
			enableSW: config.app.USE_SW,
			content: content,
			cache: true
		};

		config.headers.forEach(header => {
			res.setHeader(header.LABEL, header.VALUE);
		});
		res.render(config.app.SHELL_LAYOUT, props);
	};
}

export default IndexViewRenderer;