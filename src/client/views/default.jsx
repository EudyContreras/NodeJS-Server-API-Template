import React from 'react';

export default class DefaultLayout extends React.PureComponent {

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Template Web site generated the server api routing" />
          <link rel="shortcut icon" type="image/png" href="/resources/images/favicon.png" />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=swap' />
          <link rel='stylesheet' href='/styles/index.css' />
          <link rel='stylesheet' href='/styles/menu.css' />
          <link rel='stylesheet' href='/styles/restful.css' />
          <link rel='stylesheet' href='/styles/search.css' />
          <link rel='stylesheet' href='/styles/content.css' />
          <link rel='stylesheet' href='/styles/footer.css' />
          {/* <link rel='stylesheet' href='/styles/navbar.css' /> */}
          <link rel='stylesheet' href='/styles/sandbox.css' />
          <link rel='stylesheet' href='/styles/submenu.css' />
          <style>${[...this.props.css].join('')}</style>
        </head>
        <body >
          <section id="content">{this.props.content}</section>
          <script dangerouslySetInnerHTML={{ __html: `var __REDUX_STATE__ = ${this.props.state};` }} />
          <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' />
          <script src='/scripts/sticky.js' />
          <script src='/scripts/ripple.js' />
          <script src='/scripts/submenu.js' />
          <script src='/scripts/sidemenu.js' />
          <script src='/scripts/search.js' />
          <script src='/scripts/main.js' />
          <script src="/static/client.js"></script>
        </body>
      </html>
    );
  }
}