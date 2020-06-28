

import React from 'react';
import PropType from 'prop-types';

export default (props) => {
	return <DefaultLayout {...props} />;
};

const DefaultLayout = (props) => {
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

			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />


			{/* <!-- Pinned Tab  --> */}
			<link rel="mask-icon" href={props.favicon} size="any" color="#23282d" defer />
		</head>
		<body >
			<noscript>You need to enable JavaScript to fully be able to use this this web-app.</noscript>
			{/* <section id="content">{renderToString(appLight(props.url))}</section>*/}
			<section id="content">
				<h1>Welcome to Reach Template Engine</h1>
			</section>
		</body>
	</html>;
};

DefaultLayout.propTypes = {
	favicon: PropType.any,
	html: PropType.any,
	url: PropType.string
};