import {
	DOCUMENTATION_SECTION_ALL_FIXED,
	DOCUMENTATION_SECTION_SIDEBAR_FIXED,
	DOCUMENTATION_SECTION_SANDBOX_FIXED
} from '../../actions/documentation/section.action';

import * as Sidebar from '../documentation/sidebar.reducer';
import * as Sandbox from '../documentation/sandbox.reducer';

import IAction from '../../actions/action';

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
		case DOCUMENTATION_SECTION_ALL_FIXED: {
			return {
				...state,
				sidebar: {
					...state.sidebar,
					fixed: action.payload.sidebarFixed,
				},
				sandbox: {
					...state.sandbox,
					fixedTop: action.payload.sandboxFixed
				}
			};
		}
		case DOCUMENTATION_SECTION_SIDEBAR_FIXED: {
			return {
				...state
			};
		}
		case DOCUMENTATION_SECTION_SANDBOX_FIXED: {
			return {
				...state
			};
		}
		default:
			return state;
	}
};

const handleSubReducers = (state = InitialState, action: IAction): IDocumentationArea => {
	switch(action.from) {
		case Sidebar.SOURCE: {
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
		default:
			return state; 
	};
};