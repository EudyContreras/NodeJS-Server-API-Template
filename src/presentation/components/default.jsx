import React, { PureComponent } from 'react';

class DefaultLayout extends PureComponent {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel='stylesheet' href='/presentation/stylesheets/index.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/navbar.css' />
        </head>
        <body>
          <div class='container'>
            {this.props.children}
          </div>
        </body>
      </html>
    );
  }
}

export default DefaultLayout;