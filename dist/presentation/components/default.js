"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
class DefaultLayout extends react_1.PureComponent {
    render() {
        return (react_1.default.createElement("html", null,
            react_1.default.createElement("head", null,
                react_1.default.createElement("title", null, this.props.title),
                react_1.default.createElement("link", { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/index.css' }),
                react_1.default.createElement("link", { rel: "shortcut icon", type: "image/png", href: "/presentation/resources/images/favicon.png" }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/menu.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/restful.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/search.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/content.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/footer.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/navbar.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/sandbox.css' }),
                react_1.default.createElement("link", { rel: 'stylesheet', href: '/presentation/styles/submenu.css' })),
            react_1.default.createElement("body", null,
                react_1.default.createElement("div", { id: 'content', className: 'container' }, this.props.children),
                react_1.default.createElement("script", { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' }),
                react_1.default.createElement("script", { src: '/presentation/scripts/sticky.js' }),
                react_1.default.createElement("script", { src: '/presentation/scripts/ripple.js' }),
                react_1.default.createElement("script", { src: '/presentation/scripts/submenu.js' }),
                react_1.default.createElement("script", { src: '/presentation/scripts/sidemenu.js' }),
                react_1.default.createElement("script", { src: '/presentation/scripts/search.js' }),
                react_1.default.createElement("script", { src: '/presentation/scripts/main.js' }))));
    }
}
exports.default = DefaultLayout;
module.exports = DefaultLayout;
