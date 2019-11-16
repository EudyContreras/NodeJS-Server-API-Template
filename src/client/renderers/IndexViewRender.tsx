import React from 'react';
import config from '../config';
import routes from '../routes';
import Template from '../views/template'

import ViewRenderer from '../../server/middleware/renderer';
import configureStore from '../store';

import { Store } from 'redux'
import { server } from '../views'
import express, { Router, Request, Response } from 'express';

class IndexViewRenderer extends ViewRenderer {

   private routing: string = '/';
   private router: Router;
   private context: any;
   private store: Store;
   private css: Set<any>;

   constructor() {
      super();
      this.context = {};
      this.router = express.Router();
      this.store = configureStore({});
      this.css = new Set()
      this.setupRoutes(this.router);
   }

   getRoute() {
      return this.routing;
   }

   getRouter() {
      return this.router;
   }

   setupRoutes(router: Router) {
      routes.map(x => router.get(x.path, this.renderRoutes))
   }

   renderRoutes = (req: Request, res: Response) => {
      const client =  config.app.CSR;
      const state = this.store.getState();

      const insertCss = (...styles: any[]) => styles.forEach(style => this.css.add(style._getCss()));

      const args = {
         css: this.css,
         title: config.app.NAME,
         state: JSON.stringify(state),
         content: server(req.url, this.store, this.context, insertCss)
      }

      res.send(Template(args));
   }
}

export default IndexViewRenderer;