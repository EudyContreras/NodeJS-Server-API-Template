

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
			{props.entryPoints.map((x, i) => <script key={i} async src={x} />)}
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='theme-color' content='#23282d' />
			<meta name='description' content='Template Web site generated the server api routing' />
			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta name='apple-mobile-web-app-status-bar-style' content='black' />
			<meta name='apple-mobile-web-app-title' content={props.title} />
			
			{
			/* <meta name="msapplication-square310x310logo" content="icon_largetile.png"></meta>
			<meta name='msapplication-square70x70logo' content='icon_smalltile.png' />
			<meta name='msapplication-square150x150logo' content='icon_mediumtile.png' />
			<meta name='msapplication-wide310x150logo' content='icon_widetile.png' />
			<meta name='apple-mobile-web-app-status-bar-style' content='black' />
			<link rel='apple-touch-startup-image' href='icon.png' /> */
			}
			
			<link rel='manifest' href='/manifest.json' />
			<link rel='icon' type='image/png' href='static/images/favicon.ico' />
			<link rel='apple-touch-icon' type='image/png' href='static/images/favicon.ico' />
			<link rel='shortcut icon' type='image/png' href='static/images/favicon.ico' />
			<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons&display=swap' media='all' id='materialIcons' async disabled />
			<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=optional' media='all' id='robotoFont' defer disabled />
			<style defer id='shellStyle'>{props.css}</style>
		</head>
		<body >
			<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
			<section id='content'>{props.content}</section>
			<script rel='preconnect' src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' defer />
			<script async src='static/scripts/loader.js' />
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
	entryPoints: PropType.arrayOf(PropType.string),
	enableSW: PropType.bool,
	content: PropType.any,
	title: PropType.string,
	state: PropType.any,
	css: PropType.any
};