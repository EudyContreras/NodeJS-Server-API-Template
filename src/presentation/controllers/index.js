import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server'
import ViewController from '../../controllers/controller.view';
import configureStore from '../store';
import appSaga from '../saga';
import Application from '../components/app';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'

const { CLIENT_ONLY } = process.env;

class IndexController extends ViewController {

   constructor() {
      super('index')
      this.routing = '/';
      this.router = express.Router();
      this.setupRoutes(this.router);
   }

   getRoute() {
      return this.routing;
   }

   getRouter() {
      return this.router;
   }

   setupRoutes(router) {
      router.get('*', this.render);
      router.post('/', this.handlePost);
   }

   render = async (req, res) => {

      const context = {};
      const store = configureStore({});
      // run saga sync
      await store.runSaga(appSaga).done;
      const state = store.getState();
      res.render('layout', {
         state: JSON.stringify(state),
         content: ReactDOMServer.renderToString(
            CLIENT_ONLY
               ? ''
               : (
                  <Provider store={store}>
                     <StaticRouter location={req.url} context={context}>
                        <Application />
                     </StaticRouter>
                  </Provider>
               )
         )
      });
   }

   handlePost = (request, response) => {
      response.send('What');
   }
}

export default IndexController;