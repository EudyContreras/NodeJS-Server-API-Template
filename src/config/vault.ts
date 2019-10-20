require('dotenv').config();

const vault = Object.freeze({
  host: {
    BASE_URL: '',
    PORT: process.env.PORT || 5000,
  },
  redis: {
    HOST: 'localhost',
    PORT: '6379',
    KEY_PREFIX: 'eudcon-template-server.'
  },
  databse: {
    DB_URI_PATH: process.env.DB_URI_PATH,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
  api: {
    someapi: {
      baseUrl: function(endpoint: string) {
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
      'asdfuhadfnzx6a42brq40qnf0q84tnm9',
      'asdfuhadfnzx6a42brq40qnf0q84tnm9',
      'asdfuhadfnzx6a42brq40qnf0q84tnm9'
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
    TOKEN_SECRET: process.env.JWT_SECRET,
    EXPIRATION_TIME: '2h',
  },
  encryption: {
    SALT_ITERATIONS: 12
  },
  agenda: {
     PRIORITY: 'high', 
     CONCURRENCY: 10
  }
});

export default vault;