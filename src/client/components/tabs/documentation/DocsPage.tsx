import React, { createRef, RefObject } from 'react';
import Wrapper from '../../common/Wrapper';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';
import stickEffect, { ScrollListener } from '../../../appliers/sticky.applier';

class DocsPage extends React.PureComponent<any, any> {
 
   private readonly footer: RefObject<HTMLElement>;
   private readonly sidebar: RefObject<HTMLElement>;
   private readonly sandbox: RefObject<HTMLElement>;

   constructor(props: any) {
      super(props);
      this.footer = createRef<HTMLElement>();
      this.sidebar = createRef<HTMLElement>();
      this.sandbox = createRef<HTMLElement>();
   }

   public componentDidMount() {
      const style = this.props.styling;
   
      const footer = this.footer.current;
      const sideBar = this.sidebar.current;
      const sandBox = this.sandbox.current;
      
      const sandboxListener = new ScrollListener(sandBox!, footer, 10);
      const sidebarListener = new ScrollListener(sideBar!, null ,10);

      stickEffect(style, sidebarListener, sandboxListener);
   }

  public render() {
      const style = this.props.styling;
      return (
         <Wrapper>
            <SideMenu refProp={this.sidebar} styling={style} />
            <SandBox refProp={this.sandbox} styling={style} />
            <ContentArea styling={style} />
            <FooterArea refProp={this.footer} styling={style} />
         </Wrapper>
      );
   }
} 

export default DocsPage;