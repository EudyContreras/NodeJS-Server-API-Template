import React from 'react';
import Wrapper from '../../common/Wrapper';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';

class DocsPage extends React.PureComponent {

   render() {
      return (
         <Wrapper>
            <SideMenu />
            <SandBox />
            <ContentArea />
            <FooterArea />
         </Wrapper>
      );
   }
} 

export default DocsPage;