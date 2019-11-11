import React from 'react';
import express from 'express';
import handlebars from 'handlebars';
import ReactDOMServer from 'react-dom/server'
import ViewController from '../controller.view';
import App from '../../presentation/components/app';

import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server';
import { Router, Response } from 'express';

class IndexController extends ViewController {

   private routing: string = '/';
   private router: Router;

   constructor() {
      super('index')
      this.router = express.Router();
      this.setupRoutes(this.router);
   }

   getRoute(): string {
      return this.routing;
   }

   getRouter(): Router {
      return this.router;
   }

   private setupRoutes(router: Router) {
      router.get('/', this.render);
      router.post('/', this.handlePost);
   }

   private render = (request: any, response: Response) => {
      // const theHtml = `
      //    <html>
      //    <head><title>My First SSR</title></head>
      //    <body>
      //    <h1>My First Server Side Render</h1>
      //    <div id='reactele'>{{{reactele}}}</div>
      //    <script>var exports = {};</script>
      //    <script src='presentation/components/app.js' charset='utf-8'></script>
      //    <script src='presentation/components/vendor.js' charset='utf-8'></script>
      //    </body>
      //    </html>
      //    `;
         
      //    const hbsTemplate = handlebars.compile(theHtml);
      //    const reactComp = renderToString(React.createElement(App));
      //    const htmlToSend = hbsTemplate({ reactele: reactComp });
      //    response.send(htmlToSend);

      const context = {};
      response.render('layout',{
         content: ReactDOMServer.renderToString(React.createElement(App))
      });
   }

   private handlePost = (request: any, response: Response) => {
      response.send('What');
   }
}

export default IndexController;