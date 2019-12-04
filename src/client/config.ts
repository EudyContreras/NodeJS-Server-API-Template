require('dotenv').config();

const config = Object.freeze({
	app: {
		CSR: process.env.CLIENT_ONLY,
		TITLE: 'React App',
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