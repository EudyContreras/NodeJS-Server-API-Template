import React from 'react';

export default class Wrapper extends React.PureComponent {
   render() {
      return (
        <div>{this.props.children}</div>
      );
   }
} 