

import React from 'react';
import PropType from 'prop-types';

export default (props) => {
	return <DefaultLayout {...props} />;
};

const DefaultLayout = (props) => {
	const options = {
		enableSW: props.enableSW,
		watchConnection: props.watchConnection
	};
	return <html lang="en-US">
		<head>
			<title>{props.html.title}</title>

			<meta charSet="utf-8" />
			<meta name="author" content={props.html.author} />
			<meta name="copyright" content={props.html.copyright} />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			<meta name="keywords" content={props.html.keywords} />
			<meta name="description" content={props.html.description} />
			<meta name="application-name" content={props.html.title} />

			{/*!-- Android  --> */}
			<meta name="theme-color" content={props.html.themeColor} />

			{/* <!-- Apple IOS --> */}
			<meta name="apple-mobile-web-app-title" content={props.html.title} />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content={props.html.apple.statusBarStyle} />

			{/* <!-- Windows  --> */}
			<meta name="msapplication-navbutton-color" content={props.html.windows.navButtonColor} />
			<meta name="msapplication-TileColor" content={props.html.windows.tileColor} />
			<meta name="msapplication-TileImage" content={props.html.windows.tileImage} defer />
			<meta name="msapplication-config" content={props.html.windows.confi} />
			<meta name="msapplication-tooltip" content={props.html.windows.tooltip} />
			<meta name="msapplication-starturl" content={props.html.startupUrl} />
			<meta name="msapplication-tap-highlight" content="no" />

			{/* <!-- UC Mobile Browser  --> */}
			<meta name="full-screen" content={props.html.fullscreen} />

			{/* <!-- Disable night mode for this page  --> */}
			<meta name="nightmode" content={props.html.nightMode} />

			{/* <!-- Layout mode --> */}
			<meta name="layoutmode" content={props.html.layoutMode} />

			{/* <!-- Orientation  --> */}
			<meta name="screen-orientation" content={props.html.screenOrientaion} />

			{/* <!-- Twitter social card  --> */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:image" content="images/icons/touch-icon-512x512.png" defer />

			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

			{/* <!-- Pinned Tab  --> */}
			<link rel="mask-icon" href={props.favicon} size="any" color="#23282d" defer />

			{/* <!-- Others --> */}
			<link rel="shortcut icon" type="image/x-icon" href="images/icons/touch-icon-120x120.png" defer />
			<link rel="shortcut icon" type="image/png" href="images/icons/touch-icon-120x120.png" defer />

			{/* <!-- Apple touch icons  --> */}
			<link rel="apple-touch-icon" type="image/png" href={props.favicon} defer />
			<link rel="apple-touch-icon" type="image/png" sizes="64x64" href="images/icons/touch-icon-64x64.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="72x72" href="images/icons/touch-icon-72x72.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="76x76" href="images/icons/touch-icon-76x76.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="120x120" href="images/icons/touch-icon-120x120.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="128x128" href="images/icons/touch-icon-128x128.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="144x144" href="images/icons/touch-icon-144x144.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="152x152" href="images/icons/touch-icon-152x152.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="192x192" href="images/icons/touch-icon-192x192.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="256x256" href="images/icons/touch-icon-256x256.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="348x348" href="images/icons/touch-icon-348x348.png" defer />
			<link rel="apple-touch-icon" type="image/png" sizes="512x512" href="images/icons/touch-icon-512x512.png" defer />

			<link rel="apple-touch-icon-precomposed" type="image/png" sizes="57x57" href="images/icon-57x57.png" defer />
			<link rel="apple-touch-startup-image" type="image/png" href="images/icons/touch-icon-348x348.png" defer />

			<link rel="stylesheet" href="styles/material.css" media="all" id="materialIcons" async disabled />
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=optional" media="all" id="robotoFont" defer disabled />

			{/* <!-- Manifest.json  --> */}
			<link rel="manifest" href="/manifest.json" />

			<style async id="shellStyle">{props.css}</style>
		</head>
		<body >
			<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
			<section id="content">{props.content}</section>
			<script async rel="preconnect" src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.9/pwacompat.min.js" integrity="sha384-VcI6S+HIsE80FVM1jgbd6WDFhzKYA0PecD/LcIyMQpT4fMJdijBh0I7Iblaacawc" crossOrigin="anonymous" />
			<script defer rel="preconnect" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
			<script id="__LOADABLE_REQUIRED_CHUNKS__" type="application/json">[]</script>
			{props.entryPoints.map((x, i) => <script async data-chunk="main" type='text/javascript' key={i} src={x.url} />)}
			<script dangerouslySetInnerHTML={{
				__html:
					`
			window.__RENDER_OPTIONS__=${JSON.stringify(options).replace(/</g, '\\u003c')};
			window.__REDUX_STATE__= ${JSON.stringify(props.state).replace(/</g, '\\u003c')};

			window.addEventListener("load", () => {
				document.getElementById("robotoFont").removeAttribute("disabled");
				document.getElementById("materialIcons").removeAttribute("disabled");
			});			
			`
			}} />
		</body>
	</html>;
};

DefaultLayout.propTypes = {
	cache: PropType.any,
	favicon: PropType.any,
	watchConnection: PropType.bool,
	entryPoints: PropType.arrayOf(PropType.any),
	enableSW: PropType.bool,
	content: PropType.any,
	state: PropType.any,
	html: PropType.any,
	css: PropType.any
};