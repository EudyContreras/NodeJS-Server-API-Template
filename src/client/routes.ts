

import Home from './components/tabs/documentation/DocsPage';
import Docs from  './components/tabs/documentation/DocsPage';
import About from './components/tabs/information/AboutPage';
import Admin from './components/tabs/administration/AdminPage';
import Lost from './components/common/Lost';

export default [
  {path: '/', component: Home},
  {path: '/documentation', component: Docs},
  {path: '/about', component: About},
  {path: '/admin', component: Admin},
  {path: '*', component: Lost}
]