"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("react-dom/server"));
const controller_view_1 = __importDefault(require("../controller.view"));
const app_1 = __importDefault(require("../../presentation/components/app"));
class IndexController extends controller_view_1.default {
    constructor() {
        super('index');
        this.routing = '/';
        this.render = (request, response) => {
            // const theHtml = `
            //    <html>
            //    <head><title>My First SSR</title></head>
            //    <body>
            //    <h1>My First Server Side Render</h1>
            //    <div id='reactele'>{{{reactele}}}</div>
            //    <script>var exports = {};</script>
            //    <script src='presentation/components/app.js' charset='utf-8'></script>
            //    <script src='presentation/components/vendor.js' charset='utf-8'></script>
            //    </body>
            //    </html>
            //    `;
            //    const hbsTemplate = handlebars.compile(theHtml);
            //    const reactComp = renderToString(React.createElement(App));
            //    const htmlToSend = hbsTemplate({ reactele: reactComp });
            //    response.send(htmlToSend);
            const context = {};
            response.render('layout', {
                content: server_1.default.renderToString(react_1.default.createElement(app_1.default))
            });
        };
        this.handlePost = (request, response) => {
            response.send('What');
        };
        this.router = express_1.default.Router();
        this.setupRoutes(this.router);
    }
    getRoute() {
        return this.routing;
    }
    getRouter() {
        return this.router;
    }
    setupRoutes(router) {
        router.get('/', this.render);
        router.post('/', this.handlePost);
    }
}
exports.default = IndexController;
