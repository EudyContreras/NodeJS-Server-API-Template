

import React, { Fragment } from 'react';
import PropType from 'prop-types';
import manifest from '../../../build/public/manifest-assets.json';

export default (props) => {
	const entryPoints = manifest.entryPoints;

	const inProps = {
		...props,
		entryPoints: entryPoints
	};

	if (props.csr == true) {
		return <Fragment></Fragment>;
	} else {
		return <DefaultLayout {...inProps} />;
	}
};

const DefaultLayout = (props) => {
	return <html lang='en-US'>
		<head>
			<title>{props.title}</title>
			<meta charSet='utf-8' />

			<meta name='author' content='Eudy Contreras' />
			<meta name='copyright' content='Eudy Contreras' />
			<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
			<meta name='keywords' content='template engine, react-engine, pwa-isomorphic-react, pwa, isomorphic-react, universal-react' />
			<meta name='theme-color' content='#23282d' />
			<meta name='description' content='Template Web site generated the server api routing' />
			<meta name='application-name' content={props.title} />

			<link rel='manifest' href='/manifest.json' />
			<link rel='apple-touch-icon' type='image/png' href={props.favicon} />
			<link rel='shortcut icon' type='image/png' href={props.favicon} />

			<meta name='mobile-web-app-capable' content='yes' />
			<meta name='msapplication-navbutton-color' content='#FF9800' />
			<meta name='msapplication-starturl' content='/' />

			<meta name='apple-mobile-web-app-title' content={props.title} />
			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta name='apple-mobile-web-app-status-bar-style' content='black' />
			
			<link rel='icon' type='image/png' href={props.favicon} />

			<link rel='icon' sizes='128x128' href='/static/images/icons/icon-128x128.png' />
			<link rel='apple-touch-icon' sizes='128x128' href='/static/images/iconsicon-128x128.png' />

			<link rel='icon' sizes='192x192' href='/static/images/icons/icon-192x192.png' />
			<link rel='apple-touch-icon' sizes='192x192' href='/static/images/icons/icon-192x192.png' />

			<link rel='icon' sizes='256x256' href='/static/images/icons/icon-256x256.png' />
			<link rel='apple-touch-icon' sizes='256x256' href='/static/images/icons/icon-256x256.png' />

			<link rel='icon' sizes='384x384' href='/static/images/icons/icon-384x384.png' />
			<link rel='apple-touch-icon' sizes='384x384' href='/static/images/icons/icon-384x384.png' />

			<link rel='icon' sizes='512x512' href='/static/images/icons/icon-512x512.png' />
			<link rel='apple-touch-icon' sizes='512x512' href='/static/images/icons/icon-512x512.png' />
			
			<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons&display=swap' media='all' id='materialIcons' async disabled />
			<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=optional' media='all' id='robotoFont' defer disabled />
			
			<style async id='shellStyle'>{props.css}</style>
		</head>
		<body >
			<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
			<section id='content'>{props.content}</section>
			<script defer rel='preconnect' src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' />
			{props.entryPoints.map((x, i) => <script key={i} async src={x} />)}
			<script dangerouslySetInnerHTML={{
				__html:
					`
			window.__REDUX_STATE__= ${JSON.stringify(props.state).replace(/</g, '\\u003c')};

			window.addEventListener('load', () => {
				document.getElementById('robotoFont').removeAttribute('disabled');
				document.getElementById('materialIcons').removeAttribute('disabled');
			});			
			`
			}} />
		</body>
	</html>;
};

DefaultLayout.propTypes = {
	cache: PropType.any,
	favicon: PropType.string,
	entryPoints: PropType.arrayOf(PropType.string),
	enableSW: PropType.bool,
	content: PropType.any,
	title: PropType.string,
	state: PropType.any,
	css: PropType.any
};