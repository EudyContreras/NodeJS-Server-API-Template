import React from 'react';

class FooterArea extends React.PureComponent {
   constructor(props) {
      super(props)
   }

   render() {
      const style = this.props.styling;

      return (
         <footer className={style.footerArea}></footer>
      );
   }
} 

export default FooterArea;