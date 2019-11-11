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
class Reports extends react_1.PureComponent {
    render() {
        return (react_1.default.createElement("div", { className: 'container' },
            react_1.default.createElement("p", null, this.props.content)));
    }
}
exports.default = Reports;
