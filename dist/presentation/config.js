"use strict";
const vault = {
    directories: {
        images: (file) => `presentation/resources/images/${file}`
    },
    httpMethods: {
        GET: 'get',
        PUT: 'put',
        POST: 'post',
        PATCH: 'patch',
        DELETE: 'delete',
    }
};
module.exports = vault;
