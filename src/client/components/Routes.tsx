import React from 'react';
import loadable from '@loadable/component';
import { delayBoundary } from './utililties/loadable.utils';
import Docs from './sections/documentation/DocsPage';
import Lost from './shared/states/LostState';

const options = { ssr: true, fallback: <h2>Loading...</h2> };

const Apps = loadable(() => delayBoundary(import(/* webpackPrefetch: true */ './sections/applications/ApplicationsPage')), options);
const About = loadable(() => delayBoundary(import(/* webpackPrefetch: true */ './sections/information/AboutPage')), options);
const Admin = loadable(() => delayBoundary(import(/* webpackPrefetch: true */ './sections/administration/AdminPage')), options);


export const routes = [
	{
		lazyLoaded: false,
		label: 'Home',
		path: '/'
	},
	{
		navLink: true,
		lazyLoaded: false,
		label: 'Documentation',
		path: '/documentation'
	},
	{
		navLink: true,
		lazyLoaded: true,
		label: 'Applications',
		path: '/applications'
	},
	{
		navLink: true,
		lazyLoaded: true,
		label: 'About',
		path: '/about'
	},
	{
		navLink: true,
		lazyLoaded: true,
		label: 'Admin',
		path: '/admin'
	},
	{
		lazyLoaded: false,
		label: 'Lost',
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
	{ mapping: { ...routes[0] }, render: (props?: any): JSX.Element => <Docs {...props} {...otherProps} {...routes[0]}/> },
	{ mapping: { ...routes[1] }, render: (props?: any): JSX.Element => <Docs {...props} {...otherProps} {...routes[1]}/> },
	{ mapping: { ...routes[2] }, render: (props?: any): JSX.Element => <Apps {...props} {...otherProps} {...routes[2]}/> },
	{ mapping: { ...routes[3] }, render: (props?: any): JSX.Element => <About {...props} {...otherProps} {...routes[3]}/> },
	{ mapping: { ...routes[4] }, render: (props?: any): JSX.Element => <Admin {...props} {...otherProps} {...routes[4]}/> },
	{ mapping: { ...routes[5] }, render: (props?: any): JSX.Element => <Lost {...props} {...otherProps} {...routes[5]} /> }
];