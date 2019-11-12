import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server'
import ViewController from '../../server/controllers/controller.view';
import configureStore from '../store';
import appSaga from '../saga';
import template from '../views/template'
import Application from '../components/app';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'

const { CLIENT_ONLY } = process.env;

class IndexController extends ViewController {

   constructor() {
      super('index')
      this.routing = '/';
      this.context = {};
      this.router = express.Router();
      this.store = configureStore({});
      this.setupRoutes(this.router);
   }

   getRoute() {
      return this.routing;
   }

   getRouter() {
      return this.router;
   }

   setupRoutes(router) {
      router.get('/', this.render);
      router.get('/topics', this.render);
      router.post('/', this.handlePost);
   }

   render = async (req, res) => {
      await this.store.runSaga(appSaga).done;
      const state = this.store.getState();

      res.render('default', {
         title: 'React app',
         state: JSON.stringify(state),
         content: ReactDOMServer.renderToString(CLIENT_ONLY ? '' : template(req.url, this.store, this.context))
      });
   }

   handlePost = (request, response) => {
      response.send('What');
   }
}

export default IndexController;