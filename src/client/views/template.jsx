
import React from 'react';
import PropType from 'prop-types';
import FavIcon from '../resources/images/icons/icon-152x152.png';
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
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black" />
					<meta name="apple-mobile-web-app-title" content={this.props.title} />
					<link rel='manifest' href='/manifest.json' />
					<link rel="icon" type='image/png' href={FavIcon} />
					<link rel='apple-touch-icon' type='image/png' href={FavIcon} />
					<link rel='shortcut icon' type='image/png' href={FavIcon} />
					<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons&display=swap' media="all" id='materialIcons' defer async />
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=optional' media="all" id='robotoFont' defer async />
					<style type='text/css'>{[...this.props.css].join('')}</style>
					<title>{this.props.title}</title>
				</head>
				<body >
					<section id='content'>{this.props.content}</section>
					<script rel="preconnect" src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' defer async />
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
								//  registration.pushManager.subscribe({userVisibleOnly: true});
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
					<script type='text/javascript' src='/vendor/vendor.js' />
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