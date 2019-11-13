import React from 'react';
import Application from '../components/app';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'

export default (url, store, context, insertCss) => (

   <Provider store={store}>
      <StaticRouter location={url} context={context}>
         <StyleContext.Provider value={{ insertCss }}>
            <Application />
         </StyleContext.Provider>
      </StaticRouter>
   </Provider>
)
