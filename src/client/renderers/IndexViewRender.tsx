
import React from 'react';
import config from '../config';
import template from '../views/template';
import configureStore from '../stores/store';
import ViewRenderer from '../../server/middleware/renderer';

import { Store } from 'redux';
import { server } from '../views';
import { routes } from '../components/Routes';
import { Router, Request, Response } from 'express';

class IndexViewRenderer extends ViewRenderer {

   private routing: string = '/';
   private router: Router;
   private store: Store;

   constructor() {
      super();
      this.router = Router();
      this.store = configureStore({});
      this.setupRoutes(this.router);
   }

   public getRoute() {
      return this.routing;
   }

   public getRouter() {
      return this.router;
   }

   public setupRoutes(router: Router) {
      routes.map((x) => router.get(x.path, this.renderRoutes));
   }

   private renderRoutes = (req: Request, res: Response) => {
      const css = new Set();
      const client =  config.app.CSR;
      const state = this.store.getState();

      const insertCss = (...styles: any[]) => styles.forEach((style) => css.add(style._getCss()));

      const args = {
         css: css,
         state: state,
         title: config.app.TITLE,
         content: server(req.url, this.store, {}, insertCss)
      };

      res.setHeader(config.header.LABEL, config.header.VALUE);
      res.send(client ? React.createElement('') : template(args));
   }
}

export default IndexViewRenderer;