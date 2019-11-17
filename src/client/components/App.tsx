
import React from 'react';
import Docs from './tabs/documentation/DocsPage';
import config from '../config'
import Wrapper from './common/Wrapper';
import NavbarMenu from './shared/navbar/Navbar';
import NavbarPadder from './shared/navbar/NavbarPadder';
import withStyles from 'isomorphic-style-loader/withStyles';
import style from '../styles/app.scss';
import router from './Routes';

import { Switch, Route } from 'react-router-dom';

class App extends React.PureComponent<any, any> {

  componentDidMount() { }
  
  render() {
    const routes = router(style);

    const elements = routes.filter(x => x.navLink === true).map(x => {
      return { link: x.path, label: x.label }
    });

    const routings = routes.map((route, idx) => <Route exact key={idx} path={route.path} render={route.render}/>);
    
    return (
      <Wrapper>
        <NavbarPadder styling={style}/>
        <Switch> 
          {routings}
        </Switch>
        <NavbarMenu location={this.props.location} styling={style} brandName={config.app.NAME} routings={ elements } />
      </Wrapper>
    );
  }
}

export default withStyles(style)(App);
