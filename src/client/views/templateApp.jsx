
import React, { Fragment } from 'react';
import PropType from 'prop-types';

export default (props) => {
	if (props.csr == true) {
		return <Fragment></Fragment>;
	} else {
		return <DefaultLayout {...props} />;
	}
};

const DefaultLayout = (props) => {
	return <html lang='en-US'>
		<head>
			<title>{props.title}</title>
			<script async src='static/scripts/vendor/vendor.chunk.js' />
			<script async src='static/scripts/bundle.js' />
			<meta charSet='utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='theme-color' content='#23282d' />
			<meta name='description' content='Template Web site generated the server api routing' />
			<meta name='apple-mobile-web-app-capable' content='yes' />
			<meta name='apple-mobile-web-app-status-bar-style' content='black' />
			<meta name='apple-mobile-web-app-title' content={props.title} />
			<link rel='manifest' href='/manifest.json' />
			<link rel='icon' type='image/png' href='static/images/favicon.ico' />
			<link rel='apple-touch-icon' type='image/png' href='static/images/favicon.ico' />
			<link rel='shortcut icon' type='image/png' href='static/images/favicon.ico' />
			<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons&display=swap' media="all" id='materialIcons' async disabled />
			<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto&display=optional' media="all" id='robotoFont' async disabled />
			<style defer id='shellStyle'>{props.css}</style>
		</head>
		<body >
			<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
			<section id='content'>{props.content}</section>
			<script rel="preconnect" src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' async />
			<script dangerouslySetInnerHTML={{
				__html:
					`
			window.__REDUX_STATE__= ${JSON.stringify(props.state).replace(/</g, '\\u003c')};

			window.onload = function()
			{
				document.getElementById('robotoFont').removeAttribute('disabled');
				document.getElementById('materialIcons').removeAttribute('disabled');
			}

			${props.enableSW ? `
			
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', function() {
				  navigator.serviceWorker.register('service-worker.js').then(function(registration) {
					 console.log('ServiceWorker registration successful with scope: ', registration.scope);
				    //registration.pushManager.subscribe({userVisibleOnly: true});
				  }, function(err) {
					 console.log('ServiceWorker registration failed: ', err);
				  }).catch(error => console.log(error));
				});
			 }
			`: ''}
			
			`
			}} />
			{/* <script type='text/javascript' src='static/scripts/vendor/vendor-main-react-redux.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-index.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-babel.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-isomorphic-style-loader.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-browser.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-prop-types.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-webpack.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-api.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-history.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-hoist-non-react-statics.cjs.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-jquery.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-react-dom.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-react-is.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-react-router-dom.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-react-router.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-react.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-redux.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-resolve-pathname.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-scheduler.chunk.js' />
			<script type='text/javascript' src='static/scripts/vendor/vendor-main-symbol-observable.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-tiny-invariant.esm.js.chunk.js' />
			<script type='text/javascript' src='static/scripts/common/commons-main-value-equal.js.chunk.js' /> */}
		
		</body>
	</html>;
};

DefaultLayout.propTypes = {
	cache: PropType.any,
	enableSW: PropType.bool,
	content: PropType.any,
	title: PropType.string,
	state: PropType.any,
	css: PropType.any
};