import React, { PureComponent } from 'react';

export default class Reports extends PureComponent {
   
   render() {
      return (
         <div className='container'>
            <p>{this.props.content}</p>
         </div>
      );
   }
} 