"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const app_1 = __importDefault(require("./presentation/components/app"));
const store_1 = __importDefault(require("./presentation/store"));
const saga_1 = __importDefault(require("./presentation/saga"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const initialState = window.__REDUX_STATE__ || {};
const store = store_1.default(initialState);
store.runSaga(saga_1.default);
react_dom_1.default.hydrate(react_1.default.createElement(react_redux_1.Provider, { store: store },
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(app_1.default, null))), document.getElementById('content'));
