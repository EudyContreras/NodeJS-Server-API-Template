/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(27);
    var insertCss = __webpack_require__(15);
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) { var removeCss; }
  

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/withStyles");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/StyleContext");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */



var inserted = {};

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode("0x" + p1);
  }));
}

function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(id);

      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

function insertCss(styles, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$replace = _ref.replace,
      replace = _ref$replace === void 0 ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === void 0 ? false : _ref$prepend,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;

  var ids = [];

  for (var i = 0; i < styles.length; i++) {
    var _styles$i = styles[i],
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];
    var id = "" + prefix + moduleId + "-" + i;
    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;
    var elem = document.getElementById(id);
    var create = false;

    if (!elem) {
      create = true;
      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;

    if (sourceMap && typeof btoa === 'function') {
      cssText += "\n/*# sourceMappingURL=data:application/json;base64," + b64EncodeUnicode(JSON.stringify(sourceMap)) + "*/";
      cssText += "\n/*# sourceURL=" + sourceMap.file + "?" + id + "*/";
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;
//# sourceMappingURL=insertCss.js.map


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "525937d7f5756a5665faca0892fba6a1.png";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(28);
    var insertCss = __webpack_require__(15);
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) { var removeCss; }
  

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
module.exports = __webpack_require__(29);


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("express-react-views");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(true);
// Module
exports.push([module.i, ".nav{-webkit-box-shadow:0 2px 4px 2px rgba(0,0,0,0.4);-moz-box-shadow:0 2px 4px 2px rgba(0,0,0,0.4);box-shadow:0 2px 4px 2px rgba(0,0,0,0.4);align-items:center;background-color:#272b2e;padding:1em 2em;cursor:pointer;position:absolute;color:#eee;display:flex;height:50px;top:0;left:0;right:0;z-index:2000}.nav-padder{position:static;padding:1em 2em;height:50px}.logo{display:inline-flex;text-align:center}.logo-image{width:40px;height:40px;margin-right:1em}.logo-text{margin:auto;font-size:1.2em;display:inline;font-weight:bold}.logo-text a{text-decoration:none;color:#eee}.nav ul{margin-left:auto;list-style:none;float:right;font-size:0.8em;text-transform:uppercase}.nav ul li{display:inline;padding:0 20px;letter-spacing:1px}.nav ul li a{text-decoration:none;color:#eee}.nav ul li a.active{color:#c08d1e}.nav ul li a:hover:not(.active){color:#c08d1e}\n", "",{"version":3,"sources":["stylings.scss"],"names":[],"mappings":"AAAA,KAAK,gDAAgD,CAAC,6CAA6C,CAAC,wCAAwC,CAAC,kBAAkB,CAAC,wBAAwB,CAAC,eAAe,CAAC,cAAc,CAAC,iBAAiB,CAAC,UAAU,CAAC,YAAY,CAAC,WAAW,CAAC,KAAK,CAAC,MAAM,CAAC,OAAO,CAAC,YAAY,CAAC,YAAY,eAAe,CAAC,eAAe,CAAC,WAAW,CAAC,MAAM,mBAAmB,CAAC,iBAAiB,CAAC,YAAY,UAAU,CAAC,WAAW,CAAC,gBAAgB,CAAC,WAAW,WAAW,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,aAAa,oBAAoB,CAAC,UAAU,CAAC,QAAQ,gBAAgB,CAAC,eAAe,CAAC,WAAW,CAAC,eAAe,CAAC,wBAAwB,CAAC,WAAW,cAAc,CAAC,cAAc,CAAC,kBAAkB,CAAC,aAAa,oBAAoB,CAAC,UAAU,CAAC,oBAAoB,aAAa,CAAC,gCAAgC,aAAa","file":"stylings.scss","sourcesContent":[".nav{-webkit-box-shadow:0 2px 4px 2px rgba(0,0,0,0.4);-moz-box-shadow:0 2px 4px 2px rgba(0,0,0,0.4);box-shadow:0 2px 4px 2px rgba(0,0,0,0.4);align-items:center;background-color:#272b2e;padding:1em 2em;cursor:pointer;position:absolute;color:#eee;display:flex;height:50px;top:0;left:0;right:0;z-index:2000}.nav-padder{position:static;padding:1em 2em;height:50px}.logo{display:inline-flex;text-align:center}.logo-image{width:40px;height:40px;margin-right:1em}.logo-text{margin:auto;font-size:1.2em;display:inline;font-weight:bold}.logo-text a{text-decoration:none;color:#eee}.nav ul{margin-left:auto;list-style:none;float:right;font-size:0.8em;text-transform:uppercase}.nav ul li{display:inline;padding:0 20px;letter-spacing:1px}.nav ul li a{text-decoration:none;color:#eee}.nav ul li a.active{color:#c08d1e}.nav ul li a:hover:not(.active){color:#c08d1e}\n"]}]);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(true);
// Module
exports.push([module.i, "body{margin:0;font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro, Menlo, Monaco, Consolas, \"Courier New\", monospace}\n", "",{"version":3,"sources":["app.css"],"names":[],"mappings":"AAAA,KAAK,QAAQ,CAAC,6JAA6J,CAAC,kCAAkC,CAAC,iCAAiC,CAAC,KAAK,8EAA8E","file":"app.css","sourcesContent":["body{margin:0;font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro, Menlo, Monaco, Consolas, \"Courier New\", monospace}\n"]}]);


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "cors"
var external_cors_ = __webpack_require__(16);
var external_cors_default = /*#__PURE__*/__webpack_require__.n(external_cors_);

// EXTERNAL MODULE: external "helmet"
var external_helmet_ = __webpack_require__(17);
var external_helmet_default = /*#__PURE__*/__webpack_require__.n(external_helmet_);

// EXTERNAL MODULE: external "express"
var external_express_ = __webpack_require__(2);
var external_express_default = /*#__PURE__*/__webpack_require__.n(external_express_);

// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(4);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);

// CONCATENATED MODULE: ./src/server/config.ts
__webpack_require__(25).config();

const config = Object.freeze({
  application: {
    FILE_DIRECTORY: '../node-template-server/dist/'
  },
  presentation: {
    path: 'client',
    viewEngine: {
      type: 'jsx',
      alias: 'views',
      label: 'view engine',
      path: 'src/client/views',
      client: {
        path: 'public',
        alias: '/static'
      },
      styles: {
        path: 'src/client/styles',
        alias: '/styles'
      },
      scripts: {
        path: 'src/client/scripts',
        alias: '/scripts'
      },
      resources: {
        path: 'src/client/resources',
        alias: '/res'
      }
    }
  },
  self: {
    headers: {
      AUTHORIZATION: 'authorization',
      TOKEN_HEADER: 'x-auth-token'
    }
  },
  host: {
    APP_NAME: 'app name',
    BASE_URL: '',
    PORT: process.env.PORT || 5000
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
      baseUrl: endpoint => {
        return `/${endpoint}`;
      },
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
    CODES: ['kYtm5dTddhQWGpB2WqqQMNCeqdwf5m7g', 'GHJNGFTfD7VtFwrg43ek3ERaJKQX3tTr', 'rAvyvtD8VjVZJmYWnvhd2NdrCHS58S6K', 'Mfgkn5QyP55u57a5NjMswSAWkQmVeNC7', 'RfZ7rtFQJef4FcaKuVmKKNdTtf5vX3Uh']
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
/* harmony default export */ var server_config = (config);
// EXTERNAL MODULE: external "compression"
var external_compression_ = __webpack_require__(18);
var external_compression_default = /*#__PURE__*/__webpack_require__.n(external_compression_);

// CONCATENATED MODULE: ./src/server/handlers/error.handler.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ErrorHandler {
  /**
   * Constructs an ErrorHandler with an error logger.
   * @param logger The logger used by this
   * error handler for logging handled errors.  
   */
  constructor(logger) {
    _defineProperty(this, "logger", void 0);

    this.logger = logger;
  }
  /**
   * Handles a produce error and logs information about 
   * the error.
   * @param error The error that was produced.
   * @param type The type of error to handle.
   */


  onError(error) {
    if (error instanceof Error) {
      this.logger.logError(error.message);
    } else {
      this.logger.logError(error);
    }
  }

}
// CONCATENATED MODULE: ./src/server/handlers/logging.handler.ts
class LoggingHandler {
  /**
   * Loggs information using an injected dependency.
   * @param info The information to be logged
   */
  logInfo(info) {
    console.log(info);
  }
  /**
   * Loggs debug information using an injected dependency.
   * @param info The debug information to be logged
   */


  logDebug(text) {
    console.debug(text);
  }
  /**
   * Loggs error using an injected dependency.
   * @param info The error to be logged
   */


  logError(error) {
    console.error(error);
  }

}
// CONCATENATED MODULE: ./src/server/entitymodel/entitySchema.ts



class entitySchema_EntitySchema extends external_mongoose_["Schema"] {
  constructor(definition, options) {
    super(definition, options);
  }

  getModel(name) {
    return external_mongoose_default.a.model(name, this);
  }

}

/* harmony default export */ var entitySchema = (entitySchema_EntitySchema);
// CONCATENATED MODULE: ./src/server/entitymodel/entities/user.entity.ts

const user_entity_schema = new entitySchema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roleCode: {
    type: String,
    required: true,
    default: null
  },
  active: {
    type: Boolean,
    required: false,
    default: true
  },
  lastLogin: {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
  strict: true,
  versionKey: false
});
const User = user_entity_schema.getModel('User');
/* harmony default export */ var user_entity = (User);
// CONCATENATED MODULE: ./src/server/utilities/date.utility.ts
/**
 * @description Gets a simple readable string for a specified date.
 * @param date 
 */
function normalize(date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}
/* harmony default export */ var date_utility = ({
  normalize
});
// CONCATENATED MODULE: ./src/server/repositories/user.repository.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function user_repository_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function dataTransferDocument(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    lastLogin: user.lastLogin,
    roleCode: user.roleCode,
    active: user.active,
    createdAt: date_utility.normalize(new Date(user.createdAt)),
    updatedAt: date_utility.normalize(new Date(user.updatedAt))
  };
}

function normalized(user) {
  return user;
}
/**
 * @description Data access layer Repository used
 * for interfacing with the user data.
 */


class user_repository_UserRepository {
  constructor() {
    user_repository_defineProperty(this, "exclude", void 0);

    user_repository_defineProperty(this, "options", void 0);

    this.exclude = null;
    this.options = {
      new: true,
      upsert: false,
      useFindAndModify: false,
      runValidators: true
    };
  }

  hasUser(userId) {
    return _asyncToGenerator(function* () {
      const count = yield user_entity.countDocuments({
        _id: userId
      }).exec();
      return count > 0;
    })();
  }

  hasUserWhere(query) {
    return _asyncToGenerator(function* () {
      const count = yield user_entity.countDocuments(query).exec();
      return count > 0;
    })();
  }

  getAllUsers(options = {
    dto: true
  }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const users = yield user_entity.find().select(_this.exclude).exec();

      if (options.dto === true) {
        return users.map(x => dataTransferDocument(x));
      }

      return users;
    })();
  }

  getAllUsersWhere(query, options = {
    dto: true
  }) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const users = yield user_entity.find(query).select(_this2.exclude).exec();

      if (options.dto === true) {
        return users.map(x => dataTransferDocument(x));
      }

      return users;
    })();
  }

  getUser(userId, options = {
    dto: true
  }) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const user = yield user_entity.findById(userId).select(_this3.exclude).exec();
      const result = user ? user : null;

      if (options.dto === true && result != null) {
        return dataTransferDocument(result);
      }

      return result;
    })();
  }

  getUserWhere(criteria, options = {
    dto: true
  }) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const user = yield user_entity.findOne(criteria).select(_this4.exclude).exec();
      const result = user ? user : null;

      if (options.dto === true && result != null) {
        return dataTransferDocument(result);
      }

      return result;
    })();
  }

  getFromUser(userId, select) {
    return _asyncToGenerator(function* () {
      const user = yield user_entity.findById(userId).select(select).exec();
      const result = user ? user : null;
      return result;
    })();
  }

  insertUser(data, options = {
    dto: true
  }) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const user = new user_entity(data);
      yield user.validate();
      const saved = yield user.save(_this5.options);
      const result = saved ? saved : null;

      if (options.dto === true && result != null) {
        return dataTransferDocument(result);
      }

      return result;
    })();
  }

  updateUser(userId, update, options = {
    dto: true
  }) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const user = yield user_entity.findByIdAndUpdate(userId, update, _this6.options).select(_this6.exclude).exec();
      const result = user ? user : null;

      if (options.dto === true && result != null) {
        return dataTransferDocument(result);
      }

      return result;
    })();
  }

  updateUserWhere(query, update, options = {
    dto: true
  }) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const user = yield user_entity.findOneAndUpdate(query, update, _this7.options).select(_this7.exclude).exec();
      const result = user ? user : null;

      if (options.dto === true && result != null) {
        return dataTransferDocument(result);
      }

      return result;
    })();
  }

  deleteUser(userId, options = {
    dto: true
  }) {
    return _asyncToGenerator(function* () {
      const user = yield user_entity.findByIdAndDelete(userId).exec();
      const result = user ? user : null;

      if (options.dto === true && result != null) {
        return dataTransferDocument(result);
      }

      return result;
    })();
  }

  deleteUserWhere(query, options = {
    dto: true
  }) {
    return _asyncToGenerator(function* () {
      const user = yield user_entity.findOneAndDelete(query).exec();
      const result = user ? user : null;

      if (options.dto === true && result != null) {
        return dataTransferDocument(result);
      }

      return result;
    })();
  }

  clearAllWhere(query) {
    return _asyncToGenerator(function* () {
      return yield user_entity.deleteMany(query).exec();
    })();
  }

  clearAll() {
    return _asyncToGenerator(function* () {
      return yield user_entity.deleteMany({}).exec();
    })();
  }

}
// CONCATENATED MODULE: ./src/server/entitymodel/entities/role.entity.ts

const role_entity_schema = new entitySchema({
  name: {
    unique: true,
    type: String,
    lowercase: true,
    trim: true,
    minlength: 3
  },
  code: {
    type: String,
    unique: true
  },
  level: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 10
  }
}, {
  timestamps: true,
  strict: true,
  versionKey: false
});
const Role = role_entity_schema.getModel('Role');
/* harmony default export */ var role_entity = (Role);
// CONCATENATED MODULE: ./src/server/repositories/role.repository.ts
function role_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function role_repository_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { role_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { role_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function role_repository_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function role_repository_dataTransferDocument(role) {
  const {
    id,
    name,
    code,
    level
  } = role;
  return {
    id,
    name,
    code,
    level
  };
}
/**
 * @description Data access layer Repository used
 * for interfacing with the role data.
 */


class role_repository_RoleRepository {
  constructor() {
    role_repository_defineProperty(this, "exclude", void 0);

    role_repository_defineProperty(this, "options", void 0);

    this.exclude = null;
    this.options = {
      new: true,
      upsert: false,
      useFindAndModify: false,
      runValidators: true
    };
  }

  hasRole(roleId) {
    return role_repository_asyncToGenerator(function* () {
      const count = yield role_entity.countDocuments({
        _id: roleId
      }).exec();
      return count > 0;
    })();
  }

  hasRoleWhere(query) {
    return role_repository_asyncToGenerator(function* () {
      const count = yield role_entity.countDocuments(query).exec();
      return count > 0;
    })();
  }

  getAllRoles(options = {
    dto: true
  }) {
    var _this = this;

    return role_repository_asyncToGenerator(function* () {
      const roles = yield role_entity.find().select(_this.exclude).exec();

      if (options.dto === true) {
        return roles.map(x => role_repository_dataTransferDocument(x));
      }

      return roles;
    })();
  }

  getAllRolesWhere(query, options = {
    dto: true
  }) {
    var _this2 = this;

    return role_repository_asyncToGenerator(function* () {
      const roles = yield role_entity.find(query).select(_this2.exclude).exec();

      if (options.dto === true) {
        return roles.map(x => role_repository_dataTransferDocument(x));
      }

      return roles;
    })();
  }

  getRole(roleId, options = {
    dto: true
  }) {
    var _this3 = this;

    return role_repository_asyncToGenerator(function* () {
      const role = yield role_entity.findById(roleId).select(_this3.exclude).exec();
      const result = role ? role : null;

      if (options.dto === true && result != null) {
        return role_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  getRoleWhere(criteria, options = {
    dto: true
  }) {
    var _this4 = this;

    return role_repository_asyncToGenerator(function* () {
      const role = yield role_entity.findOne(criteria).select(_this4.exclude).exec();
      const result = role ? role : null;

      if (options.dto === true && result != null) {
        return role_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  getFromRole(roleId, select) {
    return role_repository_asyncToGenerator(function* () {
      const role = yield role_entity.findById(roleId).select(select).exec();
      const result = role ? role : null;
      return result;
    })();
  }

  insertRole(data, options = {
    dto: true
  }) {
    var _this5 = this;

    return role_repository_asyncToGenerator(function* () {
      const role = new role_entity(data);
      yield role.validate();
      const saved = yield role.save(_this5.options);
      const result = saved ? saved : null;

      if (options.dto === true && result != null) {
        return role_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  updateRole(roleId, update, options = {
    dto: true
  }) {
    var _this6 = this;

    return role_repository_asyncToGenerator(function* () {
      const role = yield role_entity.findByIdAndUpdate(roleId, update, _this6.options).select(_this6.exclude).exec();
      const result = role ? role : null;

      if (options.dto === true && result != null) {
        return role_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  updateRoleWhere(query, update, options = {
    dto: true
  }) {
    var _this7 = this;

    return role_repository_asyncToGenerator(function* () {
      const role = yield role_entity.findOneAndUpdate(query, update, _this7.options).select(_this7.exclude).exec();
      const result = role ? role : null;

      if (options.dto === true && result != null) {
        return role_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  deleteRole(roleId, options = {
    dto: true
  }) {
    return role_repository_asyncToGenerator(function* () {
      const role = yield role_entity.findByIdAndDelete(roleId).exec();
      const result = role ? role : null;

      if (options.dto === true && result != null) {
        return role_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  deleteRoleWhere(query, options = {
    dto: true
  }) {
    return role_repository_asyncToGenerator(function* () {
      const role = yield role_entity.findOneAndDelete(query).exec();
      const result = role ? role : null;

      if (options.dto === true && result != null) {
        return role_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  clearAllWhere(query) {
    return role_repository_asyncToGenerator(function* () {
      return yield role_entity.deleteMany(query).exec();
    })();
  }

  clearAll() {
    return role_repository_asyncToGenerator(function* () {
      return yield role_entity.deleteMany({}).exec();
    })();
  }

}
// CONCATENATED MODULE: ./src/server/messages/message.response.ts
const UserMessages = {
  NO_SUCH_ID: 'No user with the given id was found',
  NO_SUCH_EMAIL: 'No user with the give email was found',
  NO_SUCH_USER: 'No user with the give criteria was found',
  WRONG_PASSWORD: 'The given user password does not match our records',
  EMAIL_TAKEN: 'The given email is already taken'
};
const PasswordMessages = {
  NO_SUCH_PASSWORD: ''
};
const PriviledgeMessages = {
  NOT_GRANTED: 'You do not have sufficient priviledges to perform this action',
  ACCESS_DENIED: 'You do not have sufficient priviledges to perform this action'
};
const InvitationMessages = {
  EXPIRED: 'The invitation does not exist or it has expired',
  NOT_PENDING: 'There is no pending invitation for the given user',
  NO_INVITATION: 'No invitation was found for the give criteria',
  IS_ACTIVE: 'There already is an active accepted invitation for this user',
  IS_PENDING: 'There already is a pending active invitation for this user'
};
const CredentialsMessages = {
  NO_USER_EMAIL: 'No user with the given email was found',
  NO_USER_FOUND: 'The user could not be authorized since it was not found',
  NOT_AUTHORIZED: 'The user could not be authorized',
  NO_CREDENTIALS: 'The user data could not be retrieved',
  WRONG_PASSWORD: 'The given password did not match our records!'
};
const AuthorizationMessages = {
  NO_TOKEN: 'No valid token is present! Authorization denied!',
  NO_VALID_TOKEN: 'The found token is not valid! Authorization denied!',
  NO_ACTIVE_TOKEN: 'The given token is no longer valid or has been blacklisted',
  NO_TOKEN_FOUND: 'No token found'
};
const AuthenticationMessages = {
  FAILURE: 'Something went wrong! Please try again later.',
  NO_USER_FOUND: 'No user with a matching user id was found',
  NO_USER_EMAIL: 'No user with the given email was found',
  WRONG_PASSWORD: 'The given password did not match our records',
  NOT_FETCHED: 'Could not retrieved the user information',
  NOT_AUTHORIZED: 'Could not authorized the user',
  NOT_RECOVERED: 'Could not perform a password recovery'
};
const AccessRoleMessages = {
  ROLE_EXIST: 'A role matching the given criteria already exists',
  NO_SUCH_ROLE: 'No role with the given criteria was found'
};
const NotificationMessages = {
  RECOVERY_EMAIL: 'A recovery email has been sent to the given email address'
};
const SchedulerMessages = {
  LABEL_REQUIRED: 'A job label must be provided',
  INTERVAL_REQUIRED: 'A job interval must be provided',
  notifyStart: job => {
    return `Satarted job: '${job.label}' to run at: '${job.interval}'`;
  }
};
const ResponseMessages = {
  NOT_CREATED: name => `The ${name} could not be created`,
  NOT_FETCHED: name => `The ${name} could not be fetched`,
  NOT_UPDATED: name => `The ${name} could not be updated`,
  NOT_DELETED: name => `The ${name} could not be deleted`,
  NOT_FETCHED_ALL: name => `The ${name}s could not be fetched`
};
// CONCATENATED MODULE: ./src/server/services/role.service.ts
function role_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function role_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { role_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { role_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




class role_service_AccessRoleService {
  /**
   * @description Retrieves all the available roles 
   * @returns A list containing all the roles or a produced error.
   */
  getAllRoles() {
    return role_service_asyncToGenerator(function* () {
      try {
        const repository = new role_repository_RoleRepository();
        const result = yield repository.getAllRoles();
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Retrieves the role that matches the role id
   * @param roleId The id of the role to retrieve
   * @returns The role that matches the given id or a produced error.
   */


  getRole(roleId) {
    return role_service_asyncToGenerator(function* () {
      try {
        const repository = new role_repository_RoleRepository();
        const result = yield repository.getRole(roleId);
        if (!result) return {
          error: AccessRoleMessages.NO_SUCH_ROLE
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Retrives the role code for the role with the matching name.
   * @param name The type name of the role to retrieve.
   * @returns The role that matches the given name or a produced error.
   */


  getRoleCode(name) {
    return role_service_asyncToGenerator(function* () {
      try {
        const repository = new role_repository_RoleRepository();
        const result = yield repository.getRoleWhere({
          name: name
        });
        if (!result) return {
          error: AccessRoleMessages.NO_SUCH_ROLE
        };
        return {
          result: result.code
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Retrives the role with the matching code.
   * @param roleCode The code of the role to retrieve.
   * @returns The role that matches the given role code or a produced error.
   */


  getRoleByCode(roleCode) {
    return role_service_asyncToGenerator(function* () {
      try {
        const repository = new role_repository_RoleRepository();
        const result = yield repository.getRoleWhere({
          code: roleCode
        });
        if (!result) return {
          error: AccessRoleMessages.NO_SUCH_ROLE
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Retrieves the role for the user with the specified id.
   * @param userId The id of the user.
   * @returns The role that matches the given id or a produced error.
   */


  getUserRole(userId) {
    return role_service_asyncToGenerator(function* () {
      try {
        const userRepository = new user_repository_UserRepository();
        const roleRepostiory = new role_repository_RoleRepository();
        const user = yield userRepository.getUser(userId, {
          dto: false
        });
        if (!user) return {
          error: UserMessages.NO_SUCH_USER
        };
        const result = yield roleRepostiory.getRoleWhere({
          code: user.roleCode
        });
        if (!result) return {
          error: AccessRoleMessages.NO_SUCH_ROLE
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Creates a new role with the specifed data.
   * @param role The role data to use for creating the new role.
   * @returns The role that has just been created or a produced error.
   */


  createRole(role) {
    return role_service_asyncToGenerator(function* () {
      try {
        const repository = new role_repository_RoleRepository();
        const exists = yield repository.hasRoleWhere({
          name: role.name
        });
        if (exists) return {
          error: AccessRoleMessages.ROLE_EXIST
        };
        const result = yield repository.insertRole(role);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Updates the role that matches the specified role id.
   * @param roleId The role id of the role to be updated.
   * @param role The data to use for updating the role.
   * @returns The role that has just been updated or a produced error.
   */


  updateRole(roleId, data) {
    return role_service_asyncToGenerator(function* () {
      try {
        const update = {
          name: data.name,
          code: data.code
        };
        const repository = new role_repository_RoleRepository();
        const result = yield repository.updateRole(roleId, update);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Deletes the role with the matching id.
   * @param roleId The id of the role to be deleted.
   * @returns The role that has just been deleted or a produced error.
   */


  deleteRole(roleId) {
    return role_service_asyncToGenerator(function* () {
      try {
        const repository = new role_repository_RoleRepository();
        const result = yield repository.deleteRole(roleId);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }

}
// CONCATENATED MODULE: ./src/server/entitymodel/entities/invitation.entity.ts

const invitation_entity_schema = new entitySchema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  roleCode: {
    type: String,
    required: true,
    default: null
  },
  hostessId: {
    type: String,
    required: false
  },
  pending: {
    type: Boolean,
    required: false,
    default: true
  },
  expired: {
    type: Boolean,
    required: false,
    default: false
  },
  expirationTime: {
    type: Number,
    required: false,
    default: null
  }
}, {
  timestamps: true,
  strict: true,
  versionKey: false
});
const Invitation = invitation_entity_schema.getModel('Invitation');
/* harmony default export */ var invitation_entity = (Invitation);
// CONCATENATED MODULE: ./src/server/repositories/invitation.repository.ts
function invitation_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function invitation_repository_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { invitation_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { invitation_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function invitation_repository_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function invitation_repository_dataTransferDocument(data) {
  return {
    id: data.id,
    email: data.email,
    pending: data.pending,
    expired: data.expired,
    roleCode: data.roleCode,
    expirationTime: data.expirationTime
  };
}
/**
 * @description Data access layer Repository used
 * for interfacing with the invitation data.
 */


class invitation_repository_InvitationRepository {
  constructor() {
    invitation_repository_defineProperty(this, "exclude", void 0);

    invitation_repository_defineProperty(this, "options", void 0);

    this.exclude = null;
    this.options = {
      new: true,
      upsert: false,
      useFindAndModify: false,
      runValidators: true
    };
  }

  hasInvitation(invitationId) {
    return invitation_repository_asyncToGenerator(function* () {
      const count = yield invitation_entity.countDocuments({
        _id: invitationId
      }).exec();
      return count > 0;
    })();
  }

  hasInvitationWhere(query) {
    return invitation_repository_asyncToGenerator(function* () {
      const count = yield invitation_entity.countDocuments(query).exec();
      return count > 0;
    })();
  }

  getAllInvitations(options = {
    dto: true
  }) {
    var _this = this;

    return invitation_repository_asyncToGenerator(function* () {
      const invitations = yield invitation_entity.find().select(_this.exclude).exec();

      if (options.dto === true) {
        return invitations.map(x => invitation_repository_dataTransferDocument(x));
      }

      return invitations;
    })();
  }

  getAllInvitationsWhere(query, options = {
    dto: true
  }) {
    var _this2 = this;

    return invitation_repository_asyncToGenerator(function* () {
      const invitations = yield invitation_entity.find(query).select(_this2.exclude).exec();

      if (options.dto === true) {
        return invitations.map(x => invitation_repository_dataTransferDocument(x));
      }

      return invitations;
    })();
  }

  getInvitation(invitationId, options = {
    dto: true
  }) {
    var _this3 = this;

    return invitation_repository_asyncToGenerator(function* () {
      const invitation = yield invitation_entity.findById(invitationId).select(_this3.exclude).exec();

      if (options.dto === true && invitation != null) {
        return invitation_repository_dataTransferDocument(invitation);
      }

      return invitation;
    })();
  }

  getInvitationWhere(criteria, options = {
    dto: true
  }) {
    var _this4 = this;

    return invitation_repository_asyncToGenerator(function* () {
      const invitation = yield invitation_entity.findOne(criteria).select(_this4.exclude).exec();

      if (options.dto === true && invitation != null) {
        return invitation_repository_dataTransferDocument(invitation);
      }

      return invitation;
    })();
  }

  getFromInvitation(invitationId, select) {
    return invitation_repository_asyncToGenerator(function* () {
      const invitation = yield invitation_entity.findById(invitationId).select(select).exec();
      return invitation;
    })();
  }

  insertInvitation(data, options = {
    dto: true
  }) {
    var _this5 = this;

    return invitation_repository_asyncToGenerator(function* () {
      const invitation = new invitation_entity(data);
      yield invitation.validate();
      const saved = yield invitation.save(_this5.options);

      if (options.dto === true && saved != null) {
        return invitation_repository_dataTransferDocument(saved);
      }

      return saved;
    })();
  }

  updateInvitation(invitationId, update, options = {
    dto: true
  }) {
    var _this6 = this;

    return invitation_repository_asyncToGenerator(function* () {
      const invitation = yield invitation_entity.findByIdAndUpdate(invitationId, update, _this6.options).select(_this6.exclude).exec();

      if (options.dto === true && invitation != null) {
        return invitation_repository_dataTransferDocument(invitation);
      }

      return invitation;
    })();
  }

  updateInvitationWhere(query, update, options = {
    dto: true
  }) {
    var _this7 = this;

    return invitation_repository_asyncToGenerator(function* () {
      const invitation = yield invitation_entity.findOneAndUpdate(query, update, _this7.options).select(_this7.exclude).exec();

      if (options.dto === true && invitation != null) {
        return invitation_repository_dataTransferDocument(invitation);
      }

      return invitation;
    })();
  }

  deleteInvitation(invitationId, options = {
    dto: true
  }) {
    return invitation_repository_asyncToGenerator(function* () {
      const invitation = yield invitation_entity.findByIdAndDelete(invitationId).exec();
      const result = invitation ? invitation : null;

      if (options.dto === true && result != null) {
        return invitation_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  deleteInvitationWhere(query, options = {
    dto: true
  }) {
    return invitation_repository_asyncToGenerator(function* () {
      const invitation = yield invitation_entity.findOneAndDelete(query).exec();
      const result = invitation ? invitation : null;

      if (options.dto === true && result != null) {
        return invitation_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  clearAllWhere(query) {
    return invitation_repository_asyncToGenerator(function* () {
      return yield invitation_entity.deleteMany(query).exec();
    })();
  }

  clearAll() {
    return invitation_repository_asyncToGenerator(function* () {
      return yield invitation_entity.deleteMany({}).exec();
    })();
  }

}
// CONCATENATED MODULE: ./src/server/services/notification.service.ts
function notification_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function notification_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { notification_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { notification_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class NotificationService {
  sendInvitationEmail(invite) {
    return notification_service_asyncToGenerator(function* () {
      return false;
    })();
  }

  canSendEmails() {
    throw new Error("Method not implemented.");
  }

  sendPasswordRecoveryEmail(email, randomPassword) {
    var _this = this;

    return notification_service_asyncToGenerator(function* () {
      if (!_this.canSendEmails()) {
        return Promise.resolve(true).then();
      }

      throw new Error("Method not implemented.");
    })();
  }

}
// CONCATENATED MODULE: ./src/server/services/invitation.service.ts
function invitation_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function invitation_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { invitation_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { invitation_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





class invitation_service_InviationService {
  /**
   * @description Checks if there if an invitation has been issued to 
   * the current user. 
   * @param email The email of the possibly invited user.
   * @returns The possible flag indicating if the user has 
   * received and invitation or the generated error.
   */
  hasInvitation(email) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.hasInvitationWhere({
          email: email
        });
        if (!result) return {
          error: InvitationMessages.NO_INVITATION
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Checks if there if an invitation has been issued to 
   * the current user and if the invitation is active. 
   * @information An invitation is active when it has not expired.
   * @param email The email of the possibly invited user. 
   * @returns The possible flag indicating if the user has received
   * and invitation or the generated error.
   */


  hasActiveInvitation(email) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.hasInvitationWhere({
          email: email,
          expired: false
        });
        if (!result) return {
          error: InvitationMessages.EXPIRED
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Checks if there if an invitation has been issued to 
   * the current user and if the invitation is active and pending.
   * @information An invitation is active when it has not expired.
   * @param email The email of the possibly invited user. 
   * @returns  The possible flag indicating if the user has received 
   * and invitation or the generated error.
   */


  hasActivePendingInvitation(email) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const query = {
          email: email,
          expired: false,
          pending: true
        };
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.getInvitationWhere(query);
        if (!result) return {
          error: InvitationMessages.NOT_PENDING
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Gets all the available invitations.
   * @returns The possible listof invitations or the generated error.
   */


  getAllInvitations() {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.getAllInvitations();
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
    * @description Gets all the available invitations.
    * @param criteria The criteria used for making the search.
    * @returns The possible list of invitations or the generated error.
    */


  getAllInvitationsWhere(criteria) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.getAllInvitationsWhere(criteria);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Retrieves the invitation attached to the given
   * email if there is any.
   * @param criteria the criteria used for the invitation search.
   * invitation.
   * @returns The invitation attached to the given email or the generated error.
   */


  getInvitationWhere(criteria) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.getInvitationWhere(criteria);
        if (!result) return {
          error: InvitationMessages.NO_INVITATION
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Retrieves the invitation attached to the given
   * invitation id if there is any.
   * @param inviteId The invitation id of the invitation to
   * retrieve
   * @returns The invitation attached to the given id or the generated error.
   */


  getInvitation(inviteId) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.getInvitation(inviteId);
        if (!result) return {
          error: InvitationMessages.NO_INVITATION
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Updates the role code of the invitation that
   * matches the given invite Id.
   * @param inviteId The invitation id of the invitation.
   * @param updateData The invitation data used for the update.
   * @returns {{result: any, error: string}} The invitation
   * attached to the given id or the generated error.
   */


  updateInvitation(inviteId, data) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();

        if (data.role) {
          const service = new role_service_AccessRoleService();
          const {
            result
          } = yield service.getRoleCode(data.role);
          delete data.role;
          if (result) data.roleCode = result;
        }

        const result = yield repository.updateInvitation(inviteId, data);
        if (!result) return {
          error: InvitationMessages.NO_INVITATION
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
  * @description Updates the role code of the invitation that
  * matches the given invite Id.
  * @param criteria The invitation criteria.
  * @param update The invitation data used for the update.
  * @returns The invitation attached to the given id or the generated error.
  */


  updateInvitationWhere(criteria, update) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.updateInvitationWhere(criteria, update);
        if (!result) return {
          error: InvitationMessages.NO_INVITATION
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Creates an invitation with the given invitation
   * data and the given creator id.
   * @param creatorId The user that issued the invitaiton.
   * @param inviteData  The data containing the invitation details.
   * @returns The created invitation attached to the given id or the generated error.
   * @throws 
   */


  createInvitation(hostId, inviteData) {
    var _this = this;

    return invitation_service_asyncToGenerator(function* () {
      const email = inviteData.email;
      const roleName = inviteData.role;
      const expirationTime = inviteData.expirationTime;

      try {
        const service = new role_service_AccessRoleService();
        const repository = new invitation_repository_InvitationRepository();
        const {
          error,
          result
        } = yield service.getRoleCode(roleName);
        if (error) return {
          error: error
        };
        const exists = yield repository.hasInvitationWhere({
          email: email
        });
        if (exists) return _this.handleExisting(email, repository);
        const invitation = {
          email: email,
          hostId: hostId,
          roleCode: result,
          expirationTime: expirationTime
        };
        const invite = yield repository.insertInvitation(invitation);

        if (invite) {
          const emailService = yield new NotificationService();
          yield emailService.sendInvitationEmail(invite);
        }

        return {
          result: invite
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Revokes the invitation for the given user
   * email if any is present..
   * @param email The user email to revoke the invitation from.
   * @returns The revoked invitation or the generated error.
   */


  revokeInvitation(email) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.deleteInvitationWhere({
          email: email
        });
        if (!result) return {
          error: InvitationMessages.NO_INVITATION
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Deletes the invitation that matches the given invitation id.
   * @param inviteId The id of the invitation to delete.
   * @returns The deleted invitation or the generated error.
   */


  deleteInvitation(inviteId) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.deleteInvitation(inviteId);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Deletes all the available invitations.
   * @returns {{result: any, error: string}} The number invitations
   * deleted or the generated error.
   */


  clearInvitations() {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const result = yield repository.clearAll();
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Handles the case when there already exists
   * an invitation attached to the given email.
   * @param email The emai attached to the invitation.
   * @param repository The repository used for interfacing with the invivation data.
   */


  handleExisting(email, repository) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const invitation = yield repository.getInvitationWhere({
          email: email
        });
        if (invitation === null) return {
          error: InvitationMessages.NO_INVITATION
        };

        if (invitation.pending && !invitation.expired) {
          return {
            error: InvitationMessages.IS_PENDING
          };
        }

        if (!invitation.pending && !invitation.expired) {
          return {
            error: InvitationMessages.IS_ACTIVE
          };
        }

        return {
          error: null
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }

}
// EXTERNAL MODULE: external "bcryptjs"
var external_bcryptjs_ = __webpack_require__(10);
var external_bcryptjs_default = /*#__PURE__*/__webpack_require__.n(external_bcryptjs_);

// CONCATENATED MODULE: ./src/server/services/encryption.service.ts
function encryption_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function encryption_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { encryption_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { encryption_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



class encryption_service_EncryptionService {
  /**
   * @description Compares the old password as plain text with the current 
   * hashed and salted password.
   * @param oldPassword The password input as plain text
   * @param currentPassword The current password as a hash.
   * @returns True if the passwords match otherwise false.
   */
  comparePasswords(oldPassword, currentPassword) {
    return encryption_service_asyncToGenerator(function* () {
      return yield external_bcryptjs_default.a.compare(oldPassword, currentPassword);
    })();
  }
  /**
   * @description Used for encrypting passwords by hashing using salt.
   * @param password The password to be encrypted
   * @param iterations The number of iterations used for creating the hash salt. 
   * @returns The hashed and salted password or a generated error.
   */


  encryptPassword(password, iterations = server_config.encryption.SALT_ITERATIONS) {
    return encryption_service_asyncToGenerator(function* () {
      if (!password) return {
        error: new Error('The given password is empty or null')
      };

      try {
        const salt = yield external_bcryptjs_default.a.genSaltSync(iterations);
        const hash = yield external_bcryptjs_default.a.hashSync(password, salt);
        return {
          hash
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }

}
// EXTERNAL MODULE: external "jsonwebtoken"
var external_jsonwebtoken_ = __webpack_require__(9);
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_);

// CONCATENATED MODULE: ./src/server/entitymodel/entities/password.entity.ts

const password_entity_schema = new entitySchema({
  userId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  expiresIn: {
    type: Number,
    required: false,
    default: 172800
  },
  isTemp: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  strict: true,
  versionKey: false
});
const Password = password_entity_schema.getModel('Password');
/* harmony default export */ var password_entity = (Password);
// CONCATENATED MODULE: ./src/server/repositories/password.repository.ts
function password_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function password_repository_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { password_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { password_repository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function password_repository_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function password_repository_dataTransferDocument(data) {
  const {
    userId,
    password,
    isTemp,
    expiresIn
  } = data;
  return {
    userId,
    password,
    isTemp,
    expiresIn
  };
}

class PasswordDTO {
  constructor(userId, password, isTemp, expiresIn) {
    password_repository_defineProperty(this, "userId", void 0);

    password_repository_defineProperty(this, "password", void 0);

    password_repository_defineProperty(this, "isTemp", void 0);

    password_repository_defineProperty(this, "expiresIn", void 0);

    this.userId = userId;
    this.password = password;
    this.isTemp = isTemp;
    this.expiresIn = expiresIn;
  }

}
/**
 * @description Data access layer Repository used
 * for interfacing with the password data.
 */

class password_repository_PasswordRepository {
  constructor() {
    password_repository_defineProperty(this, "exclude", void 0);

    password_repository_defineProperty(this, "options", void 0);

    this.exclude = null;
    this.options = {
      new: true,
      upsert: false,
      useFindAndModify: false,
      runValidators: true
    };
  }

  hasPassword(passwordId) {
    return password_repository_asyncToGenerator(function* () {
      const count = yield password_entity.countDocuments({
        _id: passwordId
      }).exec();
      return count > 0;
    })();
  }

  hasPasswordWhere(query) {
    return password_repository_asyncToGenerator(function* () {
      const count = yield password_entity.countDocuments(query).exec();
      return count > 0;
    })();
  }

  getAllPasswords(options = {
    dto: true
  }) {
    var _this = this;

    return password_repository_asyncToGenerator(function* () {
      const passwords = yield password_entity.find().select(_this.exclude).exec();

      if (options.dto === true) {
        return passwords.map(x => password_repository_dataTransferDocument(x));
      }

      return passwords;
    })();
  }

  getAllPasswordsWhere(query, options = {
    dto: true
  }) {
    var _this2 = this;

    return password_repository_asyncToGenerator(function* () {
      const passwords = yield password_entity.find(query).select(_this2.exclude).exec();

      if (options.dto === true) {
        return passwords.map(x => password_repository_dataTransferDocument(x));
      }

      return passwords;
    })();
  }

  getPassword(passwordId, options = {
    dto: true
  }) {
    var _this3 = this;

    return password_repository_asyncToGenerator(function* () {
      const password = yield password_entity.findById(passwordId).select(_this3.exclude).exec();
      const result = password ? password : null;

      if (options.dto === true && result != null) {
        return password_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  getPasswordWhere(criteria, options = {
    dto: true
  }) {
    var _this4 = this;

    return password_repository_asyncToGenerator(function* () {
      const password = yield password_entity.findOne(criteria).select(_this4.exclude).exec();
      const result = password ? password : null;

      if (options.dto === true && result != null) {
        return password_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  getFromPassword(passwordId, select) {
    return password_repository_asyncToGenerator(function* () {
      const password = yield password_entity.findById(passwordId).select(select).exec();
      const result = password ? password : null;
      return result;
    })();
  }

  insertPassword(data, options = {
    dto: true
  }) {
    var _this5 = this;

    return password_repository_asyncToGenerator(function* () {
      const password = new password_entity(data);
      yield password.validate();
      const saved = yield password.save(_this5.options);
      const result = saved ? saved : null;

      if (options.dto === true && result != null) {
        return password_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  updatePassword(passwordId, update, options = {
    dto: true
  }) {
    var _this6 = this;

    return password_repository_asyncToGenerator(function* () {
      const password = yield password_entity.findByIdAndUpdate(passwordId, update, _this6.options).select(_this6.exclude).exec();
      const result = password ? password : null;

      if (options.dto === true && result != null) {
        return password_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  updatePasswordWhere(query, update, options = {
    dto: true
  }) {
    var _this7 = this;

    return password_repository_asyncToGenerator(function* () {
      const password = yield password_entity.findOneAndUpdate(query, update, _this7.options).select(_this7.exclude).exec();
      const result = password ? password : null;

      if (options.dto === true && result != null) {
        return password_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  deletePassword(passwordId, options = {
    dto: true
  }) {
    return password_repository_asyncToGenerator(function* () {
      const password = yield password_entity.findByIdAndDelete(passwordId).exec();
      const result = password ? password : null;

      if (options.dto === true && result != null) {
        return password_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  deletePasswordWhere(query, options = {
    dto: true
  }) {
    return password_repository_asyncToGenerator(function* () {
      const password = yield password_entity.findOneAndDelete(query).exec();
      const result = password ? password : null;

      if (options.dto === true && result != null) {
        return password_repository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  clearAllWhere(query) {
    return password_repository_asyncToGenerator(function* () {
      return yield password_entity.deleteMany(query).exec();
    })();
  }

  clearAll() {
    return password_repository_asyncToGenerator(function* () {
      return yield password_entity.deleteMany({}).exec();
    })();
  }

}
// CONCATENATED MODULE: ./src/server/handlers/cache.handler.ts
function cache_handler_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function cache_handler_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { cache_handler_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { cache_handler_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class RedisCacheHandler {
  available() {
    return false;
  }

  saveValues(key, value) {
    return cache_handler_asyncToGenerator(function* () {
      return new Promise(() => {});
    })();
  }

}
// CONCATENATED MODULE: ./src/server/utilities/string.utility.ts
function randomString(length) {
  let chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
  let pass = '';

  for (let x = 0; x < length; x++) {
    let i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }

  return pass;
}
// CONCATENATED MODULE: ./src/server/services/authentication.service.ts
function authentication_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function authentication_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { authentication_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { authentication_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function authentication_service_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class authentication_service_AuthenticationService {
  constructor() {
    authentication_service_defineProperty(this, "redisCacheHandler", new RedisCacheHandler());
  }

  /**
   * @description Authenticates the user by verifying that 
   * the credetials match our internal records.
   * @param credentials The email and password used for athentication
   * @returns The possible user id and token or an error that has been produced.
   */
  authenticate(credentials) {
    var _this = this;

    return authentication_service_asyncToGenerator(function* () {
      try {
        const {
          email,
          password
        } = credentials;
        const repository = new user_repository_UserRepository();
        const passwordRepository = new password_repository_PasswordRepository();
        const encryptionService = new encryption_service_EncryptionService();
        const user = yield repository.getUserWhere({
          email: email
        }, {
          dto: false
        });
        if (!user) return {
          error: AuthenticationMessages.NO_USER_EMAIL
        };
        const isMatch = yield encryptionService.comparePasswords(password, user.password);

        if (!isMatch) {
          const tempPasswords = yield passwordRepository.getAllPasswordsWhere({
            userId: user.id
          });

          if (tempPasswords.length > 0) {
            var noMatch = true;

            for (const tempPassword of tempPasswords) {
              const isMatch = yield encryptionService.comparePasswords(password, tempPassword.password);
              if (isMatch) noMatch = false;
            }

            if (noMatch) return {
              error: AuthenticationMessages.WRONG_PASSWORD
            };
          }
        }

        const {
          token,
          error
        } = yield _this.createToken(user);
        if (error) return {
          error
        };
        const result = {
          userId: user.id,
          token: token
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Sends an email to the user with the specified email with
   * a temporary password which the user is to use to enter his/her account.
   * @param data T
   * @returns the potential result represented as a message indicating that
   * a recovery email was succesfully sent or the possible generated error.
   */


  recoverPassword(data) {
    return authentication_service_asyncToGenerator(function* () {
      const email = data.email;
      const passwordLength = 32;
      const randomPassword = randomString(passwordLength);

      try {
        const userService = new user_service_UserService();
        const passwordRepository = new password_repository_PasswordRepository();
        const notificationService = yield new NotificationService();
        const encryptionService = new encryption_service_EncryptionService();
        const result = yield userService.getUserByEmail(email);
        if (!result.result) return {
          error: result.error
        };
        const user = result.result;
        const {
          error,
          hash
        } = yield encryptionService.encryptPassword(randomPassword);
        if (error) return {
          error
        };
        const passwordData = {
          userId: user.id,
          password: hash,
          isTemp: true
        };
        const password = yield passwordRepository.insertPassword(passwordData);
        if (!password) return {
          error: AuthenticationMessages.FAILURE
        };
        yield notificationService.sendPasswordRecoveryEmail(email, randomPassword);
        return {
          result: NotificationMessages.RECOVERY_EMAIL
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
  * @description Retrieves the user data for the user with the
  * matching id.
  * @param userId The user id of the user to retrieve
  * credentials for.
  * @param getDTO Flag for determine if the a dto should
  * be returned
  * @returns The possible user or an error that has been produced.
  */


  getUser(userId, getDTO = true) {
    return authentication_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const result = yield repository.getUser(userId, {
          dto: getDTO
        });
        if (!result) return {
          error: AuthenticationMessages.NO_USER_FOUND
        };
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Creates the token for the given user.
   * @param user The user to create a token for
   * @param redisCache The cache handler used for caching tokens.
   * @returns {{token: string, error: string}} The possible token
   * or an error that has been produced.
   */


  createToken(user) {
    var _this2 = this;

    return authentication_service_asyncToGenerator(function* () {
      try {
        const payload = {
          userId: user.id,
          roleCode: user.roleCode
        };
        const token = yield external_jsonwebtoken_default.a.sign(payload, server_config.jwt.TOKEN_SECRET, {
          expiresIn: server_config.jwt.EXPIRATION_TIME
        });

        if (_this2.redisCacheHandler.available()) {
          const {
            error
          } = yield _this2.redisCacheHandler.saveValues(payload.userId, token);
          if (error) throw new Error(error);
        }

        return {
          token
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Checks if the given token is black listed and no longer valid.
   * A token is blacklisted when a new token has been issued to the same user.
   * @param token The token to be checked.
   * @returns true if the token is found in the blacklist
   * records and false if it isnt.
   */


  isBlackListed(token) {
    var _this3 = this;

    return authentication_service_asyncToGenerator(function* () {
      if (_this3.redisCacheHandler.available()) {
        return Promise.resolve(false).then();
      }

      return Promise.resolve(false).then();
    })();
  }
  /**
   * @description Invalidates the tokens issued to the given user.
   * The user will need to reauthenticate in order to regain access.
   * @param user The user to invalidate the tokens for.
   * @returns The flag indicating token invalidation an error that has been produced.
   */


  invalidateTokens(user) {
    return authentication_service_asyncToGenerator(function* () {
      return new Promise(() => {});
    })();
  }

}
// CONCATENATED MODULE: ./src/server/services/user.service.ts
function user_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function user_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { user_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { user_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







class user_service_UserService {
  /**
   * @description Returns a result with all the users which are currently in 
   * the database.
   * @returns the potential result represented as a list of users or 
   * the possible generated error.
   */
  getAllUsers() {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const users = yield repository.getAllUsers();
        return {
          result: users
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Returns a result with the user with the matching id
   * the database.
   * @param  userId The id of the user to return
   * @returns the potential result represented as the user that matches
   * the given id or the possible generated error.
   */


  getUser(userId) {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const user = yield repository.getUser(userId);
        if (!user) return {
          error: UserMessages.NO_SUCH_ID
        };
        return {
          result: user
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Returns a result with the user with the matching email
   * the database.
   * @param email The email of the user to return
   * @returns the potential result represented as  user that matches the 
   * given email or the possible generated error.
   */


  getUserByEmail(email) {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const user = yield repository.getUserWhere({
          email: email
        });
        if (!user) return {
          error: UserMessages.NO_SUCH_EMAIL
        };
        return {
          result: user
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Returns a result with the user with the matching email
   * the database.
   * @param criteria The criteria used for finding the user.
   * @returns the potential result represented as  user that matches the 
   * given email or the possible generated error.
   */


  getUserWhere(criteria) {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const user = yield repository.getUserWhere(criteria);
        if (!user) return {
          error: UserMessages.NO_SUCH_USER
        };
        return {
          result: user
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Updates the user with the matching id with the specified data
   * Only the first name, last name and company id of the user can be updated by this 
   * function.
   * @param userId The id of the user to return
   * @param  update data with the updated user details.
   * @returns the potential result represented as the user who has been
   * updated or the possible generated error.
   */


  updateUser(userId, update) {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const user = yield repository.updateUser(userId, update);
        if (!user) return {
          error: UserMessages.NO_SUCH_ID
        };
        return {
          result: user
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Updates the user role for the user with the given user id.
   * @param userId The id of the user.
   * @param update The new role code data to be assigned.
   * @returns the potential result represented as the user whose role was 
   * updated or the possible generated error.
   */


  updateUserRole(userId, update) {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const user = yield repository.updateUser(userId, update);
        if (!user) return {
          error: UserMessages.NO_SUCH_ID
        };
        return {
          result: user
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Updates the passsword of the user with the new password
   * given that the old password matches the user records. A password
   * update invalidates any possible token issued to the user.
   * @param  userId The id of the user.
   * @param passwordData The data containing the old and new passwords.
   * @returns the potential result represented as the user whose password 
   * was updated or the possible generated error.
   */


  updateUserPassword(userId, passwordData, internal = false) {
    return user_service_asyncToGenerator(function* () {
      const currentPassword = passwordData.oldPassword;
      const newPassword = passwordData.newPassword;

      try {
        const userRepository = new user_repository_UserRepository();
        const passwordRepository = new password_repository_PasswordRepository();
        const encryptionService = new encryption_service_EncryptionService();
        const authenticationService = new authentication_service_AuthenticationService();
        const user = yield userRepository.getUser(userId, {
          dto: false
        });
        if (user === null) return {
          error: UserMessages.NO_SUCH_USER
        };
        const isMatch = yield encryptionService.comparePasswords(currentPassword, user.password);

        if (isMatch || internal) {
          const {
            error,
            hash
          } = yield encryptionService.encryptPassword(newPassword);

          if (error) {
            return {
              error
            };
          }

          const update = {
            password: hash,
            updateDate: Date.now
          };
          const result = yield userRepository.updateUser(userId, update);

          if (!result) {
            return {
              error: UserMessages.NO_SUCH_USER
            };
          }

          const revokeResult = yield authenticationService.invalidateTokens(result);
          yield passwordRepository.clearAllWhere({
            userId: user.id
          });
          return {
            result: result,
            error: revokeResult.error
          };
        } else {
          return {
            error: UserMessages.WRONG_PASSWORD
          };
        }
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Registers a user given that the user has a pending active
   * invitation. 
   * @param userData The data of the user to be registered.
   * @returns the potential result represented as the user who was just 
   * created or the possible generated error.
   */


  registerUser(userData) {
    var _this = this;

    return user_service_asyncToGenerator(function* () {
      const email = userData.email;
      const encryptionService = new encryption_service_EncryptionService();
      const invitationService = new invitation_service_InviationService();
      const passwordRepository = new password_repository_PasswordRepository();
      const authenticationService = new authentication_service_AuthenticationService();

      try {
        const result = yield invitationService.getInvitationWhere({
          email: email
        });
        if (result.error) return {
          error: result.error
        };
        const invitation = result.result;
        const repository = new user_repository_UserRepository();
        const exists = yield repository.hasUserWhere({
          email: email
        });
        if (exists) return {
          error: UserMessages.EMAIL_TAKEN
        };
        const encryptResult = yield encryptionService.encryptPassword(userData.password);
        if (!encryptResult.hash) return {
          error: encryptResult.error
        };
        const name = userData.name;
        const roleCode = invitation.roleCode;
        const password = encryptResult.hash;
        const data = {
          name: name,
          email: email,
          roleCode: roleCode,
          password: password,
          lastLogin: null,
          active: true
        };
        const user = yield repository.insertUser(data);
        if (user === null) return {
          error: UserMessages.NO_SUCH_USER
        };
        const tokeResult = yield authenticationService.createToken(user);
        const {
          error
        } = yield _this.updateInviteStatus(invitation.id, invitationService);
        if (error) return {
          error
        };
        return {
          result: {
            user: user,
            token: tokeResult.token,
            error: tokeResult.error
          }
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }

  updateInviteStatus(inviteId, invitationService) {
    return user_service_asyncToGenerator(function* () {
      const data = {
        pending: false
      };
      return yield invitationService.updateInvitation(inviteId, data);
    })();
  }
  /**
   * @description Removes the user that matches the given user id from
   * our records.
   * @param userId The id of the user to be deleted
   * @returns the potential result represented as the user who was just 
   * removed or the possible generated error.
   */


  deleteUser(userId) {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const user = yield repository.deleteUser(userId);
        return {
          result: user
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Removes all the users from the database.
   * @returns the potential result represented as number of deleted users
   * or the possible generated error.
   */


  clearUsers() {
    return user_service_asyncToGenerator(function* () {
      try {
        const repository = new user_repository_UserRepository();
        const result = yield repository.clearAll();
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }

}
// CONCATENATED MODULE: ./src/server/localstore/accessrole.store.ts
function accessrole_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class RoleData {
  constructor(type, code, level) {
    accessrole_store_defineProperty(this, "type", void 0);

    accessrole_store_defineProperty(this, "code", void 0);

    accessrole_store_defineProperty(this, "level", void 0);

    this.type = type;
    this.code = code;
    this.level = level;
  }

}

const CODES = [...server_config.roles.CODES];
const ROOT = 'root';
const ADMIN = 'admin';
const GUEST = 'guest';
const USER = 'user';
const NONE = 'none';
const ACCESS_ROLES = [new RoleData(ROOT, CODES[0], server_config.roles.CLEARANCE.ROOT), new RoleData(ADMIN, CODES[1], server_config.roles.CLEARANCE.VERY_HIGH), new RoleData(USER, CODES[2], server_config.roles.CLEARANCE.NORMAL), new RoleData(GUEST, CODES[3], server_config.roles.CLEARANCE.LOW)];
const ALL = [ROOT, ADMIN, GUEST, USER];

/* harmony default export */ var accessrole_store = ({
  ROOT,
  ADMIN,
  GUEST,
  USER,
  ACCESS_ROLES
});
// CONCATENATED MODULE: ./src/server/initializers/database.initializer.ts
function database_initializer_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function database_initializer_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { database_initializer_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { database_initializer_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function database_initializer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class database_initializer_DatabaseIntializer {
  constructor(errorHandler, logger) {
    database_initializer_defineProperty(this, "logger", void 0);

    database_initializer_defineProperty(this, "handler", void 0);

    this.handler = errorHandler;
    this.logger = logger;
  }
  /**
   * @description Populates the invitation collection with some
   * initital invitation related data.
   */


  createInitialInvitation() {
    return database_initializer_asyncToGenerator(function* () {
      const inviteService = new invitation_service_InviationService();
    })();
  }
  /**
   * @description Populates the user collection with some
   * initital user related data for users with
   * role admin.
   */


  createInitialAdministrators() {
    var _this = this;

    return database_initializer_asyncToGenerator(function* () {
      const userService = new user_service_UserService();
      const user = {
        name: server_config.admin.ADMIN_NAME,
        email: server_config.admin.ADMIN_USERNAME,
        password: server_config.admin.ADMIN_PASSWORD
      };
      const {
        result,
        error
      } = yield userService.registerUser(user);

      if (error) {
        _this.logger.logInfo(error);
      } else {
        _this.logger.logInfo(result);
      }
    })();
  }
  /**
   * @description Populates the role collection with some
   * initital role related data.
   */


  createInitialRoles() {
    var _this2 = this;

    return database_initializer_asyncToGenerator(function* () {
      const service = new role_service_AccessRoleService();

      for (let i = 0; i < accessrole_store.ACCESS_ROLES.length; i++) {
        const type = accessrole_store.ACCESS_ROLES[i].type;
        const code = accessrole_store.ACCESS_ROLES[i].code;
        const level = accessrole_store.ACCESS_ROLES[i].level;
        const role = {
          name: type,
          code: code,
          level: level
        };
        const {
          error
        } = yield service.createRole(role);

        if (error) {
          _this2.handler.onError(error);

          continue;
        }

        _this2.logger.logInfo(`Initialized role of type: ${type}`);
      }
    })();
  }

}
// CONCATENATED MODULE: ./src/server/application.ts
function application_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function application_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { application_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { application_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function application_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const reactRender = __webpack_require__(26);

class application_Application {
  constructor(args) {
    application_defineProperty(this, "app", void 0);

    application_defineProperty(this, "loggHandler", void 0);

    application_defineProperty(this, "errorHandler", void 0);

    application_defineProperty(this, "dbOptions", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    this.app = external_express_default()();
    this.loggHandler = new LoggingHandler();
    this.errorHandler = new ErrorHandler(this.loggHandler);
    this.setupExpress();
    this.initializeMiddleware(args.interceptor);
    this.initializeControllers(args.controllers);
    this.initializeViewControllers(args.viewControllers);
    this.initializeErrorHandling(args.interceptor);
    this.connectToTheDatabase(true);
    this.initializeWebjobs();
  }

  startlistening() {
    const port = server_config.host.PORT;
    this.app.listen(port, () => {
      console.log(`Server listening on the port ${port}`);
    });
  }

  setupExpress() {
    const render = server_config.presentation;
    const clientRender = render.viewEngine.client;
    const stylesRender = render.viewEngine.styles;
    const scriptRender = render.viewEngine.scripts;
    this.app.use(external_cors_default()());
    this.app.use(external_helmet_default()());
    this.app.use(external_compression_default()());
    this.app.use(external_express_default.a.json());
    this.app.use(external_express_default.a.urlencoded({
      extended: false
    }));
    this.app.use(external_express_default.a.static(server_config.application.FILE_DIRECTORY));
    this.app.use(external_express_default.a.static(render.path));
    this.app.use(clientRender.alias, external_express_default.a.static(clientRender.path));
    this.app.use(stylesRender.alias, external_express_default.a.static(stylesRender.path));
    this.app.use(scriptRender.alias, external_express_default.a.static(scriptRender.path));
    this.app.set(render.viewEngine.alias, render.viewEngine.path);
    this.app.set(render.viewEngine.label, render.viewEngine.type);
    this.app.engine(render.viewEngine.type, reactRender.createEngine());
  }

  initializeMiddleware(middleware) {
    middleware.getInterceptors().forEach(middleware => {
      this.app.use(middleware);
    });
  }

  initializeControllers(controllers) {
    controllers.forEach(controller => {
      this.app.use(controller.getRoute(), controller.getRouter());
    });
  }

  initializeViewControllers(controllers) {
    if (controllers != undefined) {
      controllers.forEach(controller => {
        this.app.use(controller.getRoute(), controller.getRouter());
      });
    }
  }

  initializeErrorHandling(middleware) {
    this.app.use(middleware.getNotFoundHandler());
    this.app.use(middleware.getErrorHandler());
  }

  initializeWebjobs() {
    /*const dataCollector = new DataCollectionJob();
     dataCollector.scheduleA(scheduler);
    dataCollector.scheduleB(scheduler);
    dataCollector.scheduleC(scheduler);*/
  }

  connectToTheDatabase(createInitialData = false) {
    const dataInitializer = new database_initializer_DatabaseIntializer(this.errorHandler, this.loggHandler);
    const prepend = server_config.database.DB_PREPEND;
    const userName = server_config.database.DB_USERNAME;
    const password = server_config.database.DB_PASSWORD;
    const dbURIPath = server_config.database.DB_URI_PATH;
    const connectionString = `${prepend}${userName}:${password}${dbURIPath}`;
    external_mongoose_default.a.connect(connectionString, this.dbOptions);
    external_mongoose_default.a.connection.once('open',
    /*#__PURE__*/
    application_asyncToGenerator(function* () {
      console.log('MongoDB connected successfully');

      if (createInitialData) {
        yield dataInitializer.createInitialRoles();
        yield dataInitializer.createInitialAdministrators();
      }
    }));
  }

}
// CONCATENATED MODULE: ./src/server/definitions/httpCode.ts
var HttpCode;

(function (HttpCode) {
  HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpCode[HttpCode["FORBIDDEN_ACCESS"] = 403] = "FORBIDDEN_ACCESS";
  HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
  HttpCode[HttpCode["SUCCESS"] = 200] = "SUCCESS";
  HttpCode[HttpCode["ERROR"] = 500] = "ERROR";
})(HttpCode || (HttpCode = {}));

/* harmony default export */ var httpCode = (HttpCode);
// CONCATENATED MODULE: ./src/server/middleware/interceptors/error.interceptor.ts


function intercept(error, request, response, next) {
  const status = error.status || httpCode.ERROR;
  const message = error.message || 'Something went wrong';
  const apiResponse = {
    error: {
      status: status,
      message: message
    }
  };
  response.status(status).json(apiResponse);
}

/* harmony default export */ var error_interceptor = (intercept);
// CONCATENATED MODULE: ./src/server/exceptions/http.exceptions.ts
function http_exceptions_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HttpException extends Error {
  constructor(status, message) {
    super(message);

    http_exceptions_defineProperty(this, "status", void 0);

    http_exceptions_defineProperty(this, "message", void 0);

    this.status = status;
    this.message = message;
  }

}
// CONCATENATED MODULE: ./src/server/middleware/interceptors/notfound.interceptor.ts



function notfound_interceptor_intercept(request, response, next) {
  const status = httpCode.NOT_FOUND;
  const message = 'Resource not found!';
  const error = new HttpException(status, message);
  next(error);
}

/* harmony default export */ var notfound_interceptor = (notfound_interceptor_intercept);
// CONCATENATED MODULE: ./src/server/middleware/interceptors/request.interceptor.ts
function request_interceptor_intercept(request, response, next) {
  console.log(`Method: ${request.method} | Path: ${request.path}`);
  next();
}

/* harmony default export */ var request_interceptor = (request_interceptor_intercept);
// CONCATENATED MODULE: ./src/server/middleware/interceptor.ts




class interceptor_Interceptor {
  getInterceptors() {
    return [request_interceptor];
  }

  getErrorHandler() {
    return error_interceptor;
  }

  getNotFoundHandler() {
    return notfound_interceptor;
  }

}

/* harmony default export */ var interceptor = (interceptor_Interceptor);
// CONCATENATED MODULE: ./src/server/responses/request.response.ts
function request_response_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description Response produced when an authentication
 * is requested by a user.
 */
class AuthenticationResponse {
  constructor() {
    request_response_defineProperty(this, "authorized", false);

    request_response_defineProperty(this, "content", void 0);

    request_response_defineProperty(this, "message", void 0);

    request_response_defineProperty(this, "errors", []);
  }

}
/**
 * @description Response produced when a request for user
 * credential data is requested by a user.
 */

class CredentialsResponse {
  constructor() {
    request_response_defineProperty(this, "authorized", false);

    request_response_defineProperty(this, "errors", []);
  }

}
/**
 * @description Response produced when validation of
 * data takes place.
 */

class ValidationResponse {
  constructor() {
    request_response_defineProperty(this, "valid", false);

    request_response_defineProperty(this, "message", '');

    request_response_defineProperty(this, "errors", []);
  }

}
/**
 * @description Response produced when a permission is
 * requested for access to certain resource.
 */

class AccessResponse {
  constructor() {
    request_response_defineProperty(this, "granted", false);

    request_response_defineProperty(this, "errors", []);
  }

}
/**
 * @description Response produced when a priviledge is requested
 * to perform a certain action within a resouce.
 */

class PriviledgeResponse {
  constructor() {
    request_response_defineProperty(this, "hasAccess", void 0);

    request_response_defineProperty(this, "permission", void 0);

    request_response_defineProperty(this, "message", void 0);

    request_response_defineProperty(this, "errors", []);
  }

}
/**
 * @description Response produced when a registration takes
 * place.
 */

class RegistrationResponse {
  constructor() {
    request_response_defineProperty(this, "token", void 0);

    request_response_defineProperty(this, "email", void 0);

    request_response_defineProperty(this, "errors", []);
  }

}
/**
 * @description A common api response to a request.
 */

class ApiResponse {
  constructor() {
    request_response_defineProperty(this, "message", void 0);

    request_response_defineProperty(this, "content", void 0);

    request_response_defineProperty(this, "errors", []);
  }

}
// CONCATENATED MODULE: ./src/server/middleware/authenticators/token.validator.ts
function token_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function token_validator_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { token_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { token_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







const httpHeader = server_config.self.headers;

function authenticate(_x, _x2, _x3) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = token_validator_asyncToGenerator(function* (req, res, next) {
    const token = getToken(req);
    const response = new AuthenticationResponse();

    if (!token) {
      response.authorized = false;
      response.message = AuthorizationMessages.NO_TOKEN;
      response.errors.push(AuthorizationMessages.NO_TOKEN_FOUND);
      return res.status(httpCode.UNAUTHORIZED).json(response);
    }

    try {
      const secret = server_config.jwt.TOKEN_SECRET;
      const decoded = external_jsonwebtoken_default.a.verify(token, secret);
      const blackListed = yield isBlackListed(token);

      if (blackListed) {
        throw new Error(AuthorizationMessages.NO_ACTIVE_TOKEN);
      }

      req.user = decoded;
      next();
    } catch (error) {
      response.authorized = false;
      response.message = AuthorizationMessages.NO_VALID_TOKEN;
      response.errors.push(error.message);
      return res.status(httpCode.UNAUTHORIZED).json(response);
    }
  });
  return _authenticate.apply(this, arguments);
}

function isBlackListed(_x4) {
  return _isBlackListed.apply(this, arguments);
}

function _isBlackListed() {
  _isBlackListed = token_validator_asyncToGenerator(function* (token) {
    const service = new authentication_service_AuthenticationService();
    const {
      result,
      error
    } = yield service.isBlackListed(token);
    if (error) return true;
    return result;
  });
  return _isBlackListed.apply(this, arguments);
}

function getToken(req) {
  const bearer = server_config.jwt.PREFIX;
  const token = req.header(httpHeader.TOKEN_HEADER) || req.header(httpHeader.AUTHORIZATION);
  if (!token) return null;

  if (token.startsWith(bearer)) {
    return token.slice(bearer.length, token.length);
  }

  return token;
}

/* harmony default export */ var token_validator = (authenticate);
// CONCATENATED MODULE: ./src/server/localstore/priviledge.store.ts
function priviledge_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class PriviledgeData {
  constructor(type, code) {
    priviledge_store_defineProperty(this, "type", void 0);

    priviledge_store_defineProperty(this, "code", void 0);

    this.type = type;
    this.code = code;
  }

}

const priviledge_store_CODES = [...server_config.priviledges.CODES];
const READ = 'read';
const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';
const PRIVILEDGES = [new PriviledgeData(READ, priviledge_store_CODES[0]), new PriviledgeData(CREATE, priviledge_store_CODES[1]), new PriviledgeData(UPDATE, priviledge_store_CODES[2]), new PriviledgeData(DELETE, priviledge_store_CODES[3])];
const priviledge_store_ALL = [READ, CREATE, UPDATE, DELETE];

/* harmony default export */ var priviledge_store = ({
  READ,
  CREATE,
  UPDATE,
  DELETE
});
// CONCATENATED MODULE: ./src/server/entitymodel/entities/priviledge.entity.ts

const priviledge_entity_schema = new entitySchema({
  userId: {
    type: String,
    required: true
  },
  permissions: [{
    type: String,
    trim: true,
    lowercase: true,
    required: true
  }],
  controller: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 3,
    required: true
  }
}, {
  timestamps: false,
  strict: false,
  versionKey: false
});
priviledge_entity_schema.index({
  userId: 1,
  controller: 1
}, {
  unique: true
});
const Priviledge = priviledge_entity_schema.getModel('Priviledge');
/* harmony default export */ var priviledge_entity = (Priviledge);
// CONCATENATED MODULE: ./src/server/repositories/priviledge.respository.ts
function priviledge_respository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function priviledge_respository_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { priviledge_respository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { priviledge_respository_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function priviledge_respository_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function priviledge_respository_dataTransferDocument(data) {
  const {
    userId,
    permissions,
    controller
  } = data;
  return new PriviledgeDTO(userId, permissions, controller);
}

class PriviledgeDTO {
  constructor(userId, permissions, controller) {
    priviledge_respository_defineProperty(this, "userId", void 0);

    priviledge_respository_defineProperty(this, "permissions", void 0);

    priviledge_respository_defineProperty(this, "controller", void 0);

    this.userId = userId;
    this.permissions = permissions;
    this.controller = controller;
  }

}
/**
 * @description Data access layer Repository used
 * for interfacing with the priviledge data.
 */

class priviledge_respository_PriviledgeRepository {
  constructor() {
    priviledge_respository_defineProperty(this, "exclude", void 0);

    priviledge_respository_defineProperty(this, "options", void 0);

    this.exclude = null;
    this.options = {
      new: true,
      upsert: true,
      useFindAndModify: false,
      runValidators: true
    };
  }

  hasPriviledge(priviledgeId) {
    return priviledge_respository_asyncToGenerator(function* () {
      const count = yield priviledge_entity.countDocuments({
        _id: priviledgeId
      }).exec();
      return count > 0;
    })();
  }

  hasPriviledgeWhere(query) {
    return priviledge_respository_asyncToGenerator(function* () {
      const count = yield priviledge_entity.countDocuments(query).exec();
      return count > 0;
    })();
  }

  getAllPriviledges(options = {
    dto: true
  }) {
    var _this = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledges = yield priviledge_entity.find().select(_this.exclude).exec();

      if (options.dto === true) {
        return priviledges.map(x => priviledge_respository_dataTransferDocument(x));
      }

      return priviledges;
    })();
  }

  getAllPriviledgesWhere(query, options = {
    dto: true
  }) {
    var _this2 = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledges = yield priviledge_entity.find(query).select(_this2.exclude).exec();

      if (options.dto === true) {
        return priviledges.map(x => priviledge_respository_dataTransferDocument(x));
      }

      return priviledges;
    })();
  }

  getPriviledge(priviledgeId, options = {
    dto: true
  }) {
    var _this3 = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.findById(priviledgeId).select(_this3.exclude).exec();
      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
        return priviledge_respository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  getPriviledgeWhere(criteria, options = {
    dto: true
  }) {
    var _this4 = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.findOne(criteria).select(_this4.exclude).exec();
      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
        return priviledge_respository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  getFromPriviledge(priviledgeId, select) {
    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.findById(priviledgeId).select(select).exec();
      const result = priviledge ? priviledge : null;
      return result;
    })();
  }

  insertPriviledge(data, options = {
    dto: true
  }) {
    var _this5 = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = new priviledge_entity(data);
      yield priviledge.validate();
      const saved = yield priviledge.save(_this5.options);
      const result = saved ? saved : null;

      if (options.dto === true && result != null) {
        return priviledge_respository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  updateOrInsertPriviledge(query, update) {
    var _this6 = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.updateOne(query, update, _this6.options).select(_this6.exclude);
      return priviledge;
    })();
  }

  updatePriviledge(priviledgeId, update, options = {
    dto: true
  }) {
    var _this7 = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.findByIdAndUpdate(priviledgeId, update, _this7.options).select(_this7.exclude).exec();
      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
        return priviledge_respository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  updatePriviledgeWhere(query, update, options = {
    dto: true
  }) {
    var _this8 = this;

    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.findOneAndUpdate(query, update, _this8.options).select(_this8.exclude).exec();
      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
        return priviledge_respository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  deletePriviledge(priviledgeId, options = {
    dto: true
  }) {
    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.findByIdAndDelete(priviledgeId).exec();
      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
        return priviledge_respository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  deletePriviledgeWhere(query, options = {
    dto: true
  }) {
    return priviledge_respository_asyncToGenerator(function* () {
      const priviledge = yield priviledge_entity.findOneAndDelete(query).exec();
      const result = priviledge ? priviledge : null;

      if (options.dto === true && result != null) {
        return priviledge_respository_dataTransferDocument(result);
      }

      return result;
    })();
  }

  clearAllWhere(query) {
    return priviledge_respository_asyncToGenerator(function* () {
      return yield priviledge_entity.deleteMany(query).exec();
    })();
  }

  clearAll() {
    return priviledge_respository_asyncToGenerator(function* () {
      return yield priviledge_entity.deleteMany({}).exec();
    })();
  }

}
// CONCATENATED MODULE: ./src/server/services/priviledge.service.ts
function priviledge_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function priviledge_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { priviledge_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { priviledge_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



class priviledge_service_AccessPriviledgeService {
  /**
   * @description Retrieves the priviledges for the user matching the given
   * user id which also match the specified query criteria.
   * @param  query The criteria that the priviledges need to fulfill.
   * @returns A list of the matched priviledges or a produced error.
   */
  getPriviledges(query) {
    return priviledge_service_asyncToGenerator(function* () {
      try {
        const repository = new priviledge_respository_PriviledgeRepository();
        const result = yield repository.getAllPriviledgesWhere(query);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Retrieves the priviledges for the user matching the given
   * user id which also match the specified query criteria.
   * @param userId The user id attached to the priviledges to retrieve.
   * @param queryData The criteria that the priviledges need to fulfill.
   * @returns A list of the matched priviledges or a produced error.
   */


  hasPermission(userId, query) {
    return priviledge_service_asyncToGenerator(function* () {
      try {
        const repository = new priviledge_respository_PriviledgeRepository();
        const controller = query.controller;
        const priviledge = yield repository.getPriviledgeWhere({
          userId,
          controller
        });

        if (!priviledge) {
          return {
            error: PriviledgeMessages.ACCESS_DENIED
          };
        }

        const hasPermission = priviledge.permissions.some(x => x === query.permission);
        return {
          result: hasPermission
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Creates a new priviledge based on the given data.
   * @param priviledge The data containing information about the new priviledge.
   * @returns The newly created priviledge or a produced error.
   */


  createPriviledge(priviledge) {
    return priviledge_service_asyncToGenerator(function* () {
      try {
        const repository = new priviledge_respository_PriviledgeRepository();
        const result = yield repository.insertPriviledge(priviledge);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Updates a priviledge based on the given data.
   * @param priviledge The data containing information about the priviledge.
   * @returns The newly created priviledge or a produced error.
   */


  updatePriviledge(priviledge) {
    return priviledge_service_asyncToGenerator(function* () {
      try {
        const repository = new priviledge_respository_PriviledgeRepository();
        const {
          controller,
          userId
        } = priviledge;
        const result = yield repository.updatePriviledgeWhere({
          userId,
          controller
        }, priviledge);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Revokes/deletes a new priviledge that matches the specified
   * action data for the specified user id.
   * @param actionData The data containing information about the priviledge.
   * @returns The revoked priviledge 
   * or a produced error.
   */


  revokePriviledge(data) {
    return priviledge_service_asyncToGenerator(function* () {
      try {
        const repository = new priviledge_respository_PriviledgeRepository();
        const result = yield repository.deletePriviledgeWhere(data);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }
  /**
   * @description Revokes/deletes all priviledges for the specified user id.
   * @param userId The user id attached to the priviledges to revoke.
   * @returns The number of priviledges that have been revoked or a produced error.
   */


  revokeAllPriviledges(userId) {
    return priviledge_service_asyncToGenerator(function* () {
      try {
        const repository = new priviledge_respository_PriviledgeRepository();
        const query = {
          userId
        };
        const result = yield repository.clearAllWhere(query);
        return {
          result
        };
      } catch (error) {
        return {
          error
        };
      }
    })();
  }

}
// CONCATENATED MODULE: ./src/server/definitions/httpMethod.ts
var HttpMethod;

(function (HttpMethod) {
  HttpMethod["GET"] = "GET";
  HttpMethod["PUT"] = "PUT";
  HttpMethod["POST"] = "POST";
  HttpMethod["DELETE"] = "DELETE";
  HttpMethod["PATCH"] = "PATCH";
})(HttpMethod || (HttpMethod = {}));

const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';
const httpMethod_DELETE = 'DELETE';
const PATCH = 'PATCH';
/* harmony default export */ var httpMethod = (HttpMethod);
// CONCATENATED MODULE: ./src/server/middleware/authenticators/priviledge.validator.ts
function priviledge_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function priviledge_validator_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { priviledge_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { priviledge_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









function controlAccess(_x, _x2, _x3) {
  return _controlAccess.apply(this, arguments);
}

function _controlAccess() {
  _controlAccess = priviledge_validator_asyncToGenerator(function* (request, response, next) {
    const method = request.method;
    const userId = request.user.userId;
    const roleName = request.role.name;
    const parts = request.baseUrl.split('/');

    if (roleName === accessrole_store.ROOT) {
      return next();
    }

    const priviledgeResponse = new PriviledgeResponse();
    const controllerIndex = 2;

    if (parts[controllerIndex]) {
      const controller = parts[controllerIndex];
      const priviledges = new priviledge_service_AccessPriviledgeService();
      const query = createQuery(method, controller);
      const {
        error,
        result
      } = yield priviledges.hasPermission(userId, query);

      if (error) {
        priviledgeResponse.hasAccess = false;
        priviledgeResponse.permission = query.permission;
        priviledgeResponse.message = PriviledgeMessages.NOT_GRANTED;
        priviledgeResponse.errors.push(error);
        return response.status(httpCode.UNAUTHORIZED).json(response);
      }

      if (result === false) {
        priviledgeResponse.hasAccess = false;
        priviledgeResponse.permission = query.permission;
        priviledgeResponse.message = PriviledgeMessages.NOT_GRANTED;
        priviledgeResponse.errors.push(PriviledgeMessages.ACCESS_DENIED);
        return response.status(httpCode.UNAUTHORIZED).json(response);
      }
    }

    next();
  });
  return _controlAccess.apply(this, arguments);
}

function createQuery(method, controller) {
  switch (method) {
    case GET:
      return {
        controller: controller,
        permission: priviledge_store.READ
      };

    case PUT:
      return {
        controller: controller,
        permission: priviledge_store.UPDATE
      };

    case POST:
      return {
        controller: controller,
        permission: priviledge_store.CREATE
      };

    case httpMethod_DELETE:
      return {
        controller: controller,
        permission: priviledge_store.DELETE
      };
  }

  return {
    controller: null,
    permission: null
  };
}

/* harmony default export */ var priviledge_validator = (controlAccess);
// CONCATENATED MODULE: ./src/server/messages/message.validation.ts
const EmailValidation = {
  EMAIL_EMPTY: 'The email is empty.',
  INVALID_EMAIL: 'The given email is not valid',
  LENGTH_EXCEEDED: length => `The email is too long as it exceeds ${length} characters`,
  USERNAME_TOOLONG: length => `The given email user name length is lesser than ${length} characters long`,
  DOMAIN_TOOLONG: length => `The given email domain name length is lesser than ${length} characters long`
};
const PasswordValidation = {
  PASSWORD_EMPTY: 'The password is empty!',
  ALPHA_NUMERIC: 'Password is not alpha numeric.',
  MIN_LENGTH: length => `Password length is lesser than ${length} characters long`,
  MAX_LENGTH: length => `Password length is greater than ${length} characters long`
};
const PriviledgeValidation = {
  ADD_PRIVILEDGE: 'Please submit a priviledge',
  UNDEFINED_ERROR: 'The priviledge is undefined!',
  INVALID_PRIVILEDGE: 'The priviledge action is invalid',
  VALID_ACTIONS: args => `The valid actions are ${args}`
};
const AuthenticationValidation = {
  CREDENTIALS: ''
};
const SchemaValidation = {
  FETCH_DATA: arg => `The ${arg} query data is invalid`,
  CREATE_DATA: arg => `The ${arg} creation data is invalid`,
  UPDATE_DATA: arg => `The ${arg} update data is invalid`
};
const InvitationValidation = {
  INVITE_FETCH_DATA: 'The invitation query data is invalid',
  INVITE_CREATE_DATA: 'The invitation creation data is invalid',
  INVITE_UPDATE_DATA: 'The invitation update data is invalid'
};
const UserValidation = {
  USER_FETCH_DATA: 'The user query data is invalid',
  USER_CREATE_DATA: 'The user creation data is invalid',
  USER_UPDATE_DATA: 'The user update data is invalid'
};
const AccessRoleValidation = {
  DENIED: 'Access for the specified role has been denied',
  NONE_FOUND: 'No role with the given criteria was found for the user',
  INVALID_CODE: 'The role code for the user is invalid'
};
const RoleValidation = {
  ADD_ROLE: 'Please submit a role type name',
  UNDEFINED_ERROR: 'The role type name is undefined!',
  INVALID_ROLE: 'The role type name is invalid',
  NOT_FETCHED: 'The role could not be retrieved',
  NOT_FETCHED_ALL: 'The roles could not be retrieved',
  NOT_CREATED: 'The role could not be created',
  NOT_DELETED: 'The role could not be deleted',
  NOT_UPDATED: 'THe role could not be updated',
  VALID_ROLES: args => `The valid role type names are ${args}`
};
// CONCATENATED MODULE: ./src/server/middleware/authenticators/access.validator.ts
function access_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function access_validator_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { access_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { access_validator_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







function allow(...allowed) {
  const service = new role_service_AccessRoleService();

  const isUserAllowed =
  /*#__PURE__*/
  function () {
    var _ref = access_validator_asyncToGenerator(function* (roleCode, request) {
      const {
        error,
        result
      } = yield service.getRoleByCode(roleCode);
      if (error) return {
        error: AccessRoleValidation.INVALID_CODE
      };
      request.role = result;
      return {
        allowed: allowed.indexOf(result.name) > -1
      };
    });

    return function isUserAllowed(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  const doRolesMatch =
  /*#__PURE__*/
  function () {
    var _ref2 = access_validator_asyncToGenerator(function* (userId, roleCode) {
      const {
        error,
        result
      } = yield service.getUserRole(userId);
      if (error) return {
        error: AccessRoleValidation.NONE_FOUND
      };
      return {
        match: result.code === roleCode
      };
    });

    return function doRolesMatch(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  return (
    /*#__PURE__*/
    function () {
      var _ref3 = access_validator_asyncToGenerator(function* (request, response, next) {
        const {
          userId,
          roleCode
        } = request.user;
        const accessResponse = new AccessResponse();
        const isAllowed = yield isUserAllowed(roleCode, request);
        const rolesMatch = yield doRolesMatch(userId, roleCode);

        if (isAllowed.error) {
          accessResponse.granted = false;
          accessResponse.errors.push(isAllowed.error);
        }

        if (rolesMatch.error) {
          accessResponse.granted = false;
          accessResponse.errors.push(rolesMatch.error);
        }

        if (request.user && isAllowed.allowed && rolesMatch.match) yield priviledge_validator(request, response, next);else {
          accessResponse.granted = false;
          accessResponse.errors.push(AccessRoleValidation.DENIED);
          return response.status(httpCode.FORBIDDEN_ACCESS).json(accessResponse);
        }
      });

      return function (_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}

/* harmony default export */ var access_validator = (allow);
// CONCATENATED MODULE: ./src/server/definitions/requestAction.ts
var RequestAction;

(function (RequestAction) {
  RequestAction[RequestAction["GET"] = 0] = "GET";
  RequestAction[RequestAction["GET_ALL"] = 1] = "GET_ALL";
  RequestAction[RequestAction["CREATE"] = 2] = "CREATE";
  RequestAction[RequestAction["UPDATE"] = 3] = "UPDATE";
  RequestAction[RequestAction["DELETE"] = 4] = "DELETE";
  RequestAction[RequestAction["RECOVER"] = 5] = "RECOVER";
  RequestAction[RequestAction["AUTHENTICATE"] = 6] = "AUTHENTICATE";
})(RequestAction || (RequestAction = {}));

;
/* harmony default export */ var definitions_requestAction = (RequestAction);
// CONCATENATED MODULE: ./src/server/controllers/controller.ts
function controller_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class controller_Controller {
  constructor(name) {
    controller_defineProperty(this, "name", void 0);

    this.name = name;
  }

  /**
   * Builds a response to send to the client
   * @param result The result of the request
   * @param error The possible generated error.
   * @param response The request reponse object.
   * @param requestAction A enum that represents
   * the type of request that was made.
   * @returns  The response produced based
   * on the given arguements and the controller type.
   */
  buildResult(result, error, response, requestAction) {
    const apiResponse = new ApiResponse();

    if (error) {
      switch (requestAction) {
        case definitions_requestAction.GET:
          apiResponse.message = ResponseMessages.NOT_FETCHED(this.name);
          break;

        case definitions_requestAction.GET_ALL:
          apiResponse.message = ResponseMessages.NOT_FETCHED_ALL(this.name);
          break;

        case definitions_requestAction.CREATE:
          apiResponse.message = ResponseMessages.NOT_CREATED(this.name);
          break;

        case definitions_requestAction.UPDATE:
          apiResponse.message = ResponseMessages.NOT_UPDATED(this.name);
          break;

        case definitions_requestAction.DELETE:
          apiResponse.message = ResponseMessages.NOT_DELETED(this.name);
          break;
      }

      apiResponse.errors.push(error);
      return response.status(httpCode.BAD_REQUEST).json(apiResponse);
    }

    apiResponse.content = result;
    return response.json(apiResponse);
  }

}

/* harmony default export */ var controllers_controller = (controller_Controller);
// CONCATENATED MODULE: ./src/server/controllers/restful/api/roles.ts
function roles_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function roles_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { roles_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { roles_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function roles_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class roles_Roles extends controllers_controller {
  constructor(...allowedRoles) {
    var _this;

    super('role');
    _this = this;

    roles_defineProperty(this, "service", new role_service_AccessRoleService());

    roles_defineProperty(this, "routing", '/rest/api/roles');

    roles_defineProperty(this, "router", void 0);

    roles_defineProperty(this, "roles", void 0);

    roles_defineProperty(this, "get",
    /*#__PURE__*/
    function () {
      var _ref = roles_asyncToGenerator(function* (request, response) {
        const roleId = request.query.roleId;

        if (roleId) {
          return _this.getOne(roleId, request, response);
        } else {
          return _this.getAll(request, response);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    roles_defineProperty(this, "getOne",
    /*#__PURE__*/
    function () {
      var _ref2 = roles_asyncToGenerator(function* (id, request, response) {
        const {
          result,
          error
        } = yield _this.service.getRole(id);
        return _this.buildResult(result, error, response, definitions_requestAction.GET);
      });

      return function (_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }());

    roles_defineProperty(this, "getAll",
    /*#__PURE__*/
    function () {
      var _ref3 = roles_asyncToGenerator(function* (request, response) {
        const {
          result,
          error
        } = yield _this.service.getAllRoles();
        return _this.buildResult(result, error, response, definitions_requestAction.GET_ALL);
      });

      return function (_x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }());

    this.roles = allowedRoles;
    this.router = external_express_default.a.Router();
    this.setupRoutes(this.router);
  }

  getRoute() {
    return this.routing;
  }

  getRouter() {
    return this.router;
  }

  setupRoutes(router) {
    router.get('/', token_validator, access_validator(...this.roles), this.get);
    ;
  }

}

/* harmony default export */ var api_roles = (roles_Roles);
// EXTERNAL MODULE: external "@hapi/joi"
var joi_ = __webpack_require__(1);
var joi_default = /*#__PURE__*/__webpack_require__.n(joi_);

// CONCATENATED MODULE: ./src/server/validation/schemas/authentication/blueprint.ts



const CREDENTIALS = Symbol('credentials');
const schamaType = {
  CREDENTIALS
};
const validateCredentials = data => {
  const schema = joi_default.a.object({
    email: joi_default.a.string().required().email(),
    password: joi_default.a.string().required().min(server_config.validation.passwords.MIN_LENGTH).max(server_config.validation.passwords.MAX_LEGHTH)
  });
  return {
    message: SchemaValidation.CREATE_DATA('credentials'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
/* harmony default export */ var blueprint = (schamaType);
// CONCATENATED MODULE: ./src/server/validation/schemas/user/blueprint.ts




const USER_CREATE = Symbol('user_create');
const USER_UPDATE = Symbol('user_update');
const USER_QUERY = Symbol('user_query');
const USER_PASSORD = Symbol('user_password');
const blueprint_schamaType = {
  USER_QUERY,
  USER_CREATE,
  USER_UPDATE,
  USER_PASSORD
};
const validateUserCreate = data => {
  const schema = joi_default.a.object({
    name: joi_default.a.string().required(),
    email: joi_default.a.string().required().email(),
    password: joi_default.a.string().required().min(server_config.validation.passwords.MIN_LENGTH).max(server_config.validation.passwords.MAX_LEGHTH)
  });
  return {
    message: SchemaValidation.CREATE_DATA('user'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
const validateUserUpdate = data => {
  const schema = joi_default.a.object({
    name: joi_default.a.string().optional(),
    email: joi_default.a.string().optional().email(),
    active: joi_default.a.boolean().optional().required(),
    role: joi_default.a.string().optional().allow(...ALL).only(),
    password: joi_default.a.string().optional().min(server_config.validation.passwords.MIN_LENGTH).max(server_config.validation.passwords.MAX_LEGHTH)
  });
  return {
    message: SchemaValidation.CREATE_DATA('user'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
const validatePasswordUpdate = data => {
  const schema = joi_default.a.object({
    userId: joi_default.a.string().required(),
    oldPassword: joi_default.a.string().required().min(server_config.validation.passwords.MIN_LENGTH).max(server_config.validation.passwords.MAX_LEGHTH),
    newPassword: joi_default.a.string().required().min(server_config.validation.passwords.MIN_LENGTH).max(server_config.validation.passwords.MAX_LEGHTH)
  });
  return {
    message: SchemaValidation.CREATE_DATA('user'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
/* harmony default export */ var user_blueprint = (blueprint_schamaType);
// CONCATENATED MODULE: ./src/server/validation/schemas/invitation/blueprint.ts



const INVITATION_CREATE = Symbol('invitation_create');
const INVITATION_UPDATE = Symbol('invitation_update');
const INVITATION_QUERY = Symbol('invitation_query');
const invitation_blueprint_schamaType = {
  INVITATION_CREATE,
  INVITATION_UPDATE,
  INVITATION_QUERY
};
const validateInviteCreate = data => {
  const schema = joi_default.a.object({
    email: joi_default.a.string().required().email(),
    role: joi_default.a.string().required().allow(...ALL).only(),
    expirationTime: joi_default.a.number().optional()
  });
  return {
    message: SchemaValidation.CREATE_DATA('invitation'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
const validateInviteUpdate = data => {
  const schema = joi_default.a.object({
    email: joi_default.a.string().optional().email(),
    role: joi_default.a.string().optional().allow(...ALL).only(),
    expirationTime: joi_default.a.number().optional()
  });
  return {
    message: SchemaValidation.UPDATE_DATA('invitation'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
const validateInviteQuery = data => {
  const {
    id,
    inviteId
  } = data;

  if (id) {
    data._id = id;
    delete data.id;
  }

  if (inviteId) {
    data._id = inviteId;
    delete data.inviteId;
  }

  const schema = joi_default.a.object({
    _id: joi_default.a.string().optional(),
    inviteId: joi_default.a.string().optional(),
    email: joi_default.a.string().optional().email(),
    role: joi_default.a.string().optional().allow(...ALL).only()
  }).or('_id', 'email');
  return {
    message: SchemaValidation.FETCH_DATA('invitation'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
/* harmony default export */ var invitation_blueprint = (invitation_blueprint_schamaType);
// CONCATENATED MODULE: ./src/server/validation/schemas/priviledge/blueprint.ts



const PRIVILEDGE_CREATE = Symbol('priviledge_create');
const PRIVILEDGE_UPDATE = Symbol('priviledge_update');
const PRIVILEDGE_QUERY = Symbol('priviledge_query');
const priviledge_blueprint_schamaType = {
  PRIVILEDGE_CREATE,
  PRIVILEDGE_UPDATE,
  PRIVILEDGE_QUERY
};
const validatePriviledgeCreate = data => {
  if (data.permissions) {
    const permissionSchema = joi_default.a.object({
      permission: joi_default.a.string().required().allow(...priviledge_store_ALL).only()
    });

    for (const permission of data.permissions) {
      const result = permissionSchema.validate({
        permission
      }, {
        abortEarly: false
      });

      if (result.error) {
        return {
          message: SchemaValidation.CREATE_DATA('priviledge'),
          result: result
        };
      }
    }

    ;
  }

  const schema = joi_default.a.object({
    userId: joi_default.a.string().required(),
    permissions: joi_default.a.array().required(),
    controller: joi_default.a.string().required()
  });
  return {
    message: SchemaValidation.CREATE_DATA('priviledge'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
const validatePriviledgeUpdate = data => {
  const schema = joi_default.a.object({
    userId: joi_default.a.string().required(),
    permissions: joi_default.a.array().required(),
    controller: joi_default.a.string().required()
  });
  return {
    message: SchemaValidation.UPDATE_DATA('priviledge'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
const validatePriviledgeQuery = data => {
  const schema = joi_default.a.object({
    userId: joi_default.a.string().required(),
    controller: joi_default.a.string().optional()
  });
  return {
    message: SchemaValidation.FETCH_DATA('priviledge'),
    result: schema.validate(data, {
      abortEarly: false
    })
  };
};
/* harmony default export */ var priviledge_blueprint = (priviledge_blueprint_schamaType);
// CONCATENATED MODULE: ./src/server/middleware/validators/body.validator.ts








function validate(schemaType) {
  return (request, response, next) => {
    const data = request.body;
    const query = request.query;
    const method = request.method;
    if (!data) return next({
      error: 'No data has been specified in the body'
    });

    switch (method) {
      case GET:
        return buildResponse(handleRetrieval(schemaType, data, query), request, response, next);

      case PUT:
        return buildResponse(handleCreation(schemaType, data), request, response, next);

      case POST:
        return buildResponse(handlePosting(schemaType, data), request, response, next);

      case PATCH:
        return buildResponse(handleUpdate(schemaType, data), request, response, next);

      case httpMethod_DELETE:
        return buildResponse(handleDeletion(schemaType, data), request, response, next);
    }
  };
}

function handlePosting(schemaType, data) {
  switch (schemaType) {
    case CREDENTIALS:
      return validateCredentials(data);
  }

  return null;
}

function handleDeletion(schemaType, data) {
  switch (schemaType) {
    case PRIVILEDGE_QUERY:
      return validatePriviledgeQuery(data);
  }

  return null;
}

function handleRetrieval(schemaType, data, query) {
  const hasProps = Object.keys(query).length > 0;

  if (hasProps) {
    switch (schemaType) {
      case INVITATION_QUERY:
        return validateInviteQuery(query);

      case PRIVILEDGE_QUERY:
        return validatePriviledgeQuery(data);
    }
  }

  return null;
}

function handleCreation(schemaType, data) {
  switch (schemaType) {
    case USER_CREATE:
      return validateUserCreate(data);

    case INVITATION_CREATE:
      return validateInviteCreate(data);

    case PRIVILEDGE_CREATE:
      return validatePriviledgeCreate(data);
  }

  return null;
}

function handleUpdate(schemaType, data) {
  switch (schemaType) {
    case INVITATION_UPDATE:
      return validateInviteUpdate(data);

    case PRIVILEDGE_UPDATE:
      return validatePriviledgeUpdate(data);
  }

  return null;
}

function isEmptyObject(obj) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function buildResponse(validation, request, response, next) {
  if (validation === null) return next();
  const {
    error,
    value
  } = validation.result;

  if (error) {
    const validateResponse = new ValidationResponse();
    const errors = error.message.split('.');

    if (errors.length > 0) {
      const messages = errors.map(x => x.trim().replace(/"/g, ''));
      validateResponse.errors.push(...messages);
    } else {
      const message = error.message.replace(/"/g, '');
      validateResponse.errors.push(message);
    }

    validateResponse.message = validation.message;
    validateResponse.valid = false;
    return response.status(httpCode.BAD_REQUEST).json(validateResponse);
  }

  if (value) {
    request.data = value;
  }

  return next();
}

/* harmony default export */ var body_validator = (validate);
// CONCATENATED MODULE: ./src/server/controllers/restful/api/users.ts
function users_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function users_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { users_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { users_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function users_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class users_Users extends controllers_controller {
  constructor(...allowedRoles) {
    var _this;

    super('user');
    _this = this;

    users_defineProperty(this, "userService", new user_service_UserService());

    users_defineProperty(this, "routing", '/rest/api/users');

    users_defineProperty(this, "router", void 0);

    users_defineProperty(this, "roles", void 0);

    users_defineProperty(this, "get",
    /*#__PURE__*/
    function () {
      var _ref = users_asyncToGenerator(function* (request, response) {
        const hasProps = request.data ? Object.keys(request.data).length > 0 : null;

        if (hasProps) {
          return _this.getOne(request.data, response);
        } else {
          return _this.getAll(response);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    users_defineProperty(this, "getOne",
    /*#__PURE__*/
    function () {
      var _ref2 = users_asyncToGenerator(function* (query, response) {
        const {
          result,
          error
        } = yield _this.userService.getUserWhere(query);
        return _this.buildResult(result, error, response, definitions_requestAction.GET);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());

    users_defineProperty(this, "getAll",
    /*#__PURE__*/
    function () {
      var _ref3 = users_asyncToGenerator(function* (response) {
        const {
          result,
          error
        } = yield _this.userService.getAllUsers();
        return _this.buildResult(result, error, response, definitions_requestAction.GET_ALL);
      });

      return function (_x5) {
        return _ref3.apply(this, arguments);
      };
    }());

    users_defineProperty(this, "create",
    /*#__PURE__*/
    function () {
      var _ref4 = users_asyncToGenerator(function* (request, response) {
        const data = request.data;
        const {
          result,
          error
        } = yield _this.userService.registerUser(data);
        return _this.buildResult(result, error, response, definitions_requestAction.CREATE);
      });

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }());

    users_defineProperty(this, "update",
    /*#__PURE__*/
    function () {
      var _ref5 = users_asyncToGenerator(function* (request, response) {
        const userId = request.query.userId || request.user.userId;
        const {
          result,
          error
        } = yield _this.userService.updateUser(userId, request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.UPDATE);
      });

      return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }());

    users_defineProperty(this, "delete",
    /*#__PURE__*/
    function () {
      var _ref6 = users_asyncToGenerator(function* (request, response) {
        const userId = request.query.userId;
        const {
          result,
          error
        } = yield _this.userService.deleteUser(userId);
        return _this.buildResult(result, error, response, definitions_requestAction.DELETE);
      });

      return function (_x10, _x11) {
        return _ref6.apply(this, arguments);
      };
    }());

    users_defineProperty(this, "updatePassword",
    /*#__PURE__*/
    function () {
      var _ref7 = users_asyncToGenerator(function* (request, response) {
        const userId = request.query.userId || request.user.userId;
        const {
          result,
          error
        } = yield _this.userService.updateUserPassword(userId, request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.UPDATE);
      });

      return function (_x12, _x13) {
        return _ref7.apply(this, arguments);
      };
    }());

    this.roles = allowedRoles;
    this.router = external_express_default.a.Router();
    this.setupRoutes(this.router);
  }

  getRoute() {
    return this.routing;
  }

  getRouter() {
    return this.router;
  }

  setupRoutes(router) {
    router.get('/', token_validator, access_validator(...this.roles), body_validator(user_blueprint.USER_QUERY), this.get);
    router.put('/', token_validator, access_validator(...this.roles), body_validator(user_blueprint.USER_CREATE), this.create);
    router.delete('/', token_validator, access_validator(...this.roles), this.delete);
    router.patch('/', token_validator, access_validator(ROOT, ADMIN), body_validator(user_blueprint.USER_UPDATE), this.update);
    router.put('/password', token_validator, access_validator(ROOT, ADMIN), body_validator(user_blueprint.USER_PASSORD), this.updatePassword);
  }

}

/* harmony default export */ var api_users = (users_Users);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./src/client/config.ts
const config_config = Object.freeze({
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
    images: file => `client/resources/images/${file}`
  },
  httpMethods: {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    PATCH: 'patch',
    DELETE: 'delete'
  }
});
/* harmony default export */ var client_config = (config_config);
// CONCATENATED MODULE: ./src/client/components/common/Wrapper.jsx


class Wrapper_Wrapper extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement(external_react_default.a.Fragment, null, this.props.children);
  }

}

/* harmony default export */ var common_Wrapper = (Wrapper_Wrapper);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/content/ContentSection.jsx


class ContentSection_ContentSection extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement("article", {
      className: "content"
    }, external_react_default.a.createElement("div", null));
  }

}

/* harmony default export */ var content_ContentSection = (ContentSection_ContentSection);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/content/ContentArea.jsx



class ContentArea_ContentArea extends external_react_default.a.PureComponent {
  componentDidMount() {}

  render() {
    return external_react_default.a.createElement("div", {
      className: "content-wrapper"
    }, external_react_default.a.createElement(content_ContentSection, null), external_react_default.a.createElement(content_ContentSection, null), external_react_default.a.createElement(content_ContentSection, null), external_react_default.a.createElement(content_ContentSection, null), external_react_default.a.createElement(content_ContentSection, null), external_react_default.a.createElement(content_ContentSection, null));
  }

}

/* harmony default export */ var content_ContentArea = (ContentArea_ContentArea);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/footer/FooterArea.jsx


class FooterArea_FooterArea extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement("footer", {
      className: "footer"
    });
  }

}

/* harmony default export */ var footer_FooterArea = (FooterArea_FooterArea);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/sidebar/SidebarSubItem.jsx


class SidebarSubItem_SidebarSubItem extends external_react_default.a.PureComponent {
  render() {
    const hash = this.props.hash;
    const label = this.props.label;
    const method = this.props.method;
    return external_react_default.a.createElement("li", {
      className: "sub-menu-item"
    }, external_react_default.a.createElement("h3", {
      className: "http-method http-all"
    }, method), external_react_default.a.createElement("a", {
      className: "truncate",
      href: hash
    }, label), external_react_default.a.createElement("i", {
      className: "material-icons"
    }, "chevron_right"));
  }

}

/* harmony default export */ var sidebar_SidebarSubItem = (SidebarSubItem_SidebarSubItem);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/sidebar/SidebarSubMenu.jsx




class SidebarSubMenu_SidebarSubMenu extends external_react_default.a.PureComponent {
  render() {
    const links = [{
      label: 'Register dfsd sfsds sdssssuser',
      method: {
        label: 'PUT'
      }
    }, {
      label: 'Get all users',
      method: {
        label: 'GET'
      }
    }, {
      label: 'Update user',
      method: {
        label: 'PAT'
      }
    }, {
      label: 'Delete user',
      method: {
        label: 'DEL'
      }
    }];
    return external_react_default.a.createElement("ul", {
      className: "sub-menu"
    }, links.map(x => external_react_default.a.createElement(sidebar_SidebarSubItem, {
      hash: '#' + x,
      label: x.label,
      method: x.method.label
    })));
  }

}

/* harmony default export */ var sidebar_SidebarSubMenu = (SidebarSubMenu_SidebarSubMenu);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/sidebar/SidebarMenuItem.jsx



const classes = {};

class SidebarMenuItem_SidebarMenuItem extends external_react_default.a.PureComponent {
  render() {
    const hash = this.props.hash;
    const label = this.props.label;
    return external_react_default.a.createElement("div", null, external_react_default.a.createElement("li", {
      className: "menu-item"
    }, external_react_default.a.createElement("a", {
      href: hash
    }, label), external_react_default.a.createElement("i", {
      className: "material-icons"
    }, "chevron_right")), external_react_default.a.createElement(sidebar_SidebarSubMenu, null));
  }

}

/* harmony default export */ var sidebar_SidebarMenuItem = (SidebarMenuItem_SidebarMenuItem);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/sidebar/SidebarSearch.jsx
function SidebarSearch_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SidebarSearch_SidebarSearch extends external_react_default.a.PureComponent {
  constructor(...args) {
    super(...args);

    SidebarSearch_defineProperty(this, "performSearch", e => {
      e.preventDefault();
      console.log('Search');
    });
  }

  render() {
    return external_react_default.a.createElement("form", {
      className: "search-form shadow-elevate",
      method: "post"
    }, external_react_default.a.createElement("input", {
      type: "text",
      className: "textbox",
      placeholder: "Search"
    }), external_react_default.a.createElement("button", {
      id: "search",
      title: "Search",
      value: "",
      className: "button",
      onClick: this.performSearch
    }, external_react_default.a.createElement("i", {
      className: "material-icons search-icon"
    }, "search")));
  }

}

/* harmony default export */ var sidebar_SidebarSearch = (SidebarSearch_SidebarSearch);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/sidebar/SidebarMenu.jsx




class SidebarMenu_SidebarMenu extends external_react_default.a.PureComponent {
  render() {
    const links = ['Quickstart', 'Basics'];
    const routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation', 'Roles', 'Invitation', 'Roles', 'Invitation'];
    const headers = ['Introduction', 'Endpoints'];
    const version = '1.3.5';
    return external_react_default.a.createElement("aside", {
      className: "side-menu natural"
    }, external_react_default.a.createElement("div", {
      className: "top-section"
    }, external_react_default.a.createElement("div", {
      className: "version-wrapper"
    }, external_react_default.a.createElement("h2", null, "Api Name"), external_react_default.a.createElement("h5", null, "version: ", version)), external_react_default.a.createElement("div", {
      id: "sidebar-toggle",
      title: "expand",
      value: "",
      className: "expand"
    }, external_react_default.a.createElement("i", {
      className: "material-icons expand-icon"
    }, "chevron_right"))), external_react_default.a.createElement(sidebar_SidebarSearch, null), external_react_default.a.createElement("h2", {
      className: "menu-header"
    }, headers[0]), external_react_default.a.createElement("ul", {
      className: "middle-section"
    }, links.map(x => external_react_default.a.createElement(sidebar_SidebarMenuItem, {
      hash: '#' + x,
      label: x
    }))), external_react_default.a.createElement("h2", {
      className: "menu-header"
    }, headers[1]), external_react_default.a.createElement("ul", {
      className: "main-section"
    }, routes.map(x => external_react_default.a.createElement(sidebar_SidebarMenuItem, {
      hash: '#' + x,
      label: x
    }))));
  }

}

/* harmony default export */ var sidebar_SidebarMenu = (SidebarMenu_SidebarMenu);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/sandbox/SandboxSection.jsx


class SandboxSection_SandboxSection extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement("div", null);
  }

}

/* harmony default export */ var sandbox_SandboxSection = (SandboxSection_SandboxSection);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/children/sandbox/SandboxArea.jsx



class SandboxArea_SandboxArea extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement("aside", {
      className: "sandbox-area natural-sb bottom-sb"
    }, external_react_default.a.createElement(sandbox_SandboxSection, null), external_react_default.a.createElement(sandbox_SandboxSection, null), external_react_default.a.createElement(sandbox_SandboxSection, null), external_react_default.a.createElement(sandbox_SandboxSection, null), external_react_default.a.createElement(sandbox_SandboxSection, null));
  }

}

/* harmony default export */ var sandbox_SandboxArea = (SandboxArea_SandboxArea);
// CONCATENATED MODULE: ./src/client/components/tabs/documentation/DocsPage.jsx







class DocsPage_DocsPage extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement(common_Wrapper, null, external_react_default.a.createElement(sidebar_SidebarMenu, null), external_react_default.a.createElement(sandbox_SandboxArea, null), external_react_default.a.createElement(content_ContentArea, null), external_react_default.a.createElement(footer_FooterArea, null));
  }

}

/* harmony default export */ var documentation_DocsPage = (DocsPage_DocsPage);
// CONCATENATED MODULE: ./src/client/components/tabs/information/AboutPage.jsx


class AboutPage_AboutPage extends external_react_default.a.PureComponent {
  componentDidMount() {}

  render() {
    return external_react_default.a.createElement(external_react_default.a.Fragment, null);
  }

}

/* harmony default export */ var information_AboutPage = (AboutPage_AboutPage);
// CONCATENATED MODULE: ./src/client/components/tabs/administration/AdminPage.jsx


class AdminPage_AdminPage extends external_react_default.a.PureComponent {
  componentDidMount() {}

  render() {
    return external_react_default.a.createElement(external_react_default.a.Fragment, null);
  }

}

/* harmony default export */ var administration_AdminPage = (AdminPage_AdminPage);
// CONCATENATED MODULE: ./src/client/components/common/Lost.jsx


class Lost_Lost extends external_react_default.a.PureComponent {
  componentDidMount() {}

  render() {
    return external_react_default.a.createElement("h2", null, "404 Not Found");
  }

}

/* harmony default export */ var common_Lost = (Lost_Lost);
// CONCATENATED MODULE: ./src/client/routes.ts





/* harmony default export */ var client_routes = ([{
  path: '/',
  component: documentation_DocsPage
}, {
  path: '/documentation',
  component: documentation_DocsPage
}, {
  path: '/about',
  component: information_AboutPage
}, {
  path: '/admin',
  component: administration_AdminPage
}, {
  path: '*',
  component: common_Lost
}]);
// EXTERNAL MODULE: external "react-dom/server"
var server_ = __webpack_require__(19);
var server_default = /*#__PURE__*/__webpack_require__.n(server_);

// CONCATENATED MODULE: ./src/server/controllers/controller.view.ts
function controller_view_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ViewController {
  constructor(name) {
    controller_view_defineProperty(this, "name", void 0);

    this.name = name;
  }

}

/* harmony default export */ var controller_view = (ViewController);
// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__(20);
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(6);

// CONCATENATED MODULE: ./src/client/services/routings.service.ts
function routings_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function routings_service_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { routings_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { routings_service_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function routings_service_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RoutingService {
  constructor() {
    routings_service_defineProperty(this, "getAll",
    /*#__PURE__*/
    routings_service_asyncToGenerator(function* () {
      return {
        routings: ['Users', 'Roles', 'Invitations', 'Priviledges'],
        error: null
      };
    }));
  }

}
// CONCATENATED MODULE: ./src/client/actions/router.action.ts
function router_action_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function router_action_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { router_action_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { router_action_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


const LOADING_ROUTINGS = 'LOADING_ROUTINGS';
const GET_ALL_ROUTINGS = 'GET_ALL_ROUTINGS';
const ERROR_EVENT = 'ROUTINGS_ERROR';
const getAllRoutings = () =>
/*#__PURE__*/
function () {
  var _ref = router_action_asyncToGenerator(function* (dispatch) {
    dispatch(loading());
    const service = new RoutingService();
    const {
      error,
      routings
    } = yield service.getAll();
    if (error) return dispatch(onError(error));
    dispatch({
      type: GET_ALL_ROUTINGS,
      payload: routings
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
const loading = () => {
  return {
    type: LOADING_ROUTINGS
  };
};
const onError = error => {
  return {
    type: ERROR_EVENT,
    payload: error
  };
};
// CONCATENATED MODULE: ./src/client/reducers/common/routings.reducer.ts

const routings_reducer_initialState = {
  routings: [],
  loading: false,
  error: null
};
/* harmony default export */ var routings_reducer = (function (state = routings_reducer_initialState, action) {
  switch (action.type) {
    case LOADING_ROUTINGS:
      return { ...state,
        loading: true
      };

    case GET_ALL_ROUTINGS:
      return { ...state,
        routings: action.payload,
        loading: false
      };

    case ERROR_EVENT:
      return { ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/client/actions/navbar.action.ts
const LOADING_NAVBAR = 'LOADING_REPORT';
const GET_NAVBAR_ITEMS = 'GET_ALL_REPORTS';
const getAllReports = () => {
  return {
    type: GET_NAVBAR_ITEMS
  };
};
const setReportsLoading = () => {
  return {
    type: LOADING_NAVBAR
  };
};
// CONCATENATED MODULE: ./src/client/reducers/common/navbar.reducer.ts

const navbar_reducer_initialState = {
  items: [],
  loading: false
};
/* harmony default export */ var navbar_reducer = (function (state = navbar_reducer_initialState, action) {
  switch (action.type) {
    case LOADING_NAVBAR:
      return { ...state,
        loading: true
      };

    case GET_NAVBAR_ITEMS:
      return { ...state
      };

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/client/reducers/index.ts



/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  routings: routings_reducer,
  items: navbar_reducer
}));
// CONCATENATED MODULE: ./src/client/store.ts



function configureStore(initialState) {
  const middleWare = [external_redux_thunk_default.a];
  const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || external_redux_["compose"];
  const store = Object(external_redux_["createStore"])(reducers, initialState, composeEnhancers(Object(external_redux_["applyMiddleware"])(...middleWare)));
  return store;
}
// EXTERNAL MODULE: ./src/client/components/shared/navbar/stylings.scss
var stylings = __webpack_require__(3);
var stylings_default = /*#__PURE__*/__webpack_require__.n(stylings);

// EXTERNAL MODULE: ./src/client/resources/images/brandlogo.png
var brandlogo = __webpack_require__(21);
var brandlogo_default = /*#__PURE__*/__webpack_require__.n(brandlogo);

// EXTERNAL MODULE: external "isomorphic-style-loader/withStyles"
var withStyles_ = __webpack_require__(5);
var withStyles_default = /*#__PURE__*/__webpack_require__.n(withStyles_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(8);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-router-dom"
var external_react_router_dom_ = __webpack_require__(7);

// CONCATENATED MODULE: ./src/client/components/shared/navbar/Navbar.jsx
function Navbar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Navbar_Navbar extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    Navbar_defineProperty(this, "handleLinkClick", (e, tab) => {
      this.state.activetTab = tab;
      console.log(this.state.activetTab);
    });

    this.state = this.props;
  }
  /**
   * @param {React.MouseEvent<HTMLElement, MouseEvent>} e
   */


  render() {
    const routes = this.props.routings;
    return external_react_default.a.createElement("header", {
      id: "navbar",
      className: stylings_default.a.nav
    }, external_react_default.a.createElement("div", {
      className: stylings_default.a.logo
    }, external_react_default.a.createElement("img", {
      className: stylings_default.a.logoImage,
      src: brandlogo_default.a
    }), external_react_default.a.createElement("div", {
      className: stylings_default.a.logoText
    }, external_react_default.a.createElement("a", {
      href: "/"
    }, this.props.brandName))), external_react_default.a.createElement("ul", null, routes.map((element, idx) => external_react_default.a.createElement("li", {
      key: idx
    }, external_react_default.a.createElement(external_react_router_dom_["Link"], {
      onClick: e => this.handleLinkClick(e, {
        index: idx,
        label: element.label
      }),
      className: stylings_default.a.link,
      to: element.link
    }, element.label)))));
  }

}

Navbar_Navbar.propTypes = {
  routings: external_prop_types_default.a.arrayOf(external_prop_types_default.a.any),
  activeTab: external_prop_types_default.a.any,
  brandName: external_prop_types_default.a.string
};
/* harmony default export */ var navbar_Navbar = (withStyles_default()(stylings_default.a)(Navbar_Navbar));
// CONCATENATED MODULE: ./src/client/components/shared/navbar/NavbarPadder.jsx




class NavbarPadder_NavbarPadder extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement("header", {
      className: stylings_default.a.navPadder
    });
  }

}

/* harmony default export */ var navbar_NavbarPadder = (withStyles_default()(stylings_default.a)(NavbarPadder_NavbarPadder));
// EXTERNAL MODULE: ./src/client/styles/app.css
var app = __webpack_require__(22);
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// CONCATENATED MODULE: ./src/client/components/App.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }










const App_routings = [{
  label: 'Documentation',
  link: '/documentation'
}, {
  label: 'About',
  link: '/about'
}, {
  label: 'Admin',
  link: '/admin'
}];

class App_App extends external_react_default.a.PureComponent {
  render() {
    return external_react_default.a.createElement(common_Wrapper, {
      className: "App"
    }, external_react_default.a.createElement(navbar_NavbarPadder, null), external_react_default.a.createElement(external_react_router_dom_["Switch"], null, client_routes.map((route, idx) => external_react_default.a.createElement(external_react_router_dom_["Route"], _extends({
      exact: true,
      key: idx
    }, route)))), external_react_default.a.createElement(navbar_Navbar, {
      brandName: client_config.app.NAME,
      routings: App_routings
    }));
  }

}

/* harmony default export */ var components_App = (withStyles_default()(app_default.a)(App_App));
// EXTERNAL MODULE: external "isomorphic-style-loader/StyleContext"
var StyleContext_ = __webpack_require__(11);
var StyleContext_default = /*#__PURE__*/__webpack_require__.n(StyleContext_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(12);

// EXTERNAL MODULE: external "react-router"
var external_react_router_ = __webpack_require__(13);

// CONCATENATED MODULE: ./src/client/views/template.jsx





const template_client = (store, insertCss) => external_react_default.a.createElement(external_react_redux_["Provider"], {
  store: store
}, external_react_default.a.createElement(external_react_router_["BrowserRouter"], null, external_react_default.a.createElement(StyleContext_default.a.Provider, {
  value: {
    insertCss
  }
}, external_react_default.a.createElement(components_App, null))));
const server = (url, store, context, insertCss) => external_react_default.a.createElement(external_react_redux_["Provider"], {
  store: store
}, external_react_default.a.createElement(external_react_router_["StaticRouter"], {
  location: url,
  context: context
}, external_react_default.a.createElement(StyleContext_default.a.Provider, {
  value: {
    insertCss
  }
}, external_react_default.a.createElement(components_App, null))));
// CONCATENATED MODULE: ./src/client/controllers/index.ts
function controllers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class controllers_IndexController extends controller_view {
  constructor() {
    super('index');

    controllers_defineProperty(this, "routing", '/');

    controllers_defineProperty(this, "router", void 0);

    controllers_defineProperty(this, "context", void 0);

    controllers_defineProperty(this, "store", void 0);

    controllers_defineProperty(this, "css", void 0);

    controllers_defineProperty(this, "renderRoutes", (req, res) => {
      const client = client_config.app.CSR;
      const state = this.store.getState();

      const insertCss = (...styles) => styles.forEach(style => this.css.add(style._getCss()));

      res.type(client_config.layout.CONTENT_TYPE);
      res.header(client_config.header.LABEL, client_config.header.VALUE);
      res.render(client_config.layout.TEMPLATE, {
        css: this.css,
        title: client_config.app.NAME,
        state: JSON.stringify(state),
        content: server_default.a.renderToString(client ? external_react_default.a.createElement('') : server(req.url, this.store, this.context, insertCss))
      });
    });

    this.context = {};
    this.router = external_express_default.a.Router();
    this.store = configureStore({});
    this.css = new Set();
    this.setupRoutes(this.router);
  }

  getRoute() {
    return this.routing;
  }

  getRouter() {
    return this.router;
  }

  setupRoutes(router) {
    client_routes.map(x => router.get(x.path, this.renderRoutes));
  }

}

/* harmony default export */ var controllers = (controllers_IndexController);
// CONCATENATED MODULE: ./src/server/controllers/restful/api/invitations.ts
function invitations_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function invitations_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { invitations_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { invitations_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function invitations_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class invitations_Invitations extends controllers_controller {
  constructor(...allowedRoles) {
    var _this;

    super('invitation');
    _this = this;

    invitations_defineProperty(this, "invitationService", new invitation_service_InviationService());

    invitations_defineProperty(this, "routing", '/rest/api/invitations');

    invitations_defineProperty(this, "router", void 0);

    invitations_defineProperty(this, "roles", void 0);

    invitations_defineProperty(this, "get",
    /*#__PURE__*/
    function () {
      var _ref = invitations_asyncToGenerator(function* (request, response) {
        const hasProps = request.data ? Object.keys(request.data).length > 0 : null;

        if (hasProps) {
          return _this.getOne(request.data, response);
        } else {
          return _this.getAll(response);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    invitations_defineProperty(this, "getOne",
    /*#__PURE__*/
    function () {
      var _ref2 = invitations_asyncToGenerator(function* (query, response) {
        const {
          result,
          error
        } = yield _this.invitationService.getInvitationWhere(query);
        return _this.buildResult(result, error, response, definitions_requestAction.GET);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());

    invitations_defineProperty(this, "getAll",
    /*#__PURE__*/
    function () {
      var _ref3 = invitations_asyncToGenerator(function* (response) {
        const {
          result,
          error
        } = yield _this.invitationService.getAllInvitations();
        return _this.buildResult(result, error, response, definitions_requestAction.GET_ALL);
      });

      return function (_x5) {
        return _ref3.apply(this, arguments);
      };
    }());

    invitations_defineProperty(this, "create",
    /*#__PURE__*/
    function () {
      var _ref4 = invitations_asyncToGenerator(function* (request, response) {
        const {
          result,
          error
        } = yield _this.invitationService.createInvitation(null, request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.CREATE);
      });

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }());

    invitations_defineProperty(this, "update",
    /*#__PURE__*/
    function () {
      var _ref5 = invitations_asyncToGenerator(function* (request, response) {
        const inviteId = request.query.inviteId;
        const {
          result,
          error
        } = yield _this.invitationService.updateInvitation(inviteId, request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.UPDATE);
      });

      return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }());

    invitations_defineProperty(this, "delete",
    /*#__PURE__*/
    function () {
      var _ref6 = invitations_asyncToGenerator(function* (request, response) {
        const inviteId = request.query.inviteId;
        const {
          result,
          error
        } = yield _this.invitationService.deleteInvitation(inviteId);
        return _this.buildResult(result, error, response, definitions_requestAction.DELETE);
      });

      return function (_x10, _x11) {
        return _ref6.apply(this, arguments);
      };
    }());

    this.roles = allowedRoles;
    this.router = external_express_default.a.Router();
    this.setupRoutes(this.router);
  }

  getRoute() {
    return this.routing;
  }

  getRouter() {
    return this.router;
  }

  setupRoutes(router) {
    router.get('/', token_validator, access_validator(...this.roles), body_validator(invitation_blueprint.INVITATION_QUERY), this.get);
    router.put('/', token_validator, access_validator(...this.roles), body_validator(invitation_blueprint.INVITATION_CREATE), this.create);
    router.patch('/', token_validator, access_validator(...this.roles), body_validator(invitation_blueprint.INVITATION_UPDATE), this.update);
    router.delete('/', token_validator, access_validator(...this.roles), this.delete);
  }

}

/* harmony default export */ var api_invitations = (invitations_Invitations);
// CONCATENATED MODULE: ./src/server/controllers/restful/api/priviledges.ts
function priviledges_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function priviledges_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { priviledges_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { priviledges_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function priviledges_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class priviledges_Priviledges extends controllers_controller {
  constructor(...allowedRoles) {
    var _this;

    super('priviledge');
    _this = this;

    priviledges_defineProperty(this, "priviledgeService", new priviledge_service_AccessPriviledgeService());

    priviledges_defineProperty(this, "routing", '/rest/api/priviledges');

    priviledges_defineProperty(this, "router", void 0);

    priviledges_defineProperty(this, "roles", void 0);

    priviledges_defineProperty(this, "getAll",
    /*#__PURE__*/
    function () {
      var _ref = priviledges_asyncToGenerator(function* (request, response) {
        const {
          result,
          error
        } = yield _this.priviledgeService.getPriviledges(request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.GET_ALL);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    priviledges_defineProperty(this, "create",
    /*#__PURE__*/
    function () {
      var _ref2 = priviledges_asyncToGenerator(function* (request, response) {
        const {
          result,
          error
        } = yield _this.priviledgeService.createPriviledge(request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.CREATE);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());

    priviledges_defineProperty(this, "update",
    /*#__PURE__*/
    function () {
      var _ref3 = priviledges_asyncToGenerator(function* (request, response) {
        const {
          result,
          error
        } = yield _this.priviledgeService.updatePriviledge(request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.UPDATE);
      });

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());

    priviledges_defineProperty(this, "delete",
    /*#__PURE__*/
    function () {
      var _ref4 = priviledges_asyncToGenerator(function* (request, response) {
        const {
          result,
          error
        } = yield _this.priviledgeService.revokePriviledge(request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.DELETE);
      });

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }());

    this.roles = allowedRoles;
    this.router = external_express_default.a.Router();
    this.setupRoutes(this.router);
  }

  getRoute() {
    return this.routing;
  }

  getRouter() {
    return this.router;
  }

  setupRoutes(router) {
    router.get('/', token_validator, access_validator(...this.roles), body_validator(priviledge_blueprint.PRIVILEDGE_QUERY), this.getAll);
    router.put('/', token_validator, access_validator(...this.roles), body_validator(priviledge_blueprint.PRIVILEDGE_CREATE), this.create);
    router.patch('/', token_validator, access_validator(...this.roles), body_validator(priviledge_blueprint.PRIVILEDGE_UPDATE), this.update);
    router.delete('/', token_validator, access_validator(...this.roles), body_validator(priviledge_blueprint.PRIVILEDGE_QUERY), this.delete);
  }

}

/* harmony default export */ var api_priviledges = (priviledges_Priviledges);
// CONCATENATED MODULE: ./src/server/controllers/restful/api/authentication.ts
function authentication_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function authentication_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { authentication_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { authentication_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function authentication_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class authentication_Authentication extends controllers_controller {
  constructor(...allowedRoles) {
    var _this;

    super('authentication');
    _this = this;

    authentication_defineProperty(this, "service", new authentication_service_AuthenticationService());

    authentication_defineProperty(this, "routing", '/rest/api/authentication');

    authentication_defineProperty(this, "router", void 0);

    authentication_defineProperty(this, "roles", void 0);

    authentication_defineProperty(this, "getCredentials",
    /*#__PURE__*/
    function () {
      var _ref = authentication_asyncToGenerator(function* (request, response) {
        const userId = request.user.userId;
        const {
          result,
          error
        } = yield _this.service.getUser(userId);
        return _this.buildResult(result, error, response, definitions_requestAction.GET);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    authentication_defineProperty(this, "performAuthentication",
    /*#__PURE__*/
    function () {
      var _ref2 = authentication_asyncToGenerator(function* (request, response) {
        const {
          result,
          error
        } = yield _this.service.authenticate(request.data);
        return _this.buildResult(result, error, response, definitions_requestAction.AUTHENTICATE);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());

    authentication_defineProperty(this, "recoverPassword",
    /*#__PURE__*/
    function () {
      var _ref3 = authentication_asyncToGenerator(function* (request, response) {
        const email = request.query.email;
        const {
          result,
          error
        } = yield _this.service.recoverPassword(email);
        return _this.buildResult(result, error, response, definitions_requestAction.RECOVER);
      });

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());

    this.roles = allowedRoles;
    this.router = external_express_default.a.Router();
    this.setupRoutes(this.router);
  }

  getRoute() {
    return this.routing;
  }

  getRouter() {
    return this.router;
  }

  setupRoutes(router) {
    router.get('/', token_validator, this.getCredentials);
    router.put('/recover', this.recoverPassword);
    router.post('/', body_validator(blueprint.CREDENTIALS), this.performAuthentication);
  }

  buildResult(result, error, response, requestAction) {
    const apiResponse = new AuthenticationResponse();

    if (error) {
      switch (requestAction) {
        case definitions_requestAction.GET:
          apiResponse.message = AuthenticationMessages.NOT_FETCHED;
          break;

        case definitions_requestAction.AUTHENTICATE:
          apiResponse.message = AuthenticationMessages.NOT_AUTHORIZED;
          break;

        case definitions_requestAction.RECOVER:
          apiResponse.message = AuthenticationMessages.NOT_RECOVERED;
          break;
      }

      apiResponse.errors.push(error);
      return response.status(httpCode.UNAUTHORIZED).json(apiResponse);
    }

    apiResponse.authorized = !error;
    apiResponse.content = result;
    return response.json(apiResponse);
  }

}

/* harmony default export */ var authentication = (authentication_Authentication);
// CONCATENATED MODULE: ./src/server.ts









const server_args = {
  controllers: [new api_roles(ROOT), new api_users(ROOT, ADMIN, USER), new api_invitations(ROOT, ADMIN), new api_priviledges(ROOT, ADMIN), new authentication(...ALL)],
  viewControllers: [new controllers()],
  interceptor: new interceptor()
};
new application_Application(server_args).startlistening();

/***/ })
/******/ ]);