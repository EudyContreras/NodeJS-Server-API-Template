/* eslint-disable react/prop-types */
import React from 'react';
import FavIcon from '../resources/images/favicon.png';
import ReactDOMServer from 'react-dom/server';

export default (args) => {
   const layout = ReactDOMServer.renderToString(<DefaultLayout {...args} />);
   return `<!DOCTYPE html>${layout}`;
};

class DefaultLayout extends React.PureComponent {
   render() {
      return (
         <html>
            <head>
               <meta charSet='utf-8' />
               <title>{this.props.title}</title>
               <meta name='viewport' content='width=device-width, initial-scale=1' />
               <meta name='theme-color' content='#000000' />
               <meta name='description' content='Template Web site generated the server api routing' />
               <link rel='manifest' href='/static/manifest.json' />
               <link rel='apple-touch-icon' href={FavIcon}  />
               <link rel='shortcut icon' type='image/png' href={FavIcon} />
               <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
               <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
               <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=swap' />
               <style>${[...this.props.css].join('')}</style>
            </head>
            <body >
               <section id='content'>{this.props.content}</section>
               <script src='/static/bundle.js' />
               <script src='/scripts/global.js' />
               <script dangerouslySetInnerHTML={{ __html: `var __REDUX_STATE__ = ${this.props.state};` }} />
               <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' />
               <script src='/scripts/main.js' />
               <script dangerouslySetInnerHTML={
                  {
                     __html:
                ` window.ga = function () {ga.q.push(arguments)}; ga.q = []; ga.l = +new Date;
                  ga('create', 'UA-XXXXX-Y', 'auto'); ga('set','transport','beacon'); ga('send', 'pageview')`
                  }} />
               <script src='https://www.google-analytics.com/analytics.js' async></script>
            </body>
         </html>
      );
   }
}