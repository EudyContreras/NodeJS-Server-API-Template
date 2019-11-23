
import React from 'react';
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
];

export default (styling: any): any[] => [
	{ ...routes[0], render: ((props: any): JSX.Element => <Home {...props} styling={styling}/>) },
	{ ...routes[1], render: ((props: any): JSX.Element => <Docs {...props} styling={styling}/>) },
	{ ...routes[2], render: ((props: any): JSX.Element => <About {...props} styling={styling}/>) },
	{ ...routes[3], render: ((props: any): JSX.Element => <Admin {...props} styling={styling}/>) },
	{ ...routes[4], render: ((props: any): JSX.Element => <Lost {...props} styling={styling}/>) }
];