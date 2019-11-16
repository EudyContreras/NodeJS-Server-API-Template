import React from 'react';
import Section from './ContentSection';

class ContentArea extends React.PureComponent {

   constructor(props) {
      super(props)
   }

   render() {
      const style = this.props.styling;

      return (
         <div className={style.contentWrapper}>
            <Section styling={style}/>
            <Section styling={style}/>
            <Section styling={style}/>
            <Section styling={style}/>
            <Section styling={style}/>
            <Section styling={style}/>
         </div>
      );
   }
} 

export default ContentArea;