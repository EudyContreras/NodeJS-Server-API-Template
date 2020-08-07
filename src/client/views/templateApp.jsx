import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

export default (props) => <DefaultLayout {...props} />;

export const DefaultLayout = (props) => {
	const options = {
		context: props.context,
		enableSW: props.enableSW,
		watchConnection: props.watchConnection,
		clientSideRendered: props.clientSideRendered
	};

	const fileType = props.webpSupport ? 'webp' : 'png';

	return (
		<html lang="en-US">
			<head>
				<title>{props.html.title}</title>

				<meta charSet="utf-8" />
				<meta name="author" content={props.html.author} />
				<meta name="copyright" content={props.html.copyright} />
				<meta name="viewport" content="width=device-width, minimum-scale=1 initial-scale=1" />
				<meta name="keywords" content={props.html.keywords} />
				<meta name="description" content={props.html.description} />
				<meta name="application-name" content={props.html.title} />

				{/* <!-- Android  --> */}
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="theme-color" content={props.html.themeColor} />

				{/* <!-- Apple IOS --> */}
				<meta name="apple-mobile-web-app-title" content={props.html.title} />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content={props.html.apple.statusBarStyle} />

				{/* <!-- Windows  --> */}
				<meta name="msapplication-navbutton-color" content={props.html.windows.navButtonColor} />
				<meta name="msapplication-TileColor" content={props.html.windows.tileColor} />
				<meta name="msapplication-TileImage" content={`${props.html.touchIconsPath}144x144.${fileType}`} defer />
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
				<meta name="twitter:image" content={`${props.html.touchIconsPath}512x512.${fileType}`} defer />

				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

				{/* <!-- Pinned Tab  --> */}
				<link rel="mask-icon" href={props.favicon} size="any" color="#23282d" defer />

				{/* <!-- Others --> */}
				<link rel="shortcut icon" sizes="120x120" type="image/x-icon" href={`${props.html.touchIconsPath}120x120.${fileType}`} defer />
				<link rel="shortcut icon" sizes="120x120" type="image/png" href={`${props.html.touchIconsPath}120x120.${fileType}`} defer />

				<link rel="apple-touch-startup-image" type="image/png" sizes="348x348" href={`${props.html.touchIconsPath}348x348.${fileType}`} defer />

				{/* <!-- Apple touch icons  --> */}
				{props.html.touchIcons.map((x, i) => (
					<link rel="apple-touch-icon" type="image/png" sizes={x} key={i} href={`${props.html.touchIconsPath}${x}.${fileType}`} defer />
				))}
				<link rel="stylesheet" crossOrigin="anonymous" href="styles/fonts.css" as="font" media="all" id="fonts" async defer />

				{props.html.preconnect.map((x, i) => (
					<link rel="preconnect" crossOrigin="anonymous" key={i} href={x} />
				))}
				{/* <!-- Manifest.json  --> */}
				<link rel="manifest" href={props.html.manifest} />

				{props.css.map((style) => (
					<style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />
				))}
				<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
				<script async crossOrigin="anonymous" rel="preconnect" src={props.html.jquery} />
			</head>
			<body>
				<section id="content">{props.content}</section>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							// document.getElementById("fonts").removeAttribute("disabled");
							window.__RENDER_OPTIONS__=${JSON.stringify(options).replace(/</g, '\\u003c')};
							window.__PRELOADED_STATE__= ${JSON.stringify(props.state).replace(/</g, '\\u003c')};
							
							window.addEventListener("load", () => {
								// document.getElementById("fonts").removeAttribute("disabled");
							});	
						`
					}}
				/>
				{parse(props.scripts)}
			</body>
		</html>
	);
};

DefaultLayout.propTypes = {
	cache: PropTypes.any,
	favicon: PropTypes.any,
	webpSupport: PropTypes.bool,
	clientSideRendered: PropTypes.bool,
	watchConnection: PropTypes.bool,
	scripts: PropTypes.string,
	styles: PropTypes.string,
	enableSW: PropTypes.bool,
	content: PropTypes.any,
	context: PropTypes.any,
	state: PropTypes.any,
	html: PropTypes.any,
	css: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			cssText: PropTypes.string.isRequired
		}).isRequired
	)
};
