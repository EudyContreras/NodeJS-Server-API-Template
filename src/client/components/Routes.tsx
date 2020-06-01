import React from 'react';
import loadable from 'react-loadable-visibility/loadable-components';

import Loading from './shared/states/LoadingState';
import Home from './sections/documentation/DocsPage';

const Docs = loadable(
	() => import('./sections/documentation/DocsPage'), 
	{ 
		ssr: true,
		fallback: <Loading />
	}
);
const About = loadable(
	() => import('./sections/information/AboutPage'),
	{ 
		ssr: true,
		fallback: <Loading />
	}
);
const Admin = loadable(
	() => import('./sections/administration/AdminPage'), 
	{ 
		ssr: true,
		fallback: <Loading />
	}
);
const Lost = loadable(
	() => import('./shared/states/LostState'), 
	{ 
		ssr: true,
		fallback: <Loading />
	}
);

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
	{ ...routes[0], render: (props: any): JSX.Element => <Home {...props} {...otherProps} /> },
	{ ...routes[1], render: (props: any): JSX.Element => <Docs {...props} {...otherProps} /> },
	{ ...routes[2], render: (props: any): JSX.Element => <About {...props} {...otherProps} /> },
	{ ...routes[3], render: (props: any): JSX.Element => <Docs {...props} {...otherProps} /> },
	{ ...routes[4], render: (props: any): JSX.Element => <Admin {...props} {...otherProps} /> },
	{ ...routes[5], render: (props: any): JSX.Element => <Lost {...props} {...otherProps} /> }
];