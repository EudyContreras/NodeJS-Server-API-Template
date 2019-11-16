
import React from 'react';
import config from '../config'
import Wrapper from './common/Wrapper';
import NavbarMenu from './shared/navbar/Navbar';
import NavbarPadder from './shared/navbar/NavbarPadder';
import withStyles from 'isomorphic-style-loader/withStyles';
import styling from '../styles/app.css';
import routes from '../routes';

import { Switch, Route } from 'react-router-dom';

class App extends React.PureComponent {

  componentDidMount() {

  }
  
  render() {
    const elements = routes.filter(x => x.navLink === true).map(x => {
      return { link: x.path, label: x.label }
    });

    const routings = routes.map((route, idx) => (<Route exact key={idx} {...route} /> ));

    return (
      <Wrapper className='App'>
        <NavbarPadder />
        <Switch> 
          {routings}
        </Switch>
        <NavbarMenu brandName={config.app.NAME} routings={ elements } />
      </Wrapper>
    );
  }
}

export default withStyles(styling)(App);
