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
class SidebarSubItem extends react_1.PureComponent {
    render() {
        const hash = this.props.hash;
        const label = this.props.label;
        const method = this.props.method;
        return (react_1.default.createElement("li", { className: 'sub-menu-item' },
            react_1.default.createElement("h3", { className: 'http-method http-all' }, method),
            react_1.default.createElement("a", { className: 'truncate', href: hash }, label),
            react_1.default.createElement("i", { className: 'material-icons' }, "chevron_right")));
    }
}
exports.default = SidebarSubItem;
