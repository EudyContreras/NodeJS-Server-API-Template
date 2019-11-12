import React from 'react';

export default class DefaultLayout extends React.PureComponent {

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body className="container">
          <header>
            <h1>Isomorphic React Example</h1>
          </header>
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