import React from "react";
import { Switch, Route, StaticRouter } from 'react-router';
import routes from '../routes';

export default class Routing extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <StaticRouter location={this.props.url}>
        <Switch>
          {routes.map((route, idx) => (
            <Route exact key={idx} {...route} />
          ))}
        </Switch>
      </StaticRouter>
    )
  }
}
