const config = Object.freeze({
  app: {
    NAME: 'React app'
  },
  layout: {
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