import React from 'react';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';

class DocsPage extends React.PureComponent {

   render() {
      return (
         <>
            <SideMenu />
            <SandBox />
            <ContentArea />
            <FooterArea />
         </>
      );
   }
} 

export default DocsPage;