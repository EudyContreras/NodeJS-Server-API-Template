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
class SideMenuSearch extends react_1.PureComponent {
    render() {
        return (react_1.default.createElement("form", { className: 'search-form shadow-elevate', method: 'post' },
            react_1.default.createElement("input", { type: 'text', className: 'textbox', placeholder: 'Search' }),
            react_1.default.createElement("button", { id: 'search', title: 'Search', value: '', className: 'button' },
                react_1.default.createElement("i", { className: 'material-icons search-icon' }, "search"))));
    }
}
exports.default = SideMenuSearch;
