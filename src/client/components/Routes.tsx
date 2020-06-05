import React from 'react';
import { loadable, delayBoundary } from './utililties/loadable.utils';

const Docs = loadable(() => delayBoundary(import(/* webpackPrefetch: true */ './sections/documentation/DocsPage')));
const About = loadable(() => delayBoundary(import(/* webpackPrefetch: true */ './sections/information/AboutPage')));
const Admin = loadable(() => delayBoundary(import(/* webpackPrefetch: true */ './sections/administration/AdminPage')));
const Lost = loadable(() => delayBoundary(import(/* webpackPrefetch: true */ './shared/states/LostState')));

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

export type Mapping = { 
	navLink: boolean | undefined;
	label: string | undefined;
	path: string;
} | any;

export type RouteMapping = {
	mapping: Mapping;
	render: (props?: any) => JSX.Element;
};

export default (otherProps: any): RouteMapping[] => [
	{ mapping: { ...routes[0] }, render: (props?: any): JSX.Element => <Docs {...props} {...otherProps} /> },
	{ mapping: { ...routes[1] }, render: (props?: any): JSX.Element => <Docs {...props} {...otherProps} /> },
	{ mapping: { ...routes[2] }, render: (props?: any): JSX.Element => <About {...props} {...otherProps} /> },
	{ mapping: { ...routes[3] }, render: (props?: any): JSX.Element => <Docs {...props} {...otherProps} /> },
	{ mapping: { ...routes[4] }, render: (props?: any): JSX.Element => <Admin {...props} {...otherProps} /> },
	{ mapping: { ...routes[5] }, render: (props?: any): JSX.Element => <Lost {...props} {...otherProps} /> }
];