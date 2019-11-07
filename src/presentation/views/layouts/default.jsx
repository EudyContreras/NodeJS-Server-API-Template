import React, { PureComponent } from 'react';

class DefaultLayout extends PureComponent {
  render() {
    return (
      <html>
        <head><title>{this.props.title}</title></head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

export default DefaultLayout;