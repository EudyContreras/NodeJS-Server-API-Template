
import React from 'react'
import Home from './tabs/documentation/DocsPage';
import Docs from './tabs/documentation/DocsPage';
import About from './tabs/information/AboutPage';
import Admin from './tabs/administration/AdminPage';
import Lost from './common/Lost';

export const routes = [
  {
    path: '/'
  },
  {
    navLink: true,
    label: 'Documentation',
    path: '/documentation'
  },
  {
    navLink: true,
    label: 'About',
    path: '/about'
  },
  {
    navLink: true,
    label: 'Admin',
    path: '/admin'
  },
  {
    path: '*'
  }
]

export default (styling: any) => [
  {...routes[0], render: ((props: any) => <Home {...props}  styling={styling}/>)},
  {...routes[1], render: ((props: any) => <Docs {...props}  styling={styling}/>)},
  {...routes[2], render: ((props: any) => <About {...props}  styling={styling}/>)},
  {...routes[3], render: ((props: any) => <Admin {...props}  styling={styling}/>)},
  {...routes[4], render: ((props: any) => <Lost {...props}  styling={styling}/>)}
]