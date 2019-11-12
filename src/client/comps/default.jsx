import React, { PureComponent } from 'react';

export default class DefaultLayout extends PureComponent {

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=swap' />
          <link rel='stylesheet' href='/client/styles/index.css' />
          <link rel="shortcut icon" type="image/png" href="/client/resources/images/favicon.png" />
          <link rel='stylesheet' href='/client/styles/menu.css' />
          <link rel='stylesheet' href='/client/styles/restful.css' />
          <link rel='stylesheet' href='/client/styles/search.css' />
          <link rel='stylesheet' href='/client/styles/content.css' />
          <link rel='stylesheet' href='/client/styles/footer.css' />
          <link rel='stylesheet' href='/client/styles/navbar.css' />
          <link rel='stylesheet' href='/client/styles/sandbox.css' />
          <link rel='stylesheet' href='/client/styles/submenu.css' />
        </head>
        <body>
          <div id='content' className='container'>
            {this.props.children}
          </div>
          <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' />
          <script src='/client/scripts/sticky.js' />
          <script src='/client/scripts/ripple.js' />
          <script src='/client/scripts/submenu.js' />
          <script src='/client/scripts/sidemenu.js' />
          <script src='/client/scripts/search.js' />
          <script src='/client/scripts/main.js' />
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;