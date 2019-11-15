
const config = Object.freeze({
  app: {
    CSR: process.env.CLIENT_ONLY,
    NAME: 'React app'
  },
  header: {
    LABEL: 'Set-Cookie',
    VALUE: 'HttpOnly;Secure;SameSite=Strict'
  },
  layout: {
    CONTENT_TYPE: 'html',
    TEMPLATE: 'default'
  },
  directories: {
    images: (file: string) => `client/resources/images/${file}`
  },
  httpMethods: {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    PATCH: 'patch',
    DELETE: 'delete',
  }
})

export default config;