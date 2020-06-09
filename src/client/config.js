
const config = Object.freeze({
	app: {
		CSR: process.env.CSR == 'true',
		USE_SW: process.env.USE_SW == 'true',
		APP_LAYOUT: 'templateApp',
		SHELL_LAYOUT: 'templateShell'
	},
	html: {
		title: 'Template Engine',
		author: 'Eudy Contreras',
		copyright: 'Property of Eudy Contreras © 2020',
		nightMode: 'disable',
		fullscreen: 'yes',
		startupUrl: '/',
		layoutMode: 'fitscreen/standard',
		screenOrientation: 'portrait',
		keywords: ['template engine', 'react-engine', 'pwa-isomorphic-react', 'pwa', 'isomorphic-react', 'universal-react'].join(', '),
		description: 'Template Web site generated the server api routing',
		themeColor: '#23282d',
		apple: {
			statusBarStyle: 'default'
		},
		windows: {
			navButtonColor: '#23282d',
			tileColor: '#23282d',
			tileImage: 'images/icons/touch-icon-144x144.png',
			tooltip: 'Tooltip Text',
			config: 'none'
		}
	},
	headers: [
		{
			LABEL: 'Set-Cookie',
			VALUE: 'promo_shown=1; SameSite=Strict;'
		},
		{
			LABEL: 'Cache-Control',
			VALUE: 'max-age=600'
		}
	],
	layout: {
		CONTENT_TYPE: 'html',
		TEMPLATE: 'template'
	},
	httpMethods: {
		GET: 'get',
		PUT: 'put',
		POST: 'post',
		PATCH: 'patch',
		DELETE: 'delete'
	}
});

module.exports = config;