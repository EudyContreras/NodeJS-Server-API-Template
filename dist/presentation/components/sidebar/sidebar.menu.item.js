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
const sidebar_sub_menu_1 = __importDefault(require("./sidebar.sub menu"));
const classes = {};
class SideMenuItem extends react_1.PureComponent {
    render() {
        const hash = this.props.hash;
        const label = this.props.label;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("li", { className: 'menu-item' },
                react_1.default.createElement("a", { href: hash }, label),
                react_1.default.createElement("i", { className: 'material-icons' }, "chevron_right")),
            react_1.default.createElement(sidebar_sub_menu_1.default, null)));
    }
}
exports.default = SideMenuItem;
