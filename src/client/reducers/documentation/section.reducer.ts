import {
	DOCUMENTATION_SECTION_ALL,
	DOCUMENTATION_SECTION_ALL_FIXED,
	DOCUMENTATION_SECTION_SIDEBAR_FIXED,
	DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP,
	DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM,
	DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM
} from '../../actions/documentation/section.action';

import {
	NAV_BAR_MENU_ANCHORED
} from '../../actions/common/navigation.action';

import * as Navbar from '../common/navigation.reducer';
import * as Sidebar from '../documentation/sidebar.reducer';
import * as Sandbox from '../documentation/sandbox.reducer';

import IAction from '../../actions/action';

export const children = [
	Navbar.SOURCE,
	Sidebar.SOURCE,
	Sandbox.SOURCE
];

export interface IDocumentationArea {
	siblingA: boolean;
	siblingB: boolean;
	sidebar: Sidebar.ISideMenu;
	sandbox: Sandbox.ISandboxArea;
}

export const InitialState: IDocumentationArea = {
	siblingA: false,
	siblingB: false,
	sidebar: Sidebar.InitialState,
	sandbox: Sandbox.InitialState
};

export default (state = InitialState, action: IAction): IDocumentationArea => {
	if (action.from) return handleSubReducers(state, action);
	switch (action.type) {
		case DOCUMENTATION_SECTION_ALL: {
			return {
				...state,
				sidebar: {
					...state.sidebar,
					fixed: action.payload.sidebarFixed
				},
				sandbox: {
					...state.sandbox,
					fixedTop: action.payload.sandboxFixedTop,
					fixedBottom: action.payload.sandboxFixedBottom,
					offsetBottom: action.payload.sandboxOffsetBottom
				}
			};
		}
		case DOCUMENTATION_SECTION_ALL_FIXED: {
			return {
				...state,
				sidebar: {
					...state.sidebar,
					fixed: action.payload.sidebarFixed
				},
				sandbox: {
					...state.sandbox,
					fixedTop: action.payload.sandboxFixed,
					fixedBottom: false
				}
			};
		}
		case DOCUMENTATION_SECTION_SIDEBAR_FIXED: {
			return {
				...state,
				sidebar: {
					...state.sidebar,
					fixed: action.payload
				}
			};
		}
		case DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP: {
			return {
				...state,
				sandbox: {
					...state.sandbox,
					fixedTop: action.payload
				}
			};
		}
		case DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM: {
			return {
				...state,
				sandbox: {
					...state.sandbox,
					fixedBottom: action.payload,
					fixedTop: !action.payload
				}
			};
		}
		case DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM: {
			return {
				...state,
				sandbox: {
					...state.sandbox,
					offsetBottom: action.payload
				}
			};
		}
		default: return state;
	}
};

const handleSubReducers = (state = InitialState, action: IAction): IDocumentationArea => {
	switch (action.from) {
		case Navbar.SOURCE: {
			return handleNavbarActions(state, action);
		}
		case Sidebar.SOURCE, Sidebar.children[0]: {
			return {
				...state,
				sidebar: Sidebar.default(state.sidebar, action)
			};
		}
		case Sandbox.SOURCE: {
			return {
				...state,
				sandbox: Sandbox.default(state.sandbox, action)
			};
		}

		default: return state;
	};
};

const handleNavbarActions = (state = InitialState, action: IAction): IDocumentationArea => {
	switch (action.type) {
		case NAV_BAR_MENU_ANCHORED: {
			return {
				...state,
				sidebar: {
					...state.sidebar,
					fixed: action.payload
				},
				sandbox: {
					...state.sandbox,
					fixedTop: !state.sandbox.fixedBottom ? action.payload : false
				}
			};
		}
		default: return state;
	}
};