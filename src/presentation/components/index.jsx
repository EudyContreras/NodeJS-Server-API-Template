
import React, { PureComponent } from 'react';
import DocsLayout from './documentation/documentation';
import NavLayout from './navbar/navbar';
import DefaultLayout from './default';

class IndexLayout extends PureComponent {
  componentDidUpdate() { }
  componentDidMount() { }
  render() {

    var routes = [
      { label: 'Documentation', link: '/documentation' },
      { label: 'About', link: '/about' },
      { label: 'Admin', link: '/admin' },
    ];

    return (
      <DefaultLayout title={this.props.title}>
        <NavLayout brandName={'Template Engine'} routings={routes} />
        <br />
        <DocsLayout/>
      </DefaultLayout>
    );
  }
}

export default IndexLayout;