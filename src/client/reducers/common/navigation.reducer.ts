import {
	NAV_BAR_MENU,
	NAV_BAR_MENU_ANCHORED,
	NAV_BAR_MENU_OFFSET_TOP,
	NAV_BAR_MENU_ACTIVE_TAB,
	NAV_BAR_MENU_MOUSE_INSIDE
} from '../../actions/common/navigation.action';

export const SOURCE = NAV_BAR_MENU;

import IAction from '../../actions/action';

export interface INavigationTab {
	hovered: boolean;
	active: boolean;
}

export interface INavigationBar {
	anchored: boolean;
	offsetTop: number;
	mouseInside: boolean | null;
	acitiveTab: null | {
		label: string;
		index: number;
	};
	navigationTabs: INavigationTab[];
}

const InitialState: INavigationBar = {
	anchored: false,
	offsetTop: 0,
	mouseInside: null,
	acitiveTab: null,
	navigationTabs: []
};

export default function (state = InitialState, action: IAction): INavigationBar {
	switch (action.type) {
		case NAV_BAR_MENU_ANCHORED: {
			return {
				...state,
				anchored: action.payload,
				mouseInside: !action.payload ? null : state.mouseInside
			};
		}
		case NAV_BAR_MENU_ACTIVE_TAB: {
			return {
				...state,
				acitiveTab: action.payload
			};
		}
		case NAV_BAR_MENU_MOUSE_INSIDE: {
			return {
				...state,
				mouseInside: action.payload
			};
		}
		case NAV_BAR_MENU_OFFSET_TOP: {
			return {
				...state,
				offsetTop: action.payload
			};
		}
		default:
			return state;
	}
}