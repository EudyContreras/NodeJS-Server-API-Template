import React from 'react';

export default class Wrapper extends React.PureComponent<any, any> {
   public render() {
      return (
        <div>{this.props.children}</div>
      );
   }
} 