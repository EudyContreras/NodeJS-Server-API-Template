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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("reselect");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(27);
    var insertCss = __webpack_require__(29);
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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "images/favicon.png";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/StyleContext");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-router");

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

module.exports = require("express-react-views");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("fast-memoize");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/withStyles");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
module.exports = __webpack_require__(30);


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Lato|Montserrat:500|Open+Sans:600|Roboto&display=swap);", ""]);
// Module
exports.push([module.i, ".app__ripple{width:0;height:0;border-radius:50%;background:rgba(255,255,255,0.4);transform:scale(0);position:absolute;opacity:1}.app__ripple-effect{animation:app__rippleDrop .4s linear}@keyframes app__rippleDrop{100%{transform:scale(2);opacity:0}}.app__shadow-elevate{box-shadow:0px 4px 6px rgba(0,0,0,0.12),0 3px 2px rgba(0,0,0,0.24);transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__shadow-elevate:hover{box-shadow:0 8px 18px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)}.app__nav{box-shadow:0px 2px 8px 4px rgba(0,0,0,0.4);align-items:center;background-color:#23282d;padding-top:0.8em;padding-bottom:0.8em;padding-left:1.5em;padding-right:2em;position:absolute;color:#eee;display:flex;height:50px;top:0;left:0;right:0;z-index:2000}.app__nav ul{margin-left:auto;margin-right:1em;list-style:none;display:flex;font-size:0.8em;text-transform:uppercase}.app__nav ul li{display:inline;padding:0 2em;letter-spacing:1px}.app__nav-padder{position:static;background-color:#23282d;padding-top:0.8em;padding-bottom:0.8em;padding-left:1.5em;padding-right:3em;height:50px}.app__nav-transition{transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0.5s}.app__nav-peeky:hover{transform:translateY(0px) !important;transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__nav-peeky:hover .app__nav-link{color:#abacae;transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__nav-sticky .app__nav-link{color:transparent;transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0.35s}.app__nav-sticky{position:fixed;transform:translateY(-62px) !important}.app__nav-logo{display:inline-flex;text-align:center}.app__nav-logo-image{width:40px;height:40px;margin-right:1em}.app__nav-logo-text{margin:auto;font-size:1.2em;display:inline;font-weight:bold}.app__nav-logo-text a{text-decoration:none;color:#eee}.app__nav-link{margin:0 0px;padding-top:0px;padding-bottom:35px;padding-left:1.5em;padding-right:1.5em;position:relative;font-weight:500;text-decoration:none;color:#abacae;-webkit-transition:0.25s;-moz-transition:0.25s;-ms-transition:0.25s;-o-transition:0.25s;transition:0.25s}.app__nav-link:hover{color:white !important}.app__nav-link::before{transform-origin:bottom;border-top-left-radius:8px;border-top-right-radius:8px;content:\"\";bottom:0;left:calc(50% - 15%);clear:both;height:12px;width:30%;background-color:#ee9602;position:absolute;-webkit-transform:scaleX(0),scaleY(0);-ms-transform:scaleX(0) scaleY(0);transform:scaleX(0) scaleY(0);-webkit-transition:0.25s;-moz-transition:0.25s;-ms-transition:0.25s;-o-transition:0.25s;transition:0.25s}.app__nav-link::after{transform-origin:bottom;border-radius:8px;content:\"\";bottom:0;left:0px;clear:both;height:6px;width:100%;background-color:#ee9602;background-color:#54575b;box-shadow:0px 0px 5px 1px rgba(0,0,0,0.4);position:absolute;-webkit-transform:scaleX(0),scaleY(0);-ms-transform:scaleX(0) scaleY(0);transform:scaleX(0) scaleY(0);-webkit-transition:0.25s;-moz-transition:0.25s;-ms-transition:0.25s;-o-transition:0.25s;transition:0.25s}.app__nav-link-active{font-weight:600;color:#cccdce}.app__nav-link-active::before{-webkit-transform:scaleX(1),scaleY(1);-ms-transform:scaleX(1) scaleY(1);transform:scaleX(1) scaleY(1);box-shadow:0px -2px 5px 1px rgba(0,0,0,0.2)}.app__nav-link-active::after{-webkit-transform:scaleX(1),scaleY(1);-ms-transform:scaleX(1) scaleY(1);transform:scaleX(1) scaleY(1);box-shadow:0px 2px 7px 2px rgba(0,0,0,0.3)}.app__status-ripple{background-color:#fff;width:1em;height:1em;margin-left:1em;display:inline-flex;border-radius:50%;animation:app__ripple 2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite}@keyframes app__ripple{0%{box-shadow:0 0 0 0.1em #e4b51d,0 0 0 0.4em #e2a115,0 0 0 0.6em #be870e}50%{box-shadow:0 0 0 0.3em #e4b51d,0 0 0 0.5em #e2a115,0 0 0 0.7em #be870e}100%{box-shadow:0 0 0 0.1em #e4b51d,0 0 0 0.4em #e2a115,0 0 0 0.6em #be870e}}.app__status{width:2em;height:2em;margin-left:1em;display:flex;justify-items:center;justify-content:center;border-radius:50%;align-items:center;background-color:#dc8a00;text-decoration:none;box-shadow:2px 3px 10px 2px rgba(0,0,0,0.4)}.app__status::before{content:\"\";clear:both;width:1.5em;height:1.5em;display:inline-table;align-self:center;justify-self:center;justify-content:center;align-content:center;position:absolute;border-radius:50%;background-color:#e2a115;box-shadow:0px 0px 2px 1px rgba(0,0,0,0.08)}.app__status::after{content:\"\";clear:both;width:0.8em;height:0.8em;display:inline-table;align-self:center;justify-self:center;justify-content:center;align-content:center;position:absolute;border-radius:50%;background-color:#fff;box-shadow:2px 2px 3px 0px rgba(0,0,0,0.2)}.app__http-method{font-size:10px;text-transform:uppercase;font-weight:700;padding-left:8px;padding-right:8px;padding-top:2px;padding-bottom:2px;color:white;border:0;border-radius:4px;text-align:center;line-height:1;display:flex}.app__http-all{background-color:rgba(92,96,100,0)}.app__http-get{background-color:#177598}.app__http-post{background-color:#339973}.app__http-delete{background-color:#a5432d}.app__http-patch{background-color:#bb8f2e}.app__http-put{background-color:#9c3556}.app__sandbox-area{float:right;right:0;width:35%;height:100vh;display:flex;justify-content:space-around;flex-direction:column;position:absolute;margin:0;z-index:1000;overflow:hidden;padding-top:3em;padding-bottom:3em;background-color:#262b2f;box-shadow:-2px -2px 5px 0px rgba(0,0,0,0.4);transition:width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__sandbox-area div{display:flex;height:100vh;background-color:#202428;border-radius:6px;margin-left:2em;margin-right:2em}.app__content-wrapper{display:flex;flex-direction:column;margin-left:17%;margin-right:35%;background-color:#303539;transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__content-padder{padding-bottom:3em}.app__content{padding-top:3em;padding-bottom:0em;padding-left:3em;padding-right:3em;min-height:400px;height:400px;width:auto;position:relative;background-color:#303539}.app__content>.app__params-table{width:100%;text-align:left;padding-left:1em;padding-right:1em;background-color:#252a2e}.app__content>.app__params-table th{height:40px}.app__content>.app__params-table tr{height:40px}.app__content div{display:flex;background-color:#373c40;height:-webkit-fill-available;border-radius:8px}.app__menu-item{display:flex;align-items:center;justify-content:space-between;background-color:#373c40;padding-left:0.8em;padding-top:0.5em;padding-bottom:0.5em;padding-right:1em;-webkit-transition:background-color 0.2s ease-out;-moz-transition:background-color 0.2s ease-out;-ms-transition:background-color 0.2s ease-out;-o-transition:background-color 0.2s ease-out;transition:background-color 0.2s ease-out}.app__menu-item i{color:#a2a6aa;font-weight:100;font-size:16px;transition:all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__menu-item a{color:#a2a6aa;font-size:14px;display:block;padding:8px 16px;letter-spacing:0.6px;font-weight:400;transition:color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__menu-item:hover:not(.app__active){background-color:#43484d}.app__menu-item:hover>i{color:#dcdcdc}.app__menu-item:hover>a{color:#e6e6e6;font-weight:500}.app__menu-item.app__active>i{color:#dcdcdc;transform:rotate(90deg)}.app__menu-item.app__active>a{color:#e6e6e6;font-weight:500}.app__menu-item.app__active:hover{background-color:#43484d;-webkit-transition:background-color 0.2s ease-out;-moz-transition:background-color 0.2s ease-out;-ms-transition:background-color 0.2s ease-out;-o-transition:background-color 0.2s ease-out;transition:background-color 0.2s ease-out}.app__search{outline:0;margin-left:1.4em;margin-right:1.4em;margin-bottom:2em !important;margin-top:2.5em;width:auto;display:flex;border-radius:4px;border:0px;transition:all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__search-textbox{outline:0;height:38px;display:flex;font-size:14px;justify-self:center;align-self:center;font-size:14px;width:80%;line-height:42px;padding:0 16px;background-color:#fff;color:#212121;border:0;border-width:0px;float:left;border-radius:4px 0 0 4px}.app__search-textbox:focus{outline:0;background-color:#FFF}.app__search-textbox:active{outline:0;background-color:#FFF}.app__search-button{display:flex;overflow:hidden;transform:scale(1.02);justify-self:center;align-self:center;outline:0;height:38px;background-color:#5c6064;text-align:center;line-height:42px;border:0;color:#EEE;text-rendering:auto;text-shadow:0 1px 1px rgba(0,0,0,0.2);transition:all .2s ease-in-out;border-radius:0 4px 4px 0}.app__search-button:hover{transform:scale(1.05);background-color:#707478}.app__search-button:active{transform:scale(1)}.app__search-button:hover .app__search-button-icon{color:#fff}.app__search-button-icon{transition:all .2s ease-in-out;font-size:18px;margin:auto}.app__expand{cursor:pointer;display:flex;justify-items:center;overflow:hidden;width:30px;height:30px;border-radius:50%;background-color:#484c50;transform:translateX(15px);box-shadow:0 2px 4px 1px rgba(0,0,0,0.4);transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__expand-hidden{opacity:0;transition:opacity 0.5s ease-in-out 1s}.app__expand:hover{box-shadow:0 8px 18px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);background-color:#5c6064}.app__expand:active{transform:translateX(15px) scale(0.9);box-shadow:1px 0px 1px 0px rgba(0,0,0,0.3)}.app__expand-icon{font-size:20px;transition:font-size 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);transform:rotate(-180deg);margin:auto}.app__expand-icon-active{font-size:16px}.app__sub-menu{list-style:none;padding:0 0;position:absolute;width:100%;height:auto;visibility:hidden;background:#2f3338;overflow:hidden;box-shadow:inset 1px 0px 3px 2px rgba(0,0,0,0.25);box-shadow:inset 0px 8px 8px -6px rgba(0,0,0,0.2)}.app__sub-menu-item{display:flex;align-items:center;justify-content:space-between;padding-left:1.7em;padding-top:0.5em;padding-bottom:0.5em;padding-right:1em;border-left-color:#dc8b02;border-left-width:0em;border-left-style:solid;box-shadow:0px 0px 0px 0px rgba(0,0,0,0.15);-webkit-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out;-moz-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out;-ms-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out;-o-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out;transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out}.app__sub-menu-item-wrapper{display:flex;justify-items:center;align-items:center}.app__sub-menu-item:active{transform:translateY(3px);box-shadow:0px 0px 1px -1px rgba(0,0,0,0.15) !important;-webkit-transition:box-shadow 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);-moz-transition:box-shadow 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);-ms-transition:box-shadow 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);-o-transition:box-shadow 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);transition:box-shadow 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__sub-menu-item:hover{-webkit-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);-moz-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);-ms-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);-o-transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);transition:box-shadow 0.2s ease-out,border-left 0.2s ease-out,transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);box-shadow:0px 0px 10px 2px rgba(0,0,0,0.15);border-left-color:#dc8b02;border-left-width:0.3em;border-left-style:solid}.app__sub-menu-item:hover>.app__sub-menu-item-wrapper>a{font-weight:500}.app__sub-menu-item:hover>i{color:#dcdcdc}.app__sub-menu-item i{color:#6e6e6e;font-weight:100;font-size:16px}.app__sub-menu-item a{display:inline-block;color:#a5a7a8;font-size:12px;display:block;padding:8px 16px;text-decoration:none;font-weight:100;-webkit-transition:color 0.2s ease-out;-moz-transition:color 0.2s ease-out;-ms-transition:color 0.2s ease-out;-o-transition:color 0.2s ease-out;transition:color 0.2s ease-out}.app__sm-expanded{transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__side-menu{width:17%;height:100vh;position:absolute;min-width:230px;scroll-behavior:smooth;overflow-y:visible;margin:0;z-index:1000;color:#a5a7a8;background-color:#373c40;box-shadow:2px 0px 6px 0px rgba(0,0,0,0.3);transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__side-menu ul{padding-inline-start:0px;list-style-type:none}.app__side-menu.app__fixed{position:fixed}.app__side-menu:hover{box-shadow:6px 0px 12px 0px rgba(0,0,0,0.3)}.app__side-menu-peek{transform:translateX(0px) !important;transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.app__side-menu-peek>.app__search{opacity:1 !important}.app__side-menu-closed{transform:translateX(calc(-100% + 20px))}.app__side-menu-closed>.app__search{opacity:0}.app__side-menu-closed ~ .app__content-wrapper{margin-left:0%;margin-right:40%;padding-left:1.5em}.app__side-menu-closed ~ .app__sandbox-area{width:40%}.app__side-menu-closed ~ .app__sandbox-area{width:40%}.app__side-menu-closed ~ .app__footer-area{margin-left:0%}.app__side-menu-closed .app__expand-icon{transform:rotate(0deg)}.app__top-section{display:flex;justify-content:space-between;align-items:center;padding-left:30px;padding-top:30px;padding-bottom:30px;background-color:#44484d;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0,0,0,0.3)}.app__top-section h2{font-weight:300;font-size:20px;color:#eee}.app__top-section h5{margin-top:10px;font-size:14px;font-weight:200;color:#a6aaae}.app__middle-section{padding-top:1em;padding-bottom:1em;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#484c50}.app__main-section{padding-top:1em}.app__menu-header{text-transform:uppercase;padding-left:30px;padding-top:30px;font-weight:500;font-size:14px;color:#eee}.app__footer-area{width:auto;height:600px;margin:0px auto;margin-left:15%;background-color:#272b2e;box-shadow:-2px -2px 5px 0px rgba(0,0,0,0.4)}*{margin:0px}a{text-decoration:none;color:#eee}body{margin:0;color:#eee;background-color:#24282c;font-family:'Roboto', sans-serif;font-family:sans-serif;text-decoration:none;letter-spacing:0.6px;font-weight:400;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro, Menlo, Monaco, Consolas, \"Courier New\", monospace}body::-webkit-scrollbar{height:16px;overflow:visible;width:16px;display:none}.app__side-menu::-webkit-scrollbar{width:8px;display:none;background-color:rgba(0,0,0,0)}.app__side-menu::-webkit-scrollbar-track{border-radius:10px;background-color:rgba(0,0,0,0)}.app__side-menu::-webkit-scrollbar-thumb{border-radius:10px;background-color:#555}.app__truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.app__natural{display:block}.app__fixed{position:fixed}.app__bottom{display:block}.app__invisible{display:none}.app__stagger-out{transition:all 0.3s cubic-bezier(0, 0, 0.25, 1) !important;transform:translateX(0px)}.app__stagger-in{transition:all 0.3s cubic-bezier(0.4, 0, 1, 1) !important;transform:translateX(-50px)}\n", ""]);
// Exports
exports.locals = {
	"ripple": "app__ripple",
	"ripple-effect": "app__ripple-effect",
	"rippleEffect": "app__ripple-effect",
	"rippleDrop": "app__rippleDrop",
	"shadow-elevate": "app__shadow-elevate",
	"shadowElevate": "app__shadow-elevate",
	"nav": "app__nav",
	"nav-padder": "app__nav-padder",
	"navPadder": "app__nav-padder",
	"nav-transition": "app__nav-transition",
	"navTransition": "app__nav-transition",
	"nav-peeky": "app__nav-peeky",
	"navPeeky": "app__nav-peeky",
	"nav-link": "app__nav-link",
	"navLink": "app__nav-link",
	"nav-sticky": "app__nav-sticky",
	"navSticky": "app__nav-sticky",
	"nav-logo": "app__nav-logo",
	"navLogo": "app__nav-logo",
	"nav-logo-image": "app__nav-logo-image",
	"navLogoImage": "app__nav-logo-image",
	"nav-logo-text": "app__nav-logo-text",
	"navLogoText": "app__nav-logo-text",
	"nav-link-active": "app__nav-link-active",
	"navLinkActive": "app__nav-link-active",
	"status-ripple": "app__status-ripple",
	"statusRipple": "app__status-ripple",
	"status": "app__status",
	"http-method": "app__http-method",
	"httpMethod": "app__http-method",
	"http-all": "app__http-all",
	"httpAll": "app__http-all",
	"http-get": "app__http-get",
	"httpGet": "app__http-get",
	"http-post": "app__http-post",
	"httpPost": "app__http-post",
	"http-delete": "app__http-delete",
	"httpDelete": "app__http-delete",
	"http-patch": "app__http-patch",
	"httpPatch": "app__http-patch",
	"http-put": "app__http-put",
	"httpPut": "app__http-put",
	"sandbox-area": "app__sandbox-area",
	"sandboxArea": "app__sandbox-area",
	"content-wrapper": "app__content-wrapper",
	"contentWrapper": "app__content-wrapper",
	"content-padder": "app__content-padder",
	"contentPadder": "app__content-padder",
	"content": "app__content",
	"params-table": "app__params-table",
	"paramsTable": "app__params-table",
	"menu-item": "app__menu-item",
	"menuItem": "app__menu-item",
	"active": "app__active",
	"search": "app__search",
	"search-textbox": "app__search-textbox",
	"searchTextbox": "app__search-textbox",
	"search-button": "app__search-button",
	"searchButton": "app__search-button",
	"search-button-icon": "app__search-button-icon",
	"searchButtonIcon": "app__search-button-icon",
	"expand": "app__expand",
	"expand-hidden": "app__expand-hidden",
	"expandHidden": "app__expand-hidden",
	"expand-icon": "app__expand-icon",
	"expandIcon": "app__expand-icon",
	"expand-icon-active": "app__expand-icon-active",
	"expandIconActive": "app__expand-icon-active",
	"sub-menu": "app__sub-menu",
	"subMenu": "app__sub-menu",
	"sub-menu-item": "app__sub-menu-item",
	"subMenuItem": "app__sub-menu-item",
	"sub-menu-item-wrapper": "app__sub-menu-item-wrapper",
	"subMenuItemWrapper": "app__sub-menu-item-wrapper",
	"sm-expanded": "app__sm-expanded",
	"smExpanded": "app__sm-expanded",
	"side-menu": "app__side-menu",
	"sideMenu": "app__side-menu",
	"fixed": "app__fixed",
	"side-menu-peek": "app__side-menu-peek",
	"sideMenuPeek": "app__side-menu-peek",
	"side-menu-closed": "app__side-menu-closed",
	"sideMenuClosed": "app__side-menu-closed",
	"footer-area": "app__footer-area",
	"footerArea": "app__footer-area",
	"top-section": "app__top-section",
	"topSection": "app__top-section",
	"middle-section": "app__middle-section",
	"middleSection": "app__middle-section",
	"main-section": "app__main-section",
	"mainSection": "app__main-section",
	"menu-header": "app__menu-header",
	"menuHeader": "app__menu-header",
	"truncate": "app__truncate",
	"natural": "app__natural",
	"bottom": "app__bottom",
	"invisible": "app__invisible",
	"stagger-out": "app__stagger-out",
	"staggerOut": "app__stagger-out",
	"stagger-in": "app__stagger-in",
	"staggerIn": "app__stagger-in"
};

/***/ }),
/* 28 */
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
/* 29 */
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
/* 30 */
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
__webpack_require__(26).config();

const config = Object.freeze({
  application: {
    FILE_DIRECTORY: '../node-template-server/build/'
  },
  presentation: {
    path: 'client',
    viewEngine: {
      type: 'jsx',
      alias: 'views',
      label: 'view engine',
      path: 'src/client/views',
      client: {
        path: 'build/public',
        alias: '/'
      },
      styles: {
        path: 'src/client/styles',
        alias: '/styles'
      },
      scripts: {
        path: 'src/client/scriptsjs',
        alias: '/scripts'
      },
      images: {
        path: 'src/client/resources/images',
        alias: '/images'
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
    PORT: process.env.PORT
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
 */
function normalize(date) {
  const year = date.getFullYear().toString();
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
    throw new Error('Method not implemented.');
  }

  sendPasswordRecoveryEmail(email, randomPassword) {
    var _this = this;

    return notification_service_asyncToGenerator(function* () {
      if (!_this.canSendEmails()) {
        return Promise.resolve(true).then();
      }

      throw new Error('Method not implemented.');
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


  updateInvitation(inviteId, _data) {
    return invitation_service_asyncToGenerator(function* () {
      try {
        const repository = new invitation_repository_InvitationRepository();
        const data = _data;

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
var external_bcryptjs_ = __webpack_require__(11);
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
var external_jsonwebtoken_ = __webpack_require__(10);
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
  const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
  let pass = '';

  for (let x = 0; x < length; x++) {
    const index = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(index);
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
            let noMatch = true;

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
// EXTERNAL MODULE: external "express-react-views"
var external_express_react_views_ = __webpack_require__(19);
var external_express_react_views_default = /*#__PURE__*/__webpack_require__.n(external_express_react_views_);

// CONCATENATED MODULE: ./src/server/application.ts
function application_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function application_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { application_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { application_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function application_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











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
    this.initializeViewRenderers(args.viewRenderer);
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
    const imageRender = render.viewEngine.images;
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
    this.app.use(imageRender.alias, external_express_default.a.static(imageRender.path));
    this.app.set(render.viewEngine.alias, render.viewEngine.path);
    this.app.set(render.viewEngine.label, render.viewEngine.type);
    this.app.engine(render.viewEngine.type, external_express_react_views_default.a.createEngine());
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

  initializeViewRenderers(viewRenderers) {
    if (viewRenderers != undefined) {
      viewRenderers.forEach(renderer => {
        this.app.use(renderer.getRoute(), renderer.getRouter());
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

function isBlackListed(_x) {
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

function authenticate(_x2, _x3, _x4) {
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
      req.user = external_jsonwebtoken_default.a.verify(token, server_config.jwt.TOKEN_SECRET);
      const blackListed = yield isBlackListed(token);

      if (blackListed) {
        throw new Error(AuthorizationMessages.NO_ACTIVE_TOKEN);
      }

      return next();
    } catch (error) {
      response.authorized = false;
      response.message = AuthorizationMessages.NO_VALID_TOKEN;
      response.errors.push(error.message);
      return res.status(httpCode.UNAUTHORIZED).json(response);
    }
  });
  return _authenticate.apply(this, arguments);
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

function priviledge_respository_dataTransferDocument(data) {
  const {
    userId,
    permissions,
    controller
  } = data;
  return new PriviledgeDTO(userId, permissions, controller);
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

    default:
  }

  return {
    controller: null,
    permission: null
  };
}

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

        if (request.user && isAllowed.allowed && rolesMatch.match) return yield priviledge_validator(request, response, next);else {
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

        default:
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

function handlePosting(schemaType, data) {
  switch (schemaType) {
    case CREDENTIALS:
      return validateCredentials(data);

    default:
  }

  return null;
}

function handleDeletion(schemaType, data) {
  switch (schemaType) {
    case PRIVILEDGE_QUERY:
      return validatePriviledgeQuery(data);

    default:
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

      default:
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

    default:
  }

  return null;
}

function handleUpdate(schemaType, data) {
  switch (schemaType) {
    case INVITATION_UPDATE:
      return validateInviteUpdate(data);

    case PRIVILEDGE_UPDATE:
      return validatePriviledgeUpdate(data);

    default:
  }

  return null;
}

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

      default:
    }
  };
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
    images: file => `src/client/resources/images/${file}`
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
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(7);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: ./src/client/resources/images/favicon.png
var favicon = __webpack_require__(12);
var favicon_default = /*#__PURE__*/__webpack_require__.n(favicon);

// EXTERNAL MODULE: external "react-dom/server"
var server_ = __webpack_require__(20);
var server_default = /*#__PURE__*/__webpack_require__.n(server_);

// CONCATENATED MODULE: ./src/client/views/template.jsx
function template_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/* harmony default export */ var template = ((args = {}) => {
  const layout = server_default.a.renderToString(external_react_default.a.createElement(template_DefaultLayout, args));
  return `<!doctype html>${layout}`;
});

class template_DefaultLayout extends external_react_default.a.PureComponent {
  constructor(...args) {
    super(...args);

    template_defineProperty(this, "render", () => {
      return external_react_default.a.createElement("html", {
        lang: "en-US"
      }, external_react_default.a.createElement("head", null, external_react_default.a.createElement("meta", {
        charSet: "utf-8"
      }), external_react_default.a.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), external_react_default.a.createElement("meta", {
        name: "theme-color",
        content: "#000000"
      }), external_react_default.a.createElement("meta", {
        name: "description",
        content: "Template Web site generated the server api routing"
      }), external_react_default.a.createElement("link", {
        rel: "manifest",
        href: "/manifest.json"
      }), external_react_default.a.createElement("link", {
        rel: "icon",
        type: "image/png",
        href: favicon_default.a
      }), external_react_default.a.createElement("link", {
        rel: "apple-touch-icon",
        type: "image/png",
        href: favicon_default.a
      }), external_react_default.a.createElement("link", {
        rel: "shortcut icon",
        type: "image/png",
        href: favicon_default.a
      }), external_react_default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons&display=swap",
        media: "all",
        id: "materialIcons",
        async: true,
        disabled: true
      }), external_react_default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto&display=swap",
        media: "all",
        id: "robotoFont",
        async: true,
        disabled: true
      }), external_react_default.a.createElement("title", null, this.props.title), external_react_default.a.createElement("style", null, "$", [...this.props.css].join(''))), external_react_default.a.createElement("body", null, external_react_default.a.createElement("section", {
        id: "content"
      }, this.props.content), external_react_default.a.createElement("script", {
        rel: "preconnect",
        src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        async: true,
        defer: true
      }), external_react_default.a.createElement("script", {
        dangerouslySetInnerHTML: {
          __html: `
						window.__REDUX_STATE__= ${JSON.stringify(this.props.state).replace(/</g, '\\u003c')};

						window.onload = function()
						{
							document.getElementById('robotoFont').removeAttribute('disabled');
							document.getElementById('materialIcons').removeAttribute('disabled');
						}

						${this.props.enableSW ? `
						
						if ('serviceWorker' in navigator) {
							window.addEventListener('load', function() {
							  navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
								 console.log('ServiceWorker registration successful with scope: ', registration.scope);
							  }, function(err) {
								 console.log('ServiceWorker registration failed: ', err);
							  }).catch(error => console.log(error));
							});
						 }
						` : ''}
						
						`
        }
      }), external_react_default.a.createElement("script", {
        type: "text/javascript",
        src: "/scripts/loader.js"
      }), external_react_default.a.createElement("script", {
        type: "text/javascript",
        src: "/bundle.js"
      })));
    });
  }

}

template_DefaultLayout.propTypes = {
  enableSW: external_prop_types_default.a.bool,
  content: external_prop_types_default.a.any,
  title: external_prop_types_default.a.string,
  state: external_prop_types_default.a.any,
  css: external_prop_types_default.a.object
};
// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__(21);
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(5);

// CONCATENATED MODULE: ./src/client/actions/common/navigation.action.ts
const NAV_BAR_MENU = 'NAV_BAR_MENU';
const NAV_BAR_MENU_ANCHORED = 'NAV_BAR_MENU_ANCHORED';
const NAV_BAR_MENU_OFFSET_TOP = 'NAV_BAR_MENU_OFFSET_TOP';
const NAV_BAR_MENU_ACTIVE_TAB = 'NAV_BAR_MENU_ACTIVE_TAB';
const NAV_BAR_MENU_MOUSE_INSIDE = 'NAV_BAR_MENU_MOUSE_INSIDE';
const setOffsetTop = offset => dispatch => {
  dispatch({ ...offsetTopAction,
    payload: offset
  });
};
const setMouseInside = inside => dispatch => {
  dispatch({ ...navInsideAction,
    payload: inside
  });
};
const setAnchored = anchored => dispatch => {
  dispatch({ ...navAnchorAction,
    payload: anchored
  });
};
const setActiveTab = tab => dispatch => {
  dispatch({ ...activeTabAction,
    payload: tab
  });
};
const activeTabAction = {
  from: NAV_BAR_MENU,
  type: NAV_BAR_MENU_ACTIVE_TAB
};
const navInsideAction = {
  from: NAV_BAR_MENU,
  type: NAV_BAR_MENU_MOUSE_INSIDE
};
const navAnchorAction = {
  from: NAV_BAR_MENU,
  type: NAV_BAR_MENU_ANCHORED
};
const offsetTopAction = {
  from: NAV_BAR_MENU,
  type: NAV_BAR_MENU_OFFSET_TOP
};
const Dispatchers = {
  setAnchored,
  setMouseInside,
  setActiveTab,
  setOffsetTop
};
// CONCATENATED MODULE: ./src/client/reducers/common/navigation.reducer.ts

const SOURCE = NAV_BAR_MENU;
const InitialState = {
  anchored: false,
  offsetTop: 0,
  mouseInside: null,
  acitiveTab: null,
  navigationTabs: []
};
/* harmony default export */ var navigation_reducer = (function (state = InitialState, action) {
  switch (action.type) {
    case NAV_BAR_MENU_ANCHORED:
      {
        return { ...state,
          anchored: action.payload,
          mouseInside: !action.payload ? null : state.mouseInside
        };
      }

    case NAV_BAR_MENU_ACTIVE_TAB:
      {
        return { ...state,
          acitiveTab: action.payload
        };
      }

    case NAV_BAR_MENU_MOUSE_INSIDE:
      {
        return { ...state,
          mouseInside: action.payload
        };
      }

    case NAV_BAR_MENU_OFFSET_TOP:
      {
        return { ...state,
          offsetTop: action.payload
        };
      }

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/client/actions/documentation/section.action.ts
const DOCUMENTATION_SECTION_ALL = 'DOCUMENTATION_SECTION_ALL';
const DOCUMENTATION_SECTION_ALL_FIXED = 'DOCUMENTATION_SECTION_ALL_FIXED';
const DOCUMENTATION_SECTION_SIDEBAR_FIXED = 'DOCUMENTATION_SECTION_SIDEBAR_FIXED';
const DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP = 'DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP';
const DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM = 'DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM';
const DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM = 'DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM';
const setAll = (sidebarFixed, sandboxFixedTop, sandboxFixedBottom, sandboxOffsetBottom) => dispatch => {
  dispatch({
    type: DOCUMENTATION_SECTION_ALL,
    payload: {
      sidebarFixed,
      sandboxFixedTop,
      sandboxFixedBottom,
      sandboxOffsetBottom
    }
  });
};
const setAllFixed = (sidebarFixed, sandboxFixed) => dispatch => {
  dispatch({
    type: DOCUMENTATION_SECTION_ALL_FIXED,
    payload: {
      sidebarFixed,
      sandboxFixed
    }
  });
};
const setSidebarFixed = fixed => dispatch => {
  dispatch({
    type: DOCUMENTATION_SECTION_SIDEBAR_FIXED,
    payload: fixed
  });
};
const setSandboxFixedTop = fixed => dispatch => {
  dispatch({
    type: DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP,
    payload: fixed
  });
};
const setSandboxFixedBottom = fixed => dispatch => {
  dispatch({
    type: DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM,
    payload: fixed
  });
};
const setSandboxOffsetBottom = offset => dispatch => {
  dispatch({
    type: DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM,
    payload: offset
  });
};
const section_action_Dispatchers = {
  setAll,
  setAllFixed,
  setSidebarFixed,
  setSandboxFixedTop,
  setSandboxFixedBottom,
  setSandboxOffsetBottom
};
// CONCATENATED MODULE: ./src/client/actions/documentation/sidebar.action.ts
const SIDE_MENU = 'SIDE_MENU';
const SIDE_MENU_FIXED = 'SIDE_MENU_FIXED';
const SIDE_MENU_TOGGLE = 'SIDE_MENU_TOGGLE';
const SIDE_MENU_HOVERED = 'SIDE_MENU_HOVERED';
const toggleExpand = () => dispatch => {
  dispatch(toggleAction);
};
const setHovered = hovered => dispatch => {
  dispatch({ ...hoverAction,
    payload: hovered
  });
};
const setFixed = fixed => dispatch => {
  dispatch({ ...fixedAction,
    payload: fixed
  });
};
const toggleAction = {
  from: SIDE_MENU,
  type: SIDE_MENU_TOGGLE
};
const hoverAction = {
  from: SIDE_MENU,
  type: SIDE_MENU_HOVERED
};
const fixedAction = {
  from: SIDE_MENU,
  type: SIDE_MENU_FIXED
};
// CONCATENATED MODULE: ./src/client/reducers/documentation/sidebar.reducer.ts

const sidebar_reducer_SOURCE = SIDE_MENU;
const sidebar_reducer_InitialState = {
  expanded: true,
  hovered: false,
  fixed: false,
  toggle: {
    hidden: true,
    locked: true
  },
  searchbar: {
    searching: false
  },
  endpoints: []
};
/* harmony default export */ var sidebar_reducer = (function (state = sidebar_reducer_InitialState, action) {
  switch (action.type) {
    case SIDE_MENU_TOGGLE:
      {
        return { ...state,
          expanded: !state.expanded,
          toggle: { ...state.toggle,
            locked: !state.expanded
          }
        };
      }

    case SIDE_MENU_HOVERED:
      {
        let forwardHover = state.hovered;
        let toggleHidden = state.toggle.hidden;

        if (state.expanded) {
          toggleHidden = !action.payload;
        }

        if (!state.expanded) {
          forwardHover = action.payload;
        }

        return { ...state,
          hovered: forwardHover,
          toggle: { ...state.toggle,
            hidden: toggleHidden
          }
        };
      }

    case SIDE_MENU_FIXED:
      {
        return { ...state,
          fixed: action.payload
        };
      }

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/client/actions/documentation/sandbox.action.ts
const SANDBOX_AREA = 'SANDBOX_AREA';
const SANDBOX_AREA_HOVERED = 'SANDBOX_AREA_HOVERED';
const SANDBOX_AREA_FIXED_TOP = 'SANDBOX_AREA_FIXED_TOP';
const SANDBOX_AREA_FIXED_BOTTOM = 'SANDBOX_AREA_FIXED_BOTTOM';
const SANDBOX_AREA_OFFSET_BOTTOM = 'SANDBOX_AREA_OFFSET_BOTTOM';
const sandbox_action_setHovered = hovered => dispatch => {
  dispatch({ ...sandbox_action_hoverAction,
    payload: hovered
  });
};
const setTopFixed = fixed => dispatch => {
  dispatch({ ...fixedTopAction,
    payload: fixed
  });
};
const setBottomFixed = fixed => dispatch => {
  dispatch({ ...fixedBottomAction,
    payload: fixed
  });
};
const setOffsetBottom = offset => dispatch => {
  dispatch({ ...offsetBottomAction,
    payload: offset
  });
};
const sandbox_action_hoverAction = {
  from: SANDBOX_AREA,
  type: SANDBOX_AREA_HOVERED
};
const fixedTopAction = {
  from: SANDBOX_AREA,
  type: SANDBOX_AREA_FIXED_TOP
};
const fixedBottomAction = {
  from: SANDBOX_AREA,
  type: SANDBOX_AREA_FIXED_BOTTOM
};
const offsetBottomAction = {
  from: SANDBOX_AREA,
  type: SANDBOX_AREA_OFFSET_BOTTOM
};
// CONCATENATED MODULE: ./src/client/reducers/documentation/sandbox.reducer.ts

const sandbox_reducer_SOURCE = SANDBOX_AREA;
const sandbox_reducer_InitialState = {
  hovered: false,
  fixedTop: false,
  fixedBottom: false,
  offsetBottom: 0
};
/* harmony default export */ var sandbox_reducer = (function (state = sandbox_reducer_InitialState, action) {
  switch (action.type) {
    case SANDBOX_AREA_HOVERED:
      {
        return { ...state,
          hovered: action.payload
        };
      }

    case SANDBOX_AREA_FIXED_TOP:
      {
        return { ...state,
          fixedTop: action.payload
        };
      }

    case SANDBOX_AREA_FIXED_BOTTOM:
      {
        return { ...state,
          fixedBottom: action.payload
        };
      }

    case SANDBOX_AREA_OFFSET_BOTTOM:
      {
        return { ...state,
          offsetBottom: action.payload
        };
      }

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/client/reducers/documentation/section.reducer.ts





const section_reducer_InitialState = {
  siblingA: false,
  siblingB: false,
  sidebar: sidebar_reducer_InitialState,
  sandbox: sandbox_reducer_InitialState
};
/* harmony default export */ var section_reducer = ((state = section_reducer_InitialState, action) => {
  if (action.from) return handleSubReducers(state, action);

  switch (action.type) {
    case DOCUMENTATION_SECTION_ALL:
      {
        return { ...state,
          sidebar: { ...state.sidebar,
            fixed: action.payload.sidebarFixed
          },
          sandbox: { ...state.sandbox,
            fixedTop: action.payload.sandboxFixedTop,
            fixedBottom: action.payload.sandboxFixedBottom,
            offsetBottom: action.payload.sandboxOffsetBottom
          }
        };
      }

    case DOCUMENTATION_SECTION_ALL_FIXED:
      {
        return { ...state,
          sidebar: { ...state.sidebar,
            fixed: action.payload.sidebarFixed
          },
          sandbox: { ...state.sandbox,
            fixedTop: action.payload.sandboxFixed,
            fixedBottom: false
          }
        };
      }

    case DOCUMENTATION_SECTION_SIDEBAR_FIXED:
      {
        return { ...state,
          sidebar: { ...state.sidebar,
            fixed: action.payload
          }
        };
      }

    case DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP:
      {
        return { ...state,
          sandbox: { ...state.sandbox,
            fixedTop: action.payload
          }
        };
      }

    case DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM:
      {
        return { ...state,
          sandbox: { ...state.sandbox,
            fixedBottom: action.payload,
            fixedTop: !action.payload
          }
        };
      }

    case DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM:
      {
        return { ...state,
          sandbox: { ...state.sandbox,
            offsetBottom: action.payload
          }
        };
      }

    default:
      return state;
  }
});

const handleSubReducers = (state = section_reducer_InitialState, action) => {
  switch (action.from) {
    case SOURCE:
      {
        return handleNavbarActions(state, action);
      }

    case sidebar_reducer_SOURCE:
      {
        return { ...state,
          sidebar: sidebar_reducer(state.sidebar, action)
        };
      }

    case sandbox_reducer_SOURCE:
      {
        return { ...state,
          sandbox: sandbox_reducer(state.sandbox, action)
        };
      }

    default:
      return state;
  }

  ;
};

const handleNavbarActions = (state = section_reducer_InitialState, action) => {
  switch (action.type) {
    case NAV_BAR_MENU_ANCHORED:
      {
        return { ...state,
          sidebar: { ...state.sidebar,
            fixed: action.payload
          },
          sandbox: { ...state.sandbox,
            fixedTop: !state.sandbox.fixedBottom ? action.payload : false
          }
        };
      }

    default:
      return state;
  }
};
// CONCATENATED MODULE: ./src/client/reducers/index.ts



/* harmony default export */ var reducers = (Object(external_redux_["combineReducers"])({
  presentation: Object(external_redux_["combineReducers"])({
    navigation: navigation_reducer,
    documentation: section_reducer
  })
}));
// CONCATENATED MODULE: ./src/client/stores/store.ts



function configureStore(initialState) {
  const middleWare = [external_redux_thunk_default.a];
  const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || external_redux_["compose"];
  const store = Object(external_redux_["createStore"])(reducers, initialState, composeEnhancers(Object(external_redux_["applyMiddleware"])(...middleWare)));
  return store;
}
// CONCATENATED MODULE: ./src/server/middleware/renderer.ts
class ViewRenderer {}

/* harmony default export */ var renderer = (ViewRenderer);
// EXTERNAL MODULE: external "fast-memoize"
var external_fast_memoize_ = __webpack_require__(22);
var external_fast_memoize_default = /*#__PURE__*/__webpack_require__.n(external_fast_memoize_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(3);

// EXTERNAL MODULE: external "react-router-dom"
var external_react_router_dom_ = __webpack_require__(8);

// CONCATENATED MODULE: ./src/client/appliers/style.applier.tsx
function style_applier_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Joins css classes into a single string
 */
const join = (...names) => {
  return names.join(' ');
};
class Styler {
  constructor(...baseStyles) {
    style_applier_defineProperty(this, "styles", void 0);

    style_applier_defineProperty(this, "latest", true);

    style_applier_defineProperty(this, "reset", style => {
      this.styles = [...this.styles, style];
      return this;
    });

    style_applier_defineProperty(this, "add", style => {
      this.styles = [...this.styles, style];
      return this;
    });

    style_applier_defineProperty(this, "append", (condition, style) => {
      if (condition) this.styles.push(style);
      return this;
    });

    style_applier_defineProperty(this, "appendAndOr", (condition, styleA, styleB) => {
      if (condition) {
        this.styles = [...this.styles, styleA];
      } else {
        this.styles = [...this.styles, styleB];
      }

      return this;
    });

    style_applier_defineProperty(this, "appendWhen", (condition, style, updateState = true) => {
      if (condition && this.latest) this.styles = [...this.styles, style];

      if (updateState) {
        this.latest = condition;
      }

      return this;
    });

    style_applier_defineProperty(this, "getClasses", () => join(...this.styles));

    this.styles = [...baseStyles];
  }

}
const appendAndOr = (styles, condition, styleA, styleB) => {
  if (condition) {
    styles.push(styleA);
  } else {
    styles.push(styleB);
  }
};
/**
 * Appends a class to the chain of classes if the given condition
 * is true and the last state evaluates to true. If the update state
 * flag is left as true. The latest state will be updated with
 * the value of the condition.
 * @param style The class append to the chain.
 * @param condition The condition that needs to be met in order to
 * append the class to the chain.
 * @param updateState Flag determining if the state should be updated.
 * @returns The instance of this updater.
 */

const appendWhen = (styles, condition, ...style) => {
  if (condition) styles.push(...style);
};
// EXTERNAL MODULE: external "reselect"
var external_reselect_ = __webpack_require__(6);

// CONCATENATED MODULE: ./src/client/selectors/navbar.selector.ts

const getNavigationBar = Object(external_reselect_["createSelector"])(state => state, state => ({
  anchored: state.navigation.anchored,
  mouseInside: state.navigation.mouseInside,
  activeTab: state.navigation.acitiveTab
}));
// CONCATENATED MODULE: ./src/client/components/shared/navbar/Navbar.tsx
function Navbar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Navbar_Navbar extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    Navbar_defineProperty(this, "navbar", void 0);

    Navbar_defineProperty(this, "componentDidMount", () => {
      this.applyAnchor(this.navbar.current);
    });

    Navbar_defineProperty(this, "applyAnchor", navbar => {
      const margin = 15;
      const topOffset = -(navbar.clientHeight - margin);
      const body = document.body;
      const scroll = body.getBoundingClientRect().top;
      const scrollTop = navbar.getBoundingClientRect().top;
      const topPosition = Math.abs(scroll) + (scrollTop - topOffset);
      this.props.setOffsetTop(margin - 1);
      window.addEventListener('scroll', () => this.anchor(topPosition));
    });

    Navbar_defineProperty(this, "anchor", top => {
      const anchored = this.props.anchored;
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;

      if (scroll >= top && !anchored) {
        this.props.setAnchored(true);
      }

      if (scroll < top && anchored) {
        this.props.setAnchored(false);
      }
    });

    Navbar_defineProperty(this, "onMouseEnter", () => {
      if (this.props.anchored) {
        this.props.setMouseInside(true);
      }
    });

    Navbar_defineProperty(this, "onMouseExit", () => {
      if (this.props.anchored) {
        this.props.setMouseInside(false);
      }
    });

    Navbar_defineProperty(this, "handleLinkClick", tab => {
      if (this.props.activeTab === null) {
        this.props.setActiveTab(tab);
      } else {
        if (this.props.activeTab.label !== tab.label) {
          this.props.setActiveTab(tab);
        }
      }
    });

    Navbar_defineProperty(this, "getLinkProps", (style, element, idx) => {
      const activeTab = this.props.activeTab;
      const location = this.props.location;
      const classes = [style.navLink];
      appendWhen(classes, activeTab === null && element.link === location, style.navLinkActive);
      appendWhen(classes, activeTab !== null && element.label === activeTab.label, style.navLinkActive);
      const properties = {
        className: join(...classes),
        onClick: () => this.handleLinkClick({
          label: element.label,
          index: idx
        }),
        to: element.link
      };
      return properties;
    });

    Navbar_defineProperty(this, "render", () => {
      const style = this.props.styling;
      const routes = this.props.routings;
      const classes = [style.nav];
      const mouseInside = this.props.mouseInside === true;
      const mouseOutside = this.props.mouseInside === false;
      appendWhen(classes, this.props.anchored, style.navSticky);
      appendWhen(classes, this.props.anchored && mouseInside, style.navTransition, style.navPeeky);
      appendWhen(classes, this.props.anchored && mouseOutside, style.navTransition);
      const properties = {
        ref: this.navbar,
        className: join(...classes),
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseExit
      };
      return external_react_default.a.createElement("header", properties, external_react_default.a.createElement("div", {
        className: style.navLogo
      }, external_react_default.a.createElement("div", {
        className: style.status
      }), external_react_default.a.createElement("div", {
        className: style.navLogoText
      }, external_react_default.a.createElement("a", {
        "aria-label": "brand name",
        href: "/"
      }, this.props.brandName))), external_react_default.a.createElement("ul", null, routes.map((element, idx) => external_react_default.a.createElement("li", {
        key: idx
      }, external_react_default.a.createElement(external_react_router_dom_["Link"], external_fast_memoize_default()(this.getLinkProps)(style, element, idx), element.label)))));
    });

    this.navbar = external_react_default.a.createRef();
  }

}

const mapStateToProps = state => getNavigationBar(state.presentation);

/* harmony default export */ var navbar_Navbar = (Object(external_react_redux_["connect"])(mapStateToProps, Dispatchers)(Navbar_Navbar));
// CONCATENATED MODULE: ./src/client/components/shared/navbar/NavbarPadder.tsx
function NavbarPadder_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class NavbarPadder_NavbarPadder extends external_react_default.a.PureComponent {
  constructor(...args) {
    super(...args);

    NavbarPadder_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement("header", {
        ref: this.props.self,
        className: style.navPadder
      });
    });
  }

}
// EXTERNAL MODULE: external "isomorphic-style-loader/withStyles"
var withStyles_ = __webpack_require__(23);
var withStyles_default = /*#__PURE__*/__webpack_require__.n(withStyles_);

// EXTERNAL MODULE: ./src/client/styles/app.scss
var app = __webpack_require__(9);
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/content/ContentSection.tsx
function ContentSection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class ContentSection_ContentSection extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    ContentSection_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement("article", {
        className: style.content
      }, external_react_default.a.createElement("div", null));
    });
  }

}

/* harmony default export */ var content_ContentSection = (ContentSection_ContentSection);
// CONCATENATED MODULE: ./src/client/components/shared/Wrapper.tsx
function Wrapper_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Wrapper_Wrapper extends external_react_default.a.PureComponent {
  constructor(...args) {
    super(...args);

    Wrapper_defineProperty(this, "render", () => {
      const {
        children,
        ...props
      } = this.props;
      return external_react_default.a.createElement("div", props, children);
    });
  }

}
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/content/ContentArea.tsx
function ContentArea_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class ContentArea_ContentArea extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    ContentArea_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement("div", {
        className: style.contentWrapper
      }, external_react_default.a.createElement(Wrapper_Wrapper, {
        className: style.contentPadder
      }, external_react_default.a.createElement(content_ContentSection, {
        styling: style
      }), external_react_default.a.createElement(content_ContentSection, {
        styling: style
      }), external_react_default.a.createElement(content_ContentSection, {
        styling: style
      }), external_react_default.a.createElement(content_ContentSection, {
        styling: style
      }), external_react_default.a.createElement(content_ContentSection, {
        styling: style
      }), external_react_default.a.createElement(content_ContentSection, {
        styling: style
      })));
    });
  }

}

/* harmony default export */ var content_ContentArea = (ContentArea_ContentArea);
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/footer/FooterArea.tsx
function FooterArea_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class FooterArea_FooterArea extends external_react_default.a.Component {
  constructor(props) {
    super(props);

    FooterArea_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement("footer", {
        ref: this.props.self,
        className: style.footerArea
      });
    });
  }

}

/* harmony default export */ var footer_FooterArea = (FooterArea_FooterArea);
// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(13);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);

// CONCATENATED MODULE: ./src/client/appliers/ripple.applier.tsx


const asClass = name => '.' + name;

const spanElement = name => {
  const element = document.createElement('span');
  element.classList.add(name);
  return element;
};

/* harmony default export */ var ripple_applier = ((event, style) => {
  external_jquery_default()(asClass(style.ripple)).remove();
  const element = event.currentTarget;
  const offset = element.getBoundingClientRect();
  const posX = offset.left;
  const posY = offset.top;
  let buttonWidth = offset.width;
  let buttonHeight = offset.height;
  const ripple = spanElement(style.ripple);
  element.prepend(ripple);

  if (buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  const x = event.pageX - posX - buttonWidth / 2;
  const y = event.pageY - posY - buttonHeight / 2;
  external_jquery_default()(asClass(style.ripple)).css({
    width: buttonWidth,
    height: buttonHeight,
    top: y,
    left: x
  }).addClass(style.rippleEffect);
});
// CONCATENATED MODULE: ./src/client/stores/icon.library.ts
const MaterialIcons = {
  CLASS: 'material-icons',
  icons: {
    CHEV_RIGHT: 'chevron_right',
    CHEV_LEFT: 'chevron_left',
    MENU: 'menu'
  }
};
// CONCATENATED MODULE: ./src/client/components/utililties/react.utils.tsx
const react_utils_element = (tag, classes) => {
  const element = document.createElement(tag);
  classes.forEach(x => element.classList.add(x));
  return element;
};
/**
 * Joins css classes into a single string
 */

const react_utils_join = (...names) => {
  return names.join(' ');
};
/**
 * Creates a css styling string from the given
 * object.
 */

const react_utils_css = properties => {
  let style = '';

  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      style += `${key}: ${properties[key]}; \n`;
    }
  }

  return style;
};
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/SidebarToggle.tsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SidebarToggle_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class SidebarToggle_SidebarToggle extends external_react_default.a.PureComponent {
  constructor(_props) {
    super(_props);

    SidebarToggle_defineProperty(this, "toggleSidebar", event => {
      const style = this.props.styling;
      ripple_applier(event, style);
      this.props.toggleExpand();
    });

    SidebarToggle_defineProperty(this, "render", () => {
      const style = this.props.styling;
      const elementTitle = this.props.locked ? 'collapse' : 'expand';
      const iconText = this.props.locked ? MaterialIcons.icons.CHEV_RIGHT : MaterialIcons.icons.MENU;
      const props = {
        title: elementTitle,
        value: this.props.locked,
        onClick: this.toggleSidebar
      };
      const toggleClasses = [style.expand];
      const toggleIconClasses = [MaterialIcons.CLASS, style.expandIcon];

      if (this.props.hidden) {
        toggleClasses.push(style.expandHidden);
      }

      if (this.props.locked) {
        toggleClasses.push(style.expandActive);
      } else {
        toggleIconClasses.push(style.expandIconActive);
      }

      return external_react_default.a.createElement("div", _extends({
        className: react_utils_join(...toggleClasses)
      }, props), external_react_default.a.createElement("i", {
        className: react_utils_join(...toggleIconClasses)
      }, iconText));
    });
  }

}

const SidebarToggle_mapStateToProps = state => {
  return { ...state.presentation.documentation.sidebar.toggle
  };
};

/* harmony default export */ var sidebar_SidebarToggle = (Object(external_react_redux_["connect"])(SidebarToggle_mapStateToProps, {
  toggleExpand: toggleExpand
})(SidebarToggle_SidebarToggle));
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/sections/VersionInfo.tsx
function VersionInfo_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const version = '1.3.5';
class VersionInfo_VersionInfo extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    VersionInfo_defineProperty(this, "render", () => {
      return external_react_default.a.createElement("div", null, external_react_default.a.createElement("h2", null, "Api Name"), external_react_default.a.createElement("h5", null, "version: ", version));
    });
  }

}
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/sections/TopSection.tsx
function TopSection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class TopSection_TopSection extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    TopSection_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement("div", {
        className: style.topSection
      }, external_react_default.a.createElement(VersionInfo_VersionInfo, {
        styling: style
      }), external_react_default.a.createElement(sidebar_SidebarToggle, {
        styling: style
      }));
    });
  }

}
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/SidebarSubItem.tsx
function SidebarSubItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class SidebarSubItem_SidebarSubItem extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    SidebarSubItem_defineProperty(this, "render", () => {
      const hash = this.props.hash;
      const label = this.props.label;
      const method = this.props.method;
      const style = this.props.styling;
      const classes = [style.httpMethod, style.httpAll];
      return external_react_default.a.createElement("li", {
        className: style.subMenuItem
      }, external_react_default.a.createElement("div", {
        className: style.subMenuItemWrapper
      }, external_react_default.a.createElement("h3", {
        className: react_utils_join(...classes)
      }, method), external_react_default.a.createElement("a", {
        className: style.truncate,
        href: hash
      }, label)), external_react_default.a.createElement("i", {
        className: MaterialIcons.CLASS
      }, MaterialIcons.icons.CHEV_RIGHT));
    });
  }

}

/* harmony default export */ var sidebar_SidebarSubItem = (SidebarSubItem_SidebarSubItem);
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/SidebarSubMenu.tsx
function SidebarSubMenu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const links = [{
  label: 'Register a user',
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

class SidebarSubMenu_SidebarSubMenu extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    SidebarSubMenu_defineProperty(this, "menu", void 0);

    SidebarSubMenu_defineProperty(this, "hiddenStyle", () => {
      return {
        height: 0,
        position: 'absolute',
        visibility: 'hidden'
      };
    });

    SidebarSubMenu_defineProperty(this, "getStyle", height => {
      return {
        height: height,
        position: 'relative',
        visibility: 'visible'
      };
    });

    SidebarSubMenu_defineProperty(this, "onHidden", () => {
      this.setState(() => ({
        hidden: true
      }));
    });

    SidebarSubMenu_defineProperty(this, "onShown", () => {
      this.setState(() => ({
        hidden: false
      }));
    });

    SidebarSubMenu_defineProperty(this, "componentDidMount", () => {
      const menu = this.menu.current;
      this.setState(() => ({
        loaded: true,
        height: menu.clientHeight
      }));
    });

    SidebarSubMenu_defineProperty(this, "render", () => {
      const style = this.props.styling;
      const expand = this.props.expanded;
      const classes = [style.subMenu];
      const listItems = links.map((x, index) => external_react_default.a.createElement(sidebar_SidebarSubItem, {
        key: index,
        hash: '#' + x,
        label: x.label,
        styling: style,
        method: x.method.label
      }));

      if (this.state.loaded) {
        classes.push(style.smExpanded);

        if (expand) {
          return external_react_default.a.createElement("ul", {
            ref: this.menu,
            onTransitionEnd: this.onShown,
            className: react_utils_join(...classes),
            style: this.getStyle(this.state.height)
          }, listItems);
        } else {
          const styling = this.state.hidden ? this.hiddenStyle() : this.getStyle(0);
          return external_react_default.a.createElement("ul", {
            ref: this.menu,
            onTransitionEnd: this.onHidden,
            className: react_utils_join(...classes),
            style: styling
          }, listItems);
        }
      }

      return external_react_default.a.createElement("ul", {
        ref: this.menu
      }, listItems);
    });

    this.menu = Object(external_react_["createRef"])();
    this.state = {
      hidden: true,
      loaded: false,
      height: 0
    };
  }

}

/* harmony default export */ var sidebar_SidebarSubMenu = (SidebarSubMenu_SidebarSubMenu);
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/SidebarMenuItem.tsx
function SidebarMenuItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class SidebarMenuItem_SidebarMenuItem extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    SidebarMenuItem_defineProperty(this, "openSubMenu", () => {
      this.setState(state => ({
        expanded: !state.expanded
      }));
    });

    SidebarMenuItem_defineProperty(this, "render", () => {
      const hash = this.props.hash;
      const label = this.props.label;
      const style = this.props.styling;
      const classes = [style.menuItem];

      if (this.state.expanded) {
        classes.push(style.active);
      }

      return external_react_default.a.createElement("li", {
        className: react_utils_join(...classes),
        onClick: this.openSubMenu
      }, external_react_default.a.createElement("a", {
        href: hash
      }, label), external_react_default.a.createElement("i", {
        className: MaterialIcons.CLASS
      }, MaterialIcons.icons.CHEV_RIGHT), external_react_default.a.createElement(sidebar_SidebarSubMenu, {
        styling: style,
        expanded: this.state.expanded
      }));
    });

    this.state = {
      expanded: false
    };
  }

}

/* harmony default export */ var sidebar_SidebarMenuItem = (SidebarMenuItem_SidebarMenuItem);
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/sections/MainSection.tsx
function MainSection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const MainSection_routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation'];
class MainSection_MainSection extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    MainSection_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("h2", {
        className: style.menuHeader
      }, this.props.header), external_react_default.a.createElement("ul", {
        className: style.mainSection
      }, MainSection_routes.map((x, index) => external_react_default.a.createElement(sidebar_SidebarMenuItem, {
        key: index,
        styling: style,
        hash: `#${x}`,
        label: x
      }))));
    });
  }

}
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/sections/MiddleSection.tsx
function MiddleSection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const MiddleSection_links = ['Quickstart', 'Basics'];
class MiddleSection_MiddleSection extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    MiddleSection_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement("h2", {
        className: style.menuHeader
      }, this.props.header), external_react_default.a.createElement("ul", {
        className: style.middleSection
      }, MiddleSection_links.map((x, index) => external_react_default.a.createElement(sidebar_SidebarMenuItem, {
        key: index,
        styling: style,
        hash: '#' + x,
        label: x
      }))));
    });
  }

}
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/SidebarSearch.tsx
function SidebarSearch_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class SidebarSearch_SidebarSearch extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    SidebarSearch_defineProperty(this, "performSearch", event => {
      event.preventDefault();
      ripple_applier(event, this.props.styling);
    });

    SidebarSearch_defineProperty(this, "render", () => {
      const style = this.props.styling;
      const menuState = this.props.menuState;
      const classes = [style.search, style.shadowElevate]; // if (!menuState.expanded) {
      // 	if (menuState.hovered) {
      // 		//classes.push(style.staggerOut);
      // 	} else {
      // 		//classes.push(style.staggerIn);
      // 	}
      // }

      return external_react_default.a.createElement("form", {
        className: react_utils_join(...classes),
        method: "post"
      }, external_react_default.a.createElement("label", {
        htmlFor: "search"
      }), external_react_default.a.createElement("input", {
        type: "text",
        name: "search",
        id: "search",
        "aria-label": "search",
        className: style.searchTextbox,
        placeholder: "Search"
      }), external_react_default.a.createElement("button", {
        id: "search",
        title: "Search",
        value: "",
        className: style.searchButton,
        onClick: this.performSearch
      }, external_react_default.a.createElement("i", {
        className: `material-icons ${style.searchButtonIcon}`
      }, "search")));
    });
  }

}

/* harmony default export */ var sidebar_SidebarSearch = (SidebarSearch_SidebarSearch);
// CONCATENATED MODULE: ./src/client/selectors/sidemenu.selector.ts

const getSidemenu = Object(external_reselect_["createSelector"])(state => state, state => ({
  fixed: state.documentation.sidebar.fixed,
  hovered: state.documentation.sidebar.hovered,
  expanded: state.documentation.sidebar.expanded,
  offsetTop: state.navigation.offsetTop
}));
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sidebar/SidebarMenu.tsx
function SidebarMenu_extends() { SidebarMenu_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return SidebarMenu_extends.apply(this, arguments); }

function SidebarMenu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const headers = ['Introduction', 'Endpoints'];
const SidebarMenu_Dispatchers = {
  setHovered: setHovered,
  setFixed: setFixed
};

class SidebarMenu_SidebarMenu extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    SidebarMenu_defineProperty(this, "onMouseEnter", () => {
      this.props.setHovered(true);
    });

    SidebarMenu_defineProperty(this, "onMouseExit", () => {
      this.props.setHovered(false);
    });

    SidebarMenu_defineProperty(this, "getProperties", style => {
      const styles = [style.sideMenu];
      const cssTop = this.props.fixed ? this.props.offsetTop : 'auto';
      appendWhen(styles, !this.props.expanded, style.sideMenuClosed);
      appendWhen(styles, !this.props.expanded && this.props.hovered, style.sideMenuPeek);
      appendWhen(styles, this.props.fixed, style.fixed);
      const common = {
        ref: this.props.self,
        style: {
          top: cssTop
        },
        className: react_utils_join(...styles)
      };
      const actions = {
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseExit
      };
      return {
        common,
        actions
      };
    });

    SidebarMenu_defineProperty(this, "render", () => {
      const style = this.props.styling;
      const {
        common,
        actions
      } = this.getProperties(style);
      return external_react_default.a.createElement("aside", SidebarMenu_extends({}, common, actions), external_react_default.a.createElement(TopSection_TopSection, {
        styling: style
      }), external_react_default.a.createElement(sidebar_SidebarSearch, {
        styling: style,
        menuState: this.state
      }), external_react_default.a.createElement(MiddleSection_MiddleSection, {
        styling: style,
        header: headers[0]
      }), external_react_default.a.createElement(MainSection_MainSection, {
        styling: style,
        header: headers[1]
      }));
    });
  }

}

const SidebarMenu_mapStateToProps = state => getSidemenu(state.presentation);

/* harmony default export */ var sidebar_SidebarMenu = (Object(external_react_redux_["connect"])(SidebarMenu_mapStateToProps, SidebarMenu_Dispatchers)(SidebarMenu_SidebarMenu));
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sandbox/SandboxSection.tsx
function SandboxSection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class SandboxSection_SandboxSection extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    SandboxSection_defineProperty(this, "render", () => {
      return external_react_default.a.createElement("div", null, " ");
    });
  }

}

/* harmony default export */ var sandbox_SandboxSection = (SandboxSection_SandboxSection);
// CONCATENATED MODULE: ./src/client/selectors/sandbox.selector.ts

const getSandbox = Object(external_reselect_["createSelector"])(state => state, state => ({
  fixedTop: state.documentation.sandbox.fixedTop,
  fixedBottom: state.documentation.sandbox.fixedBottom,
  offsetBottom: state.documentation.sandbox.offsetBottom,
  offsetTop: state.navigation.offsetTop
}));
// CONCATENATED MODULE: ./src/client/components/sections/documentation/children/sandbox/SandboxArea.tsx
function SandboxArea_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const SandboxArea_Dispatchers = {
  setTopFixed: setTopFixed,
  setBottomFixed: setBottomFixed
};

class SandboxArea_SandboxArea extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    SandboxArea_defineProperty(this, "getProperties", style => {
      const styles = [style.sandboxArea];
      const cssTop = this.props.fixedTop ? this.props.offsetTop : this.props.fixedBottom ? this.props.offsetBottom : 'auto';
      appendWhen(styles, this.props.fixedTop, style.fixed);
      const common = {
        ref: this.props.self,
        style: {
          top: cssTop
        },
        className: react_utils_join(...styles)
      };
      return {
        common
      };
    });

    SandboxArea_defineProperty(this, "render", () => {
      const style = this.props.styling;
      const {
        common
      } = this.getProperties(style);
      return external_react_default.a.createElement("aside", common, external_react_default.a.createElement(sandbox_SandboxSection, {
        styling: style
      }), external_react_default.a.createElement(sandbox_SandboxSection, {
        styling: style
      }));
    });
  }

}

const SandboxArea_mapStateToProps = state => getSandbox(state.presentation);

/* harmony default export */ var sandbox_SandboxArea = (Object(external_react_redux_["connect"])(SandboxArea_mapStateToProps, SandboxArea_Dispatchers)(SandboxArea_SandboxArea));
// CONCATENATED MODULE: ./src/client/components/sections/documentation/DocsPage.tsx
function DocsPage_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class DocsPage_DocsPage extends external_react_default.a.Component {
  constructor(props) {
    super(props);

    DocsPage_defineProperty(this, "footer", void 0);

    DocsPage_defineProperty(this, "sidebar", void 0);

    DocsPage_defineProperty(this, "sandbox", void 0);

    DocsPage_defineProperty(this, "content", void 0);

    DocsPage_defineProperty(this, "shouldComponentUpdate", () => false);

    DocsPage_defineProperty(this, "handleScroll", (offsetBottom = 0) => {
      const fixedTop = this.props.sandboxFixedTop;
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;
      const bottomFixed = this.props.sandboxFixedBottom;

      if (scroll > offsetBottom) {
        if (!bottomFixed && fixedTop) {
          this.props.setSandboxFixedBottom(true);
        }
      } else if (scroll <= offsetBottom) {
        if (bottomFixed) {
          this.props.setSandboxFixedBottom(false);
        }
      }
    });

    DocsPage_defineProperty(this, "componentDidMount", () => {
      const body = document.body;
      const sandbox = this.sandbox.current;
      const footer = this.footer.current;
      const scroll = body.getBoundingClientRect().top;
      const scrollBottom = footer.getBoundingClientRect().top - sandbox.getBoundingClientRect().height;
      const bottomPosition = Math.abs(scroll) + scrollBottom;
      this.applyInitialValues(bottomPosition);

      window.onscroll = () => this.handleScroll(bottomPosition - this.props.offsetTop);
    });

    DocsPage_defineProperty(this, "applyInitialValues", bottomPosition => {
      const fixedTop = this.props.sandboxFixedTop;
      const scroll = document.body.scrollTop || document.documentElement.scrollTop;

      if (!fixedTop) {
        if (scroll >= bottomPosition) {
          this.props.setAll(true, false, true, bottomPosition);
        } else {
          this.props.setAll(false, false, false, bottomPosition);
        }
      }
    });

    DocsPage_defineProperty(this, "render", () => {
      const style = this.props.styling;
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(sidebar_SidebarMenu, {
        self: this.sidebar,
        styling: style
      }), external_react_default.a.createElement(sandbox_SandboxArea, {
        self: this.sandbox,
        styling: style
      }), external_react_default.a.createElement(content_ContentArea, {
        self: this.content,
        styling: style
      }), external_react_default.a.createElement(footer_FooterArea, {
        self: this.footer,
        styling: style
      }));
    });

    this.footer = Object(external_react_["createRef"])();
    this.sidebar = Object(external_react_["createRef"])();
    this.sandbox = Object(external_react_["createRef"])();
    this.content = Object(external_react_["createRef"])();
  }

}

const DocsPage_mapStateToProps = state => ({
  offsetTop: state.presentation.navigation.offsetTop,
  sandboxFixedTop: state.presentation.documentation.sandbox.fixedTop,
  sandboxFixedBottom: state.presentation.documentation.sandbox.fixedBottom
});

/* harmony default export */ var documentation_DocsPage = (Object(external_react_redux_["connect"])(DocsPage_mapStateToProps, section_action_Dispatchers)(DocsPage_DocsPage));
// CONCATENATED MODULE: ./src/client/components/sections/information/AboutPage.tsx
function AboutPage_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class AboutPage_AboutPage extends external_react_default.a.PureComponent {
  constructor(...args) {
    super(...args);

    AboutPage_defineProperty(this, "render", () => {
      return external_react_default.a.createElement(external_react_["Fragment"], null);
    });
  }

}

/* harmony default export */ var information_AboutPage = (AboutPage_AboutPage);
// CONCATENATED MODULE: ./src/client/components/sections/administration/AdminPage.tsx
function AdminPage_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class AdminPage_AdminPage extends external_react_default.a.PureComponent {
  constructor(...args) {
    super(...args);

    AdminPage_defineProperty(this, "render", () => {
      return external_react_default.a.createElement(external_react_["Fragment"], null);
    });
  }

}

/* harmony default export */ var administration_AdminPage = (AdminPage_AdminPage);
// CONCATENATED MODULE: ./src/client/components/shared/Lost.tsx
function Lost_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Lost_Lost extends external_react_default.a.PureComponent {
  constructor(...args) {
    super(...args);

    Lost_defineProperty(this, "render", () => {
      return external_react_default.a.createElement("h2", null, "404 Not Found");
    });
  }

}
// CONCATENATED MODULE: ./src/client/components/Routes.tsx
function Routes_extends() { Routes_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Routes_extends.apply(this, arguments); }







const Routes_routes = [{
  path: '/'
}, {
  navLink: true,
  label: 'Documentation',
  path: '/documentation'
}, {
  navLink: true,
  label: 'About',
  path: '/about'
}, {
  navLink: true,
  label: 'Admin',
  path: '/admin'
}, {
  path: '*'
}];
/* harmony default export */ var Routes = (otherProps => [{ ...Routes_routes[0],
  render: props => external_react_default.a.createElement(documentation_DocsPage, Routes_extends({}, props, otherProps))
}, { ...Routes_routes[1],
  render: props => external_react_default.a.createElement(documentation_DocsPage, Routes_extends({}, props, otherProps))
}, { ...Routes_routes[2],
  render: props => external_react_default.a.createElement(information_AboutPage, Routes_extends({}, props, otherProps))
}, { ...Routes_routes[3],
  render: props => external_react_default.a.createElement(administration_AdminPage, Routes_extends({}, props, otherProps))
}, { ...Routes_routes[4],
  render: props => external_react_default.a.createElement(Lost_Lost, Routes_extends({}, props, otherProps))
}]);
// CONCATENATED MODULE: ./src/client/components/App.tsx
function App_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class App_App extends external_react_default.a.PureComponent {
  constructor(props) {
    super(props);

    App_defineProperty(this, "padder", void 0);

    App_defineProperty(this, "componentDidMount", () => {
      const padder = this.padder.current;
      this.setState({
        navPadding: padder.clientHeight
      });
    });

    App_defineProperty(this, "render", () => {
      const routes = Routes({
        styling: app_default.a
      });
      const elements = routes.filter(x => x.navLink === true).map(x => {
        return {
          link: x.path,
          label: x.label
        };
      });
      const routings = routes.map((route, idx) => external_react_default.a.createElement(external_react_router_dom_["Route"], {
        exact: true,
        key: idx,
        path: route.path,
        render: route.render
      }));
      return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(NavbarPadder_NavbarPadder, {
        self: this.padder,
        styling: app_default.a
      }), external_react_default.a.createElement(external_react_router_dom_["Switch"], null, " ", routings, " "), external_react_default.a.createElement(navbar_Navbar, {
        styling: app_default.a,
        location: this.props.location,
        brandName: client_config.app.NAME,
        routings: elements
      }));
    });

    this.padder = external_react_default.a.createRef();
    this.state = {
      navPadding: 0
    };
  }

}

/* harmony default export */ var components_App = (withStyles_default()(app_default.a)(App_App));
// EXTERNAL MODULE: external "isomorphic-style-loader/StyleContext"
var StyleContext_ = __webpack_require__(14);
var StyleContext_default = /*#__PURE__*/__webpack_require__.n(StyleContext_);

// EXTERNAL MODULE: external "react-router"
var external_react_router_ = __webpack_require__(15);

// CONCATENATED MODULE: ./src/client/views/index.jsx





const views_client = (store, insertCss, window) => external_react_default.a.createElement(external_react_redux_["Provider"], {
  onUpdate: () => window.scrollTo(0, 0),
  store: store
}, external_react_default.a.createElement(external_react_router_["BrowserRouter"], null, external_react_default.a.createElement(StyleContext_default.a.Provider, {
  value: {
    insertCss
  }
}, external_react_default.a.createElement(components_App, {
  location: window.location.pathname
}))));
const server = (url, store, context, insertCss) => external_react_default.a.createElement(external_react_redux_["Provider"], {
  store: store
}, external_react_default.a.createElement(external_react_router_["StaticRouter"], {
  onUpdate: () => window.scrollTo(0, 0),
  location: url,
  context: context
}, external_react_default.a.createElement(StyleContext_default.a.Provider, {
  value: {
    insertCss
  }
}, external_react_default.a.createElement(components_App, {
  location: url
}))));
// CONCATENATED MODULE: ./src/client/renderers/ViewRender.tsx
function ViewRender_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class ViewRender_IndexViewRenderer extends renderer {
  constructor() {
    super();

    ViewRender_defineProperty(this, "routing", '/');

    ViewRender_defineProperty(this, "router", void 0);

    ViewRender_defineProperty(this, "store", void 0);

    ViewRender_defineProperty(this, "getRoute", () => {
      return this.routing;
    });

    ViewRender_defineProperty(this, "getRouter", () => {
      return this.router;
    });

    ViewRender_defineProperty(this, "setupRoutes", router => {
      Routes_routes.map(x => router.get(x.path, this.renderRoutes));
    });

    ViewRender_defineProperty(this, "renderRoutes", (req, res) => {
      const client = client_config.app.CSR;
      const shell = req.query.shell !== undefined;
      res.setHeader(client_config.header.LABEL, client_config.header.VALUE);

      if (shell) {
        res.status(200).send(client ? external_react_default.a.createElement('') : template());
      } else {
        const css = new Set();
        const state = this.store.getState();

        const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

        const args = {
          css: css,
          state: state,
          title: client_config.app.TITLE,
          enableSW: true,
          content: server(req.url, this.store, {}, insertCss)
        };
        res.send(client ? external_react_default.a.createElement('') : template(args));
      }
    });

    this.router = Object(external_express_["Router"])();
    this.store = configureStore({});
    this.setupRoutes(this.router);
  }

}

/* harmony default export */ var ViewRender = (ViewRender_IndexViewRenderer);
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

        default:
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
  viewRenderer: [new ViewRender()],
  interceptor: new interceptor()
};
new application_Application(server_args).startlistening();

/***/ })
/******/ ]);