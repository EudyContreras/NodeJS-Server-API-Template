

import Home from './components/tabs/documentation/DocsPage';
import Docs from  './components/tabs/documentation/DocsPage';
import About from './components/tabs/information/AboutPage';
import Admin from './components/tabs/administration/AdminPage';
import Lost from './components/common/Lost';

export default [
  {path: '/', component: Home},
  {path: '/documentation', component: Docs, label: 'Documentation', navLink: true},
  {path: '/about', component: About, label: 'About', navLink: true},
  {path: '/admin', component: Admin, label: 'Admin', navLink: true},
  {path: '*', component: Lost}
]