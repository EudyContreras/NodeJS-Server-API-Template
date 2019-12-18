
import React from 'react';
import Home from './sections/documentation/DocsPage';
import Docs from './sections/documentation/DocsPage';
import Guide from './sections/information/AboutPage';
import About from './sections/documentation/DocsPage';
import Admin from './sections/administration/AdminPage';
import Lost from './shared/Lost';

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
		label: 'Guides',
		path: '/guides'
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
];

export default (otherProps: any): any[] => [
	{ ...routes[0], render: ((props: any): JSX.Element => <Home {...props} {...otherProps}/>) },
	{ ...routes[1], render: ((props: any): JSX.Element => <Docs {...props} {...otherProps}/>) },
	{ ...routes[2], render: ((props: any): JSX.Element => <Guide {...props} {...otherProps}/>) },
	{ ...routes[3], render: ((props: any): JSX.Element => <About {...props} {...otherProps}/>) },
	{ ...routes[4], render: ((props: any): JSX.Element => <Admin {...props} {...otherProps}/>) },
	{ ...routes[5], render: ((props: any): JSX.Element => <Lost {...props} {...otherProps}/>) }
	
];