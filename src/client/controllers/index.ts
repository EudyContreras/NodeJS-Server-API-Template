import React from 'react';
import config from '../config';
import routes from '../routes';
import ReactDOMServer from 'react-dom/server'
import ViewController from '../../server/controllers/controller.view';
import configureStore from '../store';

import { Store } from 'redux'
import { server } from '../views/template'
import express, { Router, Request, Response } from 'express';

class IndexController extends ViewController {

   private routing: string = '/';
   private router: Router;
   private context: any;
   private store: Store;
   private css: Set<any>;

   constructor() {
      super('index')
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

   renderRoutes = async (req: Request, res: Response) => {
      const client =  process.env.CLIENT_ONLY;
      const state = this.store.getState();

      const insertCss = (...styles: any[]) => styles.forEach(style => this.css.add(style._getCss()))
      
      res.render(config.layout.TEMPLATE, {
         css: this.css,
         title: config.app.NAME,
         state: JSON.stringify(state),
         content: ReactDOMServer.renderToString(client ?  React.createElement('') : server(req.url, this.store, this.context, insertCss))
      });
   }
}

export default IndexController;