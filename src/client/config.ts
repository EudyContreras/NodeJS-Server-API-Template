
const config = Object.freeze({
	app: {
		CSR: false,
		USE_SW: true,
		TITLE: 'React App',
		APP_LAYOUT: 'templateApp',
		SHELL_LAYOUT: 'templateShell',
		NAME: ''
	},
	header: {
		LABEL: 'Set-Cookie',
		VALUE: 'promo_shown=1; SameSite=Strict;'
	},
	layout: {
		CONTENT_TYPE: 'html',
		TEMPLATE: 'template'
	},
	directories: {
		images: (file: string): string => `src/client/resources/images/${file}`
	},
	httpMethods: {
		GET: 'get',
		PUT: 'put',
		POST: 'post',
		PATCH: 'patch',
		DELETE: 'delete',
	}
});

export default config;