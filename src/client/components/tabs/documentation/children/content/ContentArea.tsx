import React from 'react';
import Section from './ContentSection';

class ContentArea extends React.PureComponent<any, any> {

   constructor(props: any) {
      super(props);
   }

   public render() {
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