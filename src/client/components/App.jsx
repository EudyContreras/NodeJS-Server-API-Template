
import React from 'react';
import config from '../config'
import Wrapper from './common/Wrapper';
import NavbarMenu from './shared/navbar/Navbar';
import NavbarPadder from './shared/navbar/NavbarPadder';
import withStyles from 'isomorphic-style-loader/withStyles';
import styling from '../styles/app.css';
import routes from '../routes';

import { Switch, Route } from 'react-router-dom';

const routings = [
  { label: 'Documentation', link: '/documentation' },
  { label: 'About', link: '/about' },
  { label: 'Admin', link: '/admin' },
];

class App extends React.PureComponent {

  render() {
    return (
      <Wrapper className='App'>
        <NavbarPadder />
        <Switch> 
          {routes.map((route, idx) => (<Route exact key={idx} {...route} /> ))}
        </Switch>
        <NavbarMenu brandName={config.app.NAME} routings={routings} />
      </Wrapper>
    );
  }
}

export default withStyles(styling)(App) 
