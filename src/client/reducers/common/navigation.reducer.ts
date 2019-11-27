import {
	NAV_BAR_MENU_ANCHORED,
	NAV_BAR_MENU_ACTIVE_TAB,
	NAV_BAR_MENU_MOUSE_INSIDE,
	NAV_BAR_MENU_MOUSE_OUTSIDE
} from '../../actions/common/navigation.action';

import IAction from '../../actions/action';

export interface INavigationTab {
	hovered: boolean;
	active: boolean;
}

export interface INavigationBar {
	anchored: boolean;
	offsetTop: number;
	mouseInside: boolean;
	mouseOutside: boolean;
	acitiveTab: null | {
		label: string;
		index: number;
	};
	navigationTabs: INavigationTab[];
}

const InitialState: INavigationBar = {
	anchored: false,
	offsetTop: 0,
	mouseInside: false,
	mouseOutside: false,
	acitiveTab: null,
	navigationTabs: []
};

export default function (state = InitialState, action: IAction): INavigationBar {
	switch (action.type) {
		case NAV_BAR_MENU_ANCHORED: {
			return {
				...state,
				anchored: action.payload,
				mouseInside: false,
				mouseOutside: false
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
				mouseInside: action.payload,
				mouseOutside: false
			};
		}
		case NAV_BAR_MENU_MOUSE_OUTSIDE: {
			return {
				...state,
				mouseOutside: action.payload,
				mouseInside: false
			};
		}
		default:
			return state;
	}
}