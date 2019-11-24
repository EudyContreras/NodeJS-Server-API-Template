import {
	DOCUMENTATION_SECTION_ALL_FIXED,
	DOCUMENTATION_SECTION_ALL_OFFSETS,
	DOCUMENTATION_SECTION_SIDEBAR_FIXED,
	DOCUMENTATION_SECTION_SIDEBAR_OFFSETS,
	DOCUMENTATION_SECTION_SANDBOX_FIXED,
	DOCUMENTATION_SECTION_SANDBOX_OFFSETS
} from '../../actions/documentation/section.action';

import { SIDE_MENU } from '../../actions/documentation/children/sidemenu.action';
import { SANDBOX_AREA } from '../../actions/documentation/children/sandbox.action';

import * as SideMenu from '../documentation/children/sidemenu.reducer';
import * as Sandbox from '../documentation/children/sandbox.reducer';

import IAction from '../../actions/action';

export interface IDocumentationArea {
	sidebarData: {
		fixed: boolean;
		offsetTop: number;
		offsetBottom: number;
	};
	sandboxData: {
		fixed: boolean;
		offsetTop: number;
		offsetBottom: number;
	};
	sidemenu: SideMenu.ISideMenu;
	sandbox: Sandbox.ISandboxArea;
}

export const InitialState: IDocumentationArea = {
	sidebarData: {
		fixed: false,
		offsetTop: 0,
		offsetBottom: 0
	},
	sandboxData: {
		fixed: false,
		offsetTop: 0,
		offsetBottom: 0
	},
	sidemenu: SideMenu.InitialState,
	sandbox: Sandbox.InitialState
};

export default function (state = InitialState, action: IAction): IDocumentationArea {
	if (action.from) return handleSubReducers(state, action);
	switch (action.type) {
		case DOCUMENTATION_SECTION_SIDEBAR_FIXED: {
			return {
				...state,
				sidebarData: {
					...state.sidebarData,
					fixed: action.payload
				}
			};
		}
		case DOCUMENTATION_SECTION_SIDEBAR_OFFSETS: {
			return {
				...state,
				sidebarData: {
					...state.sidebarData,
					offsetTop: action.payload.offsetTop,
					offsetBottom: action.payload.offsetBottom
				}
			};
		}
		case DOCUMENTATION_SECTION_SANDBOX_FIXED: {
			return {
				...state,
				sandboxData: {
					...state.sandboxData,
					fixed: action.payload
				}
			};
		}
		case DOCUMENTATION_SECTION_SANDBOX_OFFSETS: {
			return {
				...state,
				sandboxData: {
					...state.sandboxData,
					offsetTop: action.payload.offsetTop,
					offsetBottom: action.payload.offsetBottom
				}
			};
		}
		case DOCUMENTATION_SECTION_ALL_FIXED: {
			return {
				...state,
				sidebarData: {
					...state.sidebarData,
					fixed: action.payload.sidebarFixed,
				},
				sandboxData: {
					...state.sandboxData,
					fixed: action.payload.sandboxFixed
				}
			};
		}
		case DOCUMENTATION_SECTION_ALL_OFFSETS: {
			return {
				...state,
				sidebarData: {
					...state.sidebarData,
					offsetTop: action.payload.sidebarOffsetTop,
					offsetBottom: action.payload.sidebarOffsetBottom
				},
				sandboxData: {
					...state.sandboxData,
					offsetTop: action.payload.sandboxOffsetTop,
					offsetBottom: action.payload.sandboxOffsetBottom
				}
			};
		}
		default:
			return state;
	}
}

function handleSubReducers(state = InitialState, action: IAction): IDocumentationArea {
	switch(action.from) {
		case SIDE_MENU: {
			return {
				...state,
				sidemenu: SideMenu.default(state.sidemenu, action)
			};
		}
		case SANDBOX_AREA: {
			return {
				...state,
				sandbox: Sandbox.default(state.sandbox, action)
			};
		}
		default:
			return state; 
	};
};