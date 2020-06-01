import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from './utililties/loadable.utils';

const Docs = Loadable({
	loader: () => import('./sections/documentation/DocsPage'),
	delay: 300,
	loading: Loading
});
const About = Loadable({
	loader: () => import('./sections/information/AboutPage'),
	delay: 300,
	loading: Loading
});
const Admin = Loadable({
	loader: () => import('./sections/administration/AdminPage'),
	delay: 300,
	loading: Loading
});
const Lost = Loadable({
	loader: () => import('./shared/states/LostState'),
	delay: 300,
	loading: Loading
});

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
	{ mapping: { ...routes[0] }, render: (props?: any): JSX.Element => { Docs.preload(); return (<Docs {...props} {...otherProps} />); } },
	{ mapping: { ...routes[1] }, render: (props?: any): JSX.Element => { Docs.preload(); return (<Docs {...props} {...otherProps} />); } },
	{ mapping: { ...routes[2] }, render: (props?: any): JSX.Element => { About.preload(); return (<About {...props} {...otherProps} />); } },
	{ mapping: { ...routes[3] }, render: (props?: any): JSX.Element => { Docs.preload(); return (<Docs {...props} {...otherProps} />); } },
	{ mapping: { ...routes[4] }, render: (props?: any): JSX.Element => { Admin.preload(); return (<Admin {...props} {...otherProps} />); } },
	{ mapping: { ...routes[5] }, render: (props?: any): JSX.Element => { Lost.preload(); return (<Lost {...props} {...otherProps} />); } }
];