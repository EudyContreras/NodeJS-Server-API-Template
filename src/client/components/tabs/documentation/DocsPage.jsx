import React from 'react';
import ReactDom from 'react-dom';
import Wrapper from '../../common/Wrapper';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';
import stickEffect, { ScrollListener } from '../../../appliers/sticky.applier';

class DocsPage extends React.PureComponent {
 
   componentDidMount() {
      const style = this.props.styling;

      const element = ReactDom.findDOMNode(this);

      const footer = element.getElementsByClassName(style.footerArea)[0];
      const sideBar = element.getElementsByClassName(style.sideMenu)[0];
      const sandBox = element.getElementsByClassName(style.sandboxArea)[0];

      const sandboxListener = new ScrollListener(sandBox, footer);
      const sidebarListener = new ScrollListener(sideBar);

      stickEffect(style, sidebarListener, sandboxListener);
   }

   render() {
      const style = this.props.styling;
      return (
         <Wrapper>
            <SideMenu styling={style} />
            <SandBox styling={style} />
            <ContentArea styling={style} />
            <FooterArea styling={style} />
         </Wrapper>
      );
   }
} 

export default DocsPage;