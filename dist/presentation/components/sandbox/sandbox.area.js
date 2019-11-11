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
const sandbox_area_section_1 = __importDefault(require("./sandbox.area.section"));
class SandboxArea extends react_1.PureComponent {
    render() {
        return (react_1.default.createElement("aside", { className: 'sandbox-area natural-sb bottom-sb' },
            react_1.default.createElement(sandbox_area_section_1.default, null),
            react_1.default.createElement(sandbox_area_section_1.default, null),
            react_1.default.createElement(sandbox_area_section_1.default, null),
            react_1.default.createElement(sandbox_area_section_1.default, null),
            react_1.default.createElement(sandbox_area_section_1.default, null)));
    }
}
exports.default = SandboxArea;
