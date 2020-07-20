/* eslint-disable @typescript-eslint/no-var-requires */

import config from '../../configs/config.client.json';
import ViewRenderer from '../../server/middleware/renderer';
import { Router, Request, Response } from 'express';

class IndexViewRenderer extends ViewRenderer {

	private routing = '/';
	private router: Router;

	constructor() {
		super();
		this.router = Router();
		this.setupRoutes(this.router);
	}

	public getRoute = (): string => this.routing;

	public getRouter = (): Router => this.router;

	public setupRoutes = (router: Router): void => {
		router.get('/', this.renderRoutes);
	};

	private renderRoutes = async (req: Request, res: Response): Promise<void> => {
		config.headers.forEach(header => {
			res.setHeader(header.LABEL, header.VALUE);
		});

		const template: any = config.layout;

		res.render(template.LIGHT, {
			html: config.html,
			text: 'Welcome to Reach Template Engine',
			url: req.url
		});
	};
}

export default IndexViewRenderer;
