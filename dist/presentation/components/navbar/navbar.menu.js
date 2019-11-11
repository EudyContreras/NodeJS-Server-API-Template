"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const config_1 = __importDefault(require("../../config"));
const logo = config_1.default.directories.images('brandlogo.png');
const classes = {
    nav: 'nav',
    link: 'nav-link',
    logo: {
        self: 'logo',
        image: 'logo-image',
        text: 'logo-text',
    }
};
class NavbarMenu extends react_1.PureComponent {
    render() {
        const routes = this.props.routings;
        const links = [];
        routes.forEach((element, index) => {
            links.push(react_1.default.createElement("li", null,
                react_1.default.createElement("a", { className: classes.link, href: element.link }, element.label)));
        });
        return (react_1.default.createElement("header", { id: 'navbar', className: classes.nav },
            react_1.default.createElement("div", { className: classes.logo.self },
                react_1.default.createElement("img", { className: classes.logo.image, src: logo }),
                react_1.default.createElement("div", { className: classes.logo.text },
                    react_1.default.createElement("a", { href: '../../' }, this.props.brandName))),
            react_1.default.createElement("ul", null, links)));
    }
}
exports.default = NavbarMenu;
