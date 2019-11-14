
import config from '../config';
import express from 'express';
import routes from '../routes';
import ReactDOMServer from 'react-dom/server'
import ViewController from '../../server/controllers/controller.view';
import configureStore from '../store';

import { server } from '../views/template'

class IndexController extends ViewController {

   constructor() {
      super('index')
      this.routing = '/';
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

   setupRoutes(router) {
      routes.map(x => router.get(x.path, this.renderRoutes))
   }

   renderRoutes = async (req, res) => {
      const client =  process.env.CLIENT_ONLY;
      const state = this.store.getState();

      const insertCss = (...styles) => styles.forEach(style => this.css.add(style._getCss()))
      
      res.render(config.layout.TEMPLATE, {
         css: this.css,
         title: config.app.NAME,
         state: JSON.stringify(state),
         content: ReactDOMServer.renderToString(client ? '' : server(req.url, this.store, this.context, insertCss))
      });
   }
}

export default IndexController;