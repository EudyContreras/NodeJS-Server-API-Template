"use strict";
// import React, { PureComponent } from 'react';
// import ContentArea from './content/content.area';
// import FooterArea from './footer/footer.area';
// import SideMenu from './sidebar/sidebar.menu.panel';
// import SandBox from './sandbox/sandbox.area';
// import NavbarMenu from './navbar/navbar.menu';
// import NavbarPadder from './navbar/navbar.padder';
// import DefaultLayout from './default';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default class IndexLayout extends PureComponent {
//   render() {
//     var routes = [
//       { label: 'Documentation', link: '/documentation' },
//       { label: 'About', link: '/about' },
//       { label: 'Admin', link: '/admin' },
//     ];
//     return (
//       <DefaultLayout title={this.props.title}>
//         <NavbarPadder/>
//         <SideMenu />
//         <SandBox />
//         <ContentArea /> 
//         <FooterArea />
//         <NavbarMenu brandName={''} routings={routes} />
//       </DefaultLayout>
//     );
//   }
// }
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const app_1 = __importDefault(require("./app"));
react_dom_1.hydrate(react_1.default.createElement(app_1.default, null), document.getElementById("reactele"));
