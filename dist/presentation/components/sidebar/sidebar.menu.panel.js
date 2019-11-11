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
const sidebar_menu_item_1 = __importDefault(require("./sidebar.menu.item"));
const sidebar_menu_search_1 = __importDefault(require("./sidebar.menu.search"));
class SideMenuPanel extends react_1.PureComponent {
    render() {
        const links = ['Quickstart', 'Basics'];
        const routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation', 'Roles', 'Invitation', 'Roles', 'Invitation'];
        const headers = ['Introduction', 'Endpoints'];
        const version = '1.3.5';
        return (react_1.default.createElement("aside", { className: 'side-menu natural' },
            react_1.default.createElement("div", { className: 'top-section' },
                react_1.default.createElement("div", { className: 'version-wrapper' },
                    react_1.default.createElement("h2", null, "Api Name"),
                    react_1.default.createElement("h5", null,
                        "version: ",
                        version)),
                react_1.default.createElement("div", { id: 'sidebar-toggle', title: 'expand', value: '', className: 'expand' },
                    react_1.default.createElement("i", { className: 'material-icons expand-icon' }, "chevron_right"))),
            react_1.default.createElement(sidebar_menu_search_1.default, null),
            react_1.default.createElement("h2", { className: 'menu-header' }, headers[0]),
            react_1.default.createElement("ul", { className: 'middle-section' }, links.map(x => react_1.default.createElement(sidebar_menu_item_1.default, { hash: '#' + x, label: x }))),
            react_1.default.createElement("h2", { className: 'menu-header' }, headers[1]),
            react_1.default.createElement("ul", { className: 'main-section' }, routes.map(x => react_1.default.createElement(sidebar_menu_item_1.default, { hash: '#' + x, label: x })))));
    }
}
exports.default = SideMenuPanel;
