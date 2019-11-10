import React, { PureComponent } from 'react';
import Section from './content.section';

export default class ContentArea extends PureComponent {

   componentDidMount() { }

   render() {
      return (
         <div className='content-wrapper'>
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