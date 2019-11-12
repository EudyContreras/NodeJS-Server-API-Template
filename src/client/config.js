const config = {
  directories: {
    images: (file) => `client/resources/images/${file}`
  },
  httpMethods: {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    PATCH: 'patch',
    DELETE: 'delete',
  }
}

module.exports = config;