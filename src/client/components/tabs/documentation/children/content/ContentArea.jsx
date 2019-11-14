import React from 'react';
import Section from './ContentSection';

class ContentArea extends React.PureComponent {

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

export default ContentArea;