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
const sidebar_sub_item_1 = __importDefault(require("./sidebar.sub.item"));
class SidebarSubMenu extends react_1.PureComponent {
    render() {
        const links = [
            {
                label: 'Register dfsd sfsds sdssssuser',
                method: { label: 'PUT' }
            },
            {
                label: 'Get all users',
                method: { label: 'GET' }
            },
            {
                label: 'Update user',
                method: { label: 'PAT' }
            },
            {
                label: 'Delete user',
                method: { label: 'DEL' }
            }
        ];
        return (react_1.default.createElement("ul", { className: 'sub-menu' }, links.map(x => react_1.default.createElement(sidebar_sub_item_1.default, { hash: '#' + x, label: x.label, method: x.method.label }))));
    }
}
exports.default = SidebarSubMenu;
