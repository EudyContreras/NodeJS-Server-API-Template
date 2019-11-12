import React from 'react';
import ReactDOM from 'react-dom';
import Application from './client/components/app';
import configureStore from './client/store';
import reducers from './client/reducers';
import appSaga from './client/saga';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const initialState = window.__REDUX_STATE__ || {};
const store = configureStore(initialState);

store.runSaga(appSaga);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter><Application /></BrowserRouter>
  </Provider>,
  document.getElementById('content')
);