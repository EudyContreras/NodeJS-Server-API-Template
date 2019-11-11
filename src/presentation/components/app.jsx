import React from "react";
import { Switch, Route } from 'react-router';
import routes from '../routes';

export default class App extends React.PureComponent {

  constructor(props, context) {
    super(props, context)
    this.state = {
      url: props.url,
    }
  }

  render() {
    return (
      <Switch>
        {routes.map((route, idx) => (
          <Route exact key={idx} {...route} />
        ))}
      </Switch>
    )
  }
}
