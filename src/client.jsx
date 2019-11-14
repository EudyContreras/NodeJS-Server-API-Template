import React from 'react';
import ReactDOM from 'react-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import Application from './client/components/App';
import configureStore from './client/store';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

if (typeof window === 'undefined') {
  global.window = {}
}

const initialState = window.__REDUX_STATE__ || {};
const store = configureStore(initialState);

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <Application />
      </StyleContext.Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('content')
);