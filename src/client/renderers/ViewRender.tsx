import config from '../config';
import configureStore from '../stores/store';
import ViewRenderer from '../../server/middleware/renderer';
import appStyle from './../styles/app.scss';

import { Store } from 'redux';
import { application, shell } from '../views';
import { routes } from '../components/Routes';
import { Router, Request, Response } from 'express';
import { template } from '../views/templateApp';

class IndexViewRenderer extends ViewRenderer {

	private routing = '/';
	private router: Router;
	private context = {};
	private store: Store;

	constructor() {
		super();
		this.router = Router();
		this.store = configureStore({});
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

		if (config.app.CSR) {
			res.status(200).send('');
		} else {
			if (shell) {
				return await this.renderShell(req, res);
			} else {
				return await this.renderApplication(req, res);
			}
		}
	};

	private renderApplication = async (req: Request, res: Response): Promise<void> => {
		const state = this.store.getState();
		const styling = new Set([appStyle._getCss()]);

		const insertCss = (...styles: any[]): void => styles.forEach(style => styling.add(style._getCss()));

		const content = application(req.url, this.store, this.context, insertCss);
		
		const props = {
			css: styling,
			state: state,
			title: config.app.TITLE,
			enableSW: config.app.USE_SW,
			content: content,
			cache: true
		};

		config.headers.forEach(header => {
			res.setHeader(header.LABEL, header.VALUE);
		});
		//res.render(config.app.APP_LAYOUT, props);
		res.send(template(props));
	};

	private renderShell = async (req: Request, res: Response): Promise<void> => {
		const styling = new Set([appStyle._getCss()]);

		const insertCss = (...styles: any[]): void => styles.forEach(style => styling.add(style._getCss()));

		const content = shell(req.url, this.store, this.context, insertCss);

		const props = {
			css: styling,
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