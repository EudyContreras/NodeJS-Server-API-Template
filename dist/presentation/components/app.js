"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const routes_1 = __importDefault(require("../routes"));
class Routing extends react_1.default.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (react_1.default.createElement(react_router_1.StaticRouter, { location: this.props.url },
            react_1.default.createElement(react_router_1.Switch, null, routes_1.default.map((route, idx) => (react_1.default.createElement(react_router_1.Route, Object.assign({ exact: true, key: idx }, route)))))));
    }
}
exports.default = Routing;
