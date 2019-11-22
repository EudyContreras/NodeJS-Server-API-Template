
import React, { Fragment } from 'react';
import config from '../config';
import NavbarMenu from './shared/navbar/Navbar';
import NavbarPadder from './shared/navbar/NavbarPadder';
import withStyles from 'isomorphic-style-loader/withStyles';
import style from '../styles/app.scss';
import router from './Routes';

import { Switch, Route } from 'react-router-dom';

class App extends React.PureComponent<any, any> {

  public render() {
    const routes = router(style);

    const elements = routes.filter((x) => x.navLink === true).map((x) => {
      return { link: x.path, label: x.label };
    });

    const routings = routes.map((route, idx) => <Route exact key={idx} path={route.path} render={route.render} />);

    return (
      <Fragment>
        <NavbarPadder styling={style} />
        <Switch>
          {routings}
        </Switch>
        <NavbarMenu location={this.props.location} styling={style} brandName={config.app.NAME} routings={elements} />
      </Fragment>
    );
  }
}

export default withStyles(style)(App);
