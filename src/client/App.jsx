import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import styling from './styles/app.css';
import config from './config'
import routes from './routes';

import Navbar from './components/common/navbar.component';
import withStyles from 'isomorphic-style-loader/withStyles';

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
   var routings = [
      { text: 'Consultants', link: '/consultants' },
      { text: 'Clients', link: '/clients' },
      { text: 'Reports', link: '/reports' },
   ];

   return (
      <div className='App'>
         <Navbar brandName={config.app.NAME} routings={routings} />
         <br />
         <Switch>
            {routes.map((route, idx) => (
               <Route exact key={idx} {...route} />
            ))}
         </Switch>
      </div>
   );
}

export default withStyles(styling)(App) 
