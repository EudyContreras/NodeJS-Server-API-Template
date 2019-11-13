import React from 'react';

export default class DefaultLayout extends React.PureComponent {

  render() {
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <link rel="shortcut icon" type="image/png" href="/client/resources/images/favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Template Web site generated the server api routing"
          />
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
          <style>${[...this.props.css].join('')}</style>
        </head>
        <body className="container">
          <section id="content">{this.props.content}</section>
          <script
            dangerouslySetInnerHTML={{
              __html:
                `var __REDUX_STATE__ = ${this.props.state};`
            }}
          />
          <script src="/static/client.js"></script>
        </body>
      </html>
    );
  }
}