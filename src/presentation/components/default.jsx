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
          <link rel='stylesheet' href='/presentation/stylesheets/index.css' />
          <link rel="shortcut icon" type="image/png" href="/presentation/resources/images/favicon.png" />
          <link rel='stylesheet' href='/presentation/stylesheets/menu.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/restful.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/search.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/content.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/footer.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/navbar.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/sandbox.css' />
          <link rel='stylesheet' href='/presentation/stylesheets/submenu.css' />
        </head>
        <body>
          <div id='content' className='container'>
            {this.props.children}
          </div>
          <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' />
          <script src='/presentation/scripts/sticky.js' />
          <script src='/presentation/scripts/ripple.js' />
          <script src='/presentation/scripts/submenu.js' />
          <script src='/presentation/scripts/sidemenu.js' />
          <script src='/presentation/scripts/search.js' />
          <script src='/presentation/scripts/main.js' />
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;