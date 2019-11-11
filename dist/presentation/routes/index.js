"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("../components/home"));
const topics_1 = __importDefault(require("../components/topics"));
const notFound_1 = __importDefault(require("../components/notFound"));
exports.default = [
    {
        path: '/', component: home_1.default,
    },
    {
        path: '/topics', component: topics_1.default
    },
    {
        component: notFound_1.default
    }
];
