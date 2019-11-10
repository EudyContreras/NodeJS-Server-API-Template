import React, { PureComponent } from 'react';
import Section from './content.section';

export default class ContentArea extends PureComponent {

   componentDidMount() { }

   render() {
      return (
         <div>
            <Section />
            <Section />
            <Section />
            <Section />
            <Section />
            <Section />
         </div>
      );
   }
} 