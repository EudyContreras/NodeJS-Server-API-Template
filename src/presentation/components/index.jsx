
import React, { PureComponent } from 'react';
import ContentArea from './content/content.area';
import FooterArea from './footer/footer.area';
import SideMenu from './sidebar/sidebar.menu.panel';
import SandBox from './sandbox/sandbox.area';
import NavbarMenu from './navbar/navbar.menu';
import NavbarPadder from './navbar/navbar.padder';
import DefaultLayout from './default';

class IndexLayout extends PureComponent {

  render() {
    var routes = [
      { label: 'Documentation', link: '/documentation' },
      { label: 'About', link: '/about' },
      { label: 'Admin', link: '/admin' },
    ];

    return (
      <DefaultLayout title={this.props.title}>
        <NavbarPadder/>
        <SideMenu />
        <SandBox />
        <ContentArea /> 
        <FooterArea />
        <NavbarMenu brandName={''} routings={routes} />
      </DefaultLayout>
    );
  }
}

export default IndexLayout;