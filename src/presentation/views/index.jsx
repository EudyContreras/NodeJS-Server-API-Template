
import React, { PureComponent } from 'react';
import DefaultLayout from './layouts/default';

class IndexLayout extends PureComponent {
  componentDidUpdate() { }
  componentDidMount() { }
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}</div>
      </DefaultLayout>
    );
  }
}

export default IndexLayout;