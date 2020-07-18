

import React from 'react';
import PropType from 'prop-types';

export default (props) => {
	return <DefaultLayout {...props} />;
};

const DefaultLayout = (props) => {
	const options = {
		context: props.context,
		enableSW: props.enableSW,
		watchConnection: props.watchConnection,
		clientSideRendered: props.clientSideRendered
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
			<meta name="mobile-web-app-capable" content="yes" />
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

			<link rel="apple-touch-icon-precomposed" type="image/png" sizes="57x57" href="images/icons/touch-icon-64x64.png" defer />
			<link rel="apple-touch-startup-image" type="image/png" sizes="348x348" href="images/icons/touch-icon-348x348.png" defer />

			<link rel="stylesheet" crossOrigin="anonymous" href="styles/material.css" as="font" media="all" id="materialIcons" async disabled />
			<link rel="stylesheet" crossOrigin="anonymous" href="styles/roboto.css" as="font" media="all" id="robotoFonts" async disabled/>
			<link rel="preconnect" crossOrigin="anonymous" href="https://fonts.gstatic.com" />
			<link rel="preconnect" crossOrigin="anonymous" href="https://fonts.googleapis.com" />
			{/* <!-- Manifest.json  --> */}
			<link rel="manifest" href="/manifest.json" />
			<style id="serverCSS" dangerouslySetInnerHTML={{ __html: props.css.cssText }}/>
			<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
		</head>
		<body >
			<section id="content">{props.content}</section>
			<script dangerouslySetInnerHTML={{
				__html:
			`
			window.__RENDER_OPTIONS__=${JSON.stringify(options).replace(/</g, '\\u003c')};
			window.__PRELOADED_STATE__= ${JSON.stringify(props.state).replace(/</g, '\\u003c')};

			window.addEventListener("load", () => {
				document.getElementById("robotoFonts")?.removeAttribute("disabled");
				document.getElementById("materialIcons")?.removeAttribute("disabled");
			});			
			`
			}} />
			<script id="__LOADABLE_REQUIRED_CHUNKS__" type='text/javascript'>[]</script>
			<script async crossOrigin="anonymous" rel="preconnect" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
			{props.scripts.map((x, i) => <script async data-chunk="app" type='text/javascript' key={i} src={x.url} />)}
		</body>
	</html>;
};

DefaultLayout.propTypes = {
	cache: PropType.any,
	favicon: PropType.any,
	clientSideRendered: PropType.bool,
	watchConnection: PropType.bool,
	scripts: PropType.arrayOf(PropType.any),
	styles: PropType.arrayOf(PropType.any),
	enableSW: PropType.bool,
	content: PropType.any,
	context: PropType.any,
	state: PropType.any,
	html: PropType.any,
	css: PropType.any
};