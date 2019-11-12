import React from 'react';
import Application from '../components/app';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'

export default (url, store, context) => (
   <Provider store={store}>
      <StaticRouter location={url} context={context}>
         <Application />
      </StaticRouter>
   </Provider>
)
