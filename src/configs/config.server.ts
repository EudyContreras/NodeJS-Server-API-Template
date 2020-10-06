/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const config = Object.freeze({
	application: {
		FILE_DIRECTORY: '../build'
	},
	enviroment: {
		PRODUCTION: process.env.NODE_ENV === 'production'
	},
	presentation: {
		path: 'client',
		HAS_REACT_HMR: process.env.REACT_HMR === 'true',
		IS_SSR: process.env.CSR === 'false',
		viewEngine: {
			type: 'jsx',
			alias: 'views',
			label: 'view engine',
			path: 'src/client/views',
			client: {
				path: 'build/public',
				alias: '/'
			}
		}
	},
	resources: {
		cachePolicy: {
			LABEL: 'Cache-Control',
			VALUE: 'must-revalidate, public, max-age=31536000'
		},
		ignored: ['/favicon.ico']
	},
	compression: {
		index: false,
		enableBrotli: true,
		customCompressions: [
			{
				encodingName: 'deflate',
				fileExtension: 'zz'
			}
		],
		serveStatic: {
			maxAge: 234,
			cacheControl: false
		},
		orderPreference: ['br']
	},
	self: {
		headers: {
			AUTHORIZATION: 'authorization',
			TOKEN_HEADER: 'x-auth-token'
		}
	},
	ssl: {
		key: process.env.SSL_KEY_FILE || './ssl/localhost.key',
		cert: process.env.SSL_CERT_FILE || './ssl/localhost.crt',
		ACTIVE: process.env.USE_SSL === 'true',
		PASS_PHRASE: process.env.PASS_PHRASE
	},
	host: {
		APP_NAME: 'React Template Engine',
		BASE_URL: '',
		PORT: process.env.PORT,
		PORT_HTTPS: process.env.PORT_HTTPS,
		REDIRECT_TO_HTTPS: false,
		SECURE_MAX_AGE: 31536000,
		secureTransport: {
			maxAge: 31536000,
			includeSubDomains: true,
			preload: true
		}
	},
	redis: {
		HOST: 'localhost',
		PORT: '6379',
		KEY_PREFIX: 'eudcon-template-server.'
	},
	smtpService: {
		EMAIL: null,
		HOST: 'smtp.ethereal.email',
		PORT: 465
	},
	database: {
		DB_PREPEND: 'mongodb+srv://',
		DB_URI_PATH: process.env.DB_URI_PATH,
		DB_USERNAME: process.env.DB_USERNAME,
		DB_PASSWORD: process.env.DB_PASSWORD
	},
	api: {
		someapi: {
			baseUrl: (endpoint: string): string => `/${endpoint}`,
			auth: {
				PREFIX: 'Basic ',
				TOKEN: process.env.API_TOKEN,
				USER_NAME: process.env.API_USERNAME,
				PASSWORD: process.env.API_PASSWORD
			}
		}
	},
	roles: {
		CLEARANCE: {
			ROOT: 10,
			VERY_HIGH: 5,
			HIGH: 4,
			NORMAL: 3,
			LOW: 2,
			VERY_LOW: 1,
			NONE: 0
		},
		CODES: [
			'kYtm5dTddhQWGpB2WqqQMNCeqdwf5m7g',
			'GHJNGFTfD7VtFwrg43ek3ERaJKQX3tTr',
			'rAvyvtD8VjVZJmYWnvhd2NdrCHS58S6K',
			'Mfgkn5QyP55u57a5NjMswSAWkQmVeNC7',
			'RfZ7rtFQJef4FcaKuVmKKNdTtf5vX3Uh'
		]
	},
	priviledges: {
		CODES: ['4BbJ3kVmUdFHhJST', 'NZy3pHHmWDukNT3H', 'jstmYaN7HhUsR6pE', 'tAM28j4C7YCnka2z']
	},
	validation: {
		emails: {
			REGEX: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
			MIN_LENGTH: 4,
			MAX_LEGHTH: 255,
			NAME_LENGTH: 64,
			DOMAIN_LENGTH: 63
		},
		passwords: {
			MIN_LENGTH: 6,
			MAX_LEGHTH: 32,
			ALPHA_NUMERIC: true
		}
	},
	jwt: {
		PREFIX: 'Bearer ',
		TOKEN_SECRET: process.env.JWT_SECRET || '',
		EXPIRATION_TIME: '600d'
	},
	encryption: {
		SALT_ITERATIONS: 12
	},
	admin: {
		ADMIN_NAME: 'admin',
		ADMIN_USERNAME: process.env.ADMIN_USERNAME,
		ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
	},
	agenda: {
		PRIORITY: 'high',
		CONCURRENCY: 10
	},
	webjobs: {
		RUN_IMMIDIATELY: false
	}
});

export default config;
