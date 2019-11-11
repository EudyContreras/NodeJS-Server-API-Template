import React from 'react';
import ReactDOM from 'react-dom';
import App from './presentation/components/app';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('content')
);