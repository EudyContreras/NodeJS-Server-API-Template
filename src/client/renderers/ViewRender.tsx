/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path';
import config from '../../configs/config.client.json';
import configureStore from '../stores/store';
import { ServerStyleSheet } from 'styled-components';
import ViewRenderer from '../../server/middleware/renderer';
import ReactDOM from 'react-dom/server';
import { routes } from '../components/Routes';
import { Store } from 'redux';
import { application } from '../views';
import { Router, Request, Response } from 'express';
import IAction from '../actions/action';
import { ChunkExtractor } from '@loadable/server';

const statsFile = path.resolve('build/public/loadable-stats.json');

class IndexViewRenderer extends ViewRenderer {
	private routing = '/';
	private router: Router;
	private store: Store<any, IAction>;
	private state: any;

	constructor() {
		super();
		this.router = Router();
		this.store = configureStore({});
		this.state = this.store.getState();
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

			if (shell) {
				return await this.renderShell(req, res);
			} else {
				return await this.renderApplication(req, res);
			}
		}
	};

	private renderApplication = async (req: Request, res: Response): Promise<void> => {
		const extractor = new ChunkExtractor({ statsFile: statsFile, entrypoints: ['app'] });

		const context = {};
		const css = new Set();
		const cssInjector = (...styles): void => {
			styles.forEach((style) => css.add(style._getCss()));
		};

		const sheet = new ServerStyleSheet();
		const reactApp = application(req.url, this.store, context, cssInjector);
		const contentChunks = extractor.collectChunks(reactApp);

		const scriptTags = extractor.getScriptTags();
		const styleTags = extractor.getStyleTags();

		try {
			ReactDOM.renderToString(sheet.collectStyles(reactApp));
			const styledTags = sheet.getStyleTags();

			const props = {
				css: [{ id: 'serverCSS', cssText: [...css].join('') }],
				html: config.html,
				state: this.state,
				styles: styleTags,
				styledTags: styledTags,
				scripts: scriptTags,
				context: context,
				webpSupport: true,
				enableSW: process.env.USE_SW === 'true',
				clientSideRendered: process.env.CSR === 'true',
				watchConnection: true,
				content: contentChunks,
				cache: true
			};

			config.headers.forEach((header) => {
				res.setHeader(header.LABEL, header.VALUE);
			});

			res.render(config.layout.FULL, props);
		} catch (error) {
			console.error('Error: ', error);
		} finally {
			sheet.seal();
		}
	};

	private renderShell = async (req: Request, res: Response): Promise<void> => {
		const context = {};
		const css = new Set();
		const cssInjector = (...styles): void => {
			styles.forEach((style) => css.add(style._getCss()));
		};
		const content = application(req.url, this.store, context, cssInjector);

		const props = {
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
