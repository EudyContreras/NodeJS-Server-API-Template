import React from 'react';
import parse from 'html-react-parser';
import PropType from 'prop-types';

export default (props) => <DefaultLayout {...props} />;

const DefaultLayout = (props) => {
	const options = {
		context: props.context,
		enableSW: props.enableSW,
		watchConnection: props.watchConnection,
		clientSideRendered: props.clientSideRendered
	};

	return (
		<html amp lang="en-US">
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

				<link rel="canonical" href="/" />

				{/* <!-- Pinned Tab  --> */}
				<link rel="mask-icon" href={props.favicon} size="any" color="#23282d" defer />

				{/* <!-- Others --> */}
				<link rel="shortcut icon" type="image/x-icon" href="images/icons/touch-icon-120x120.png" defer />
				<link rel="shortcut icon" type="image/png" href="images/icons/touch-icon-120x120.png" defer />

				{/* <!-- Apple touch icons  --> */}
				{props.html.touchIcons.map((x, i) => (
					<link rel="apple-touch-icon" type="image/png" sizes={x} key={i} href={`images/icons/touch-icon-${x}.png`} defer />
				))}

				<link rel="apple-touch-startup-image" type="image/png" sizes="348x348" href="images/icons/touch-icon-348x348.png" defer />

				<link rel="stylesheet" crossOrigin="anonymous" href="styles/fonts.css" as="font" media="all" id="fonts" async disabled />

				{props.html.preconnect.map((x, i) => (
					<link rel="preconnect" crossOrigin="anonymous" key={i} href={x} />
				))}
				{/* <!-- Manifest.json  --> */}
				<link rel="manifest" href={props.html.manifest} />
				<style id="serverCSS" dangerouslySetInnerHTML={{ __html: props.css.cssText }} />
				<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
				<script async crossOrigin="anonymous" rel="preconnect" src={props.html.jquery} />
			</head>
			<body>
				<section id="content">{props.content}</section>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.__RENDER_OPTIONS__=${JSON.stringify(options).replace(/</g, '\\u003c')};
							window.__PRELOADED_STATE__= ${JSON.stringify(props.state).replace(/</g, '\\u003c')};
							
							window.addEventListener("load", () => {
								document.getElementById("fonts")?.removeAttribute("disabled");
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
