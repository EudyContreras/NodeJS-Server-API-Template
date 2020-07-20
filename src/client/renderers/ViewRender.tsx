/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path';
import config from '../../configs/config.client.json';
import configureStore from '../stores/store';
import ViewRenderer from '../../server/middleware/renderer';
import AppStyle from '../styles/app.scss';
import { routes } from '../components/Routes';
import { Store } from 'redux';
import { application } from '../views';
import { Router, Request, Response } from 'express';
import IAction from '../actions/action';
import { ChunkExtractor } from '@loadable/server';

const statsFile = path.resolve('build/public/loadable-stats.json');
const appStyle: any = AppStyle;

class IndexViewRenderer extends ViewRenderer {
	private routing = '/';
	private router: Router;
	private store: Store<any, IAction>;
	private state: any;
	private css: any;

	constructor() {
		super();
		this.router = Router();
		this.store = configureStore({});
		this.state = this.store.getState();
		this.css = { cssText: appStyle._getCss() };
		this.setupRoutes(this.router);
	}

	public getRoute = (): string => this.routing;

	public getRouter = (): Router => this.router;

	public setupRoutes = (router: Router): void => {
		routes.map((x) => router.get(x.path, this.renderRoutes));
	};

	private renderRoutes = async (req: Request, res: Response): Promise<void> => {
		if (process.env.CSR === 'true') {
			res.status(200).send();
		} else {
			const shell = req.query.shell !== undefined;

			const css = new Set();
			const cssInjector = (...styles): void => {
				styles.forEach((style) => css.add(style._getCss()));
			};

			if (shell) {
				return await this.renderShell(req, res, cssInjector);
			} else {
				return await this.renderApplication(req, res, cssInjector);
			}
		}
	};

	private renderApplication = async (req: Request, res: Response, cssInjector: Function): Promise<void> => {
		const extractor = new ChunkExtractor({ statsFile: statsFile, entrypoints: ['app'] });

		const context = {};
		const content = extractor.collectChunks(application(req.url, this.store, context, cssInjector));

		const entryPoints = extractor.getMainAssets();

		const styles = entryPoints.filter((x) => x.url.endsWith('.css'));
		const scripts = entryPoints.filter((x) => x.url.endsWith('.js'));

		const props = {
			css: this.css,
			html: config.html,
			state: this.state,
			styles: styles,
			scripts: scripts,
			context: context,
			enableSW: process.env.USE_SW === 'true',
			clientSideRendered: process.env.CSR === 'true',
			watchConnection: true,
			content: content,
			cache: true
		};

		config.headers.forEach((header) => {
			res.setHeader(header.LABEL, header.VALUE);
		});
		res.render(config.layout.FULL, props);
	};

	private renderShell = async (req: Request, res: Response, cssInjector: Function): Promise<void> => {
		const context = {};
		const content = application(req.url, this.store, context, cssInjector);

		const props = {
			css: this.css,
			html: config.html,
			enableSW: process.env.USE_SW === 'true',
			context: context,
			content: content,
			cache: true
		};

		config.headers.forEach((header) => {
			res.setHeader(header.LABEL, header.VALUE);
		});
		res.render(config.layout.SHELL, props);
	};
}

export default IndexViewRenderer;
