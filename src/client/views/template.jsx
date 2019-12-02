
import React from 'react';
import PropType from 'prop-types';
import FavIcon from '../resources/images/favicon.png';
import ReactDOMServer from 'react-dom/server';

export default (args = {}) => {
	const layout = ReactDOMServer.renderToString(<DefaultLayout {...args} />);
	return `<!doctype html>${layout}`;
};

class DefaultLayout extends React.PureComponent {
	render = () => {
		return (
			<html lang='en-US'>
				<head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='theme-color' content='#000000' />
					<meta name='description' content='Template Web site generated the server api routing' />
					<link rel='manifest' href='/manifest.json' />
					<link rel="icon" type='image/png' href={FavIcon} />
					<link rel='apple-touch-icon' type='image/png' href={FavIcon} />
					<link rel='shortcut icon' type='image/png' href={FavIcon} />
					<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons&display=swap' media="all" id='materialIcons' async disabled />
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=swap' media="all" id='robotoFont' async disabled />
					<title>{this.props.title}</title>
					<style>${[...this.props.css].join('')}</style>
				</head>
				<body >
					<section id='content'>{this.props.content}</section>
					<script rel="preconnect" src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' async defer />
					<script dangerouslySetInnerHTML={{
						__html:
						`
						window.__REDUX_STATE__= ${JSON.stringify(this.props.state).replace(/</g, '\\u003c')};

						window.onload = function()
						{
							document.getElementById('robotoFont').removeAttribute('disabled');
							document.getElementById('materialIcons').removeAttribute('disabled');
						}

						${this.props.enableSW ? `
						
						if ('serviceWorker' in navigator) {
							window.addEventListener('load', function() {
							  navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
								 console.log('ServiceWorker registration successful with scope: ', registration.scope);
							  }, function(err) {
								 console.log('ServiceWorker registration failed: ', err);
							  }).catch(error => console.log(error));
							});
						 }
						`: ''
						}
						
						`
					}} />
					
					<script type='text/javascript' src='/scripts/loader.js' />
					<script type='text/javascript' src='/main.js' />
				</body>
			</html>
		);
	};
}

DefaultLayout.propTypes = {
	enableSW: PropType.bool,
	content: PropType.any,
	title: PropType.string,
	state: PropType.any,
	css: PropType.object
};