require('dotenv').config();

const vault = Object.freeze({
  application: {
    FILE_DIRECTORY: '../node-template-server/src/'
  },
  self: {
    headers: {
      AUTHORIZATION: 'authorization',
      TOKEN_HEADER: 'x-auth-token',
    }
  },
  host: {
    APP_NAME: 'app name',
    BASE_URL: '',
    PORT: process.env.PORT || 5000,
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
  databse: {
    DB_PREPEND: 'mongodb+srv://',
    DB_URI_PATH: process.env.DB_URI_PATH,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
  api: {
    someapi: {
      baseUrl: function (endpoint: string) {
        return `/${endpoint}`
      },
      auth: {
        PREFIX: 'Basic ',
        TOKEN: process.env.API_TOKEN,
        USER_NAME: process.env.API_USERNAME,
        PASSWORD: process.env.API_PASSWORD
      },
    },
  },
  roles: {
    CODES: [
      'kYtm5dTddhQWGpB2WqqQMNCeqdwf5m7g',
      'GHJNGFTfD7VtFwrg43ek3ERaJKQX3tTr',
      'rAvyvtD8VjVZJmYWnvhd2NdrCHS58S6K',
      'Mfgkn5QyP55u57a5NjMswSAWkQmVeNC7',
      'RfZ7rtFQJef4FcaKuVmKKNdTtf5vX3Uh'
    ]
  },
  priviledges: {
    CODES: [
      '4BbJ3kVmUdFHhJST',
      'NZy3pHHmWDukNT3H',
      'jstmYaN7HhUsR6pE',
      'tAM28j4C7YCnka2z'
    ]
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
    },
  },
  jwt: {
    PREFIX: 'Bearer ',
    TOKEN_SECRET: process.env.JWT_SECRET || '',
    EXPIRATION_TIME: '600d',
  },
  encryption: {
    SALT_ITERATIONS: 12
  },
  admin: {
    ADMIN_NAME: 'admin',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  agenda: {
    PRIORITY: 'high',
    CONCURRENCY: 10
  },
  webjobs: {
    RUN_IMMIDIATELY: false
  }
});

export default vault;