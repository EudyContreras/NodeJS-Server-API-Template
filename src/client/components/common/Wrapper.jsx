import React from 'react';

class Wrapper extends React.PureComponent {
   render() {
      return (
        <>{this.props.children}</>
      );
   }
} 

export default Wrapper;