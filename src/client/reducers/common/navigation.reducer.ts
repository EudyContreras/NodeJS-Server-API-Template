import {
	NAV_BAR_MENU,
	NAV_BAR_MENU_ANCHORED,
	NAV_BAR_MENU_OFFSET_TOP,
	NAV_BAR_MENU_ACTIVE_TAB,
	NAV_BAR_MENU_MOUSE_INSIDE
} from '../../actions/common/navigation.action';

import IAction from '../../actions/action';
import { LinkInfo } from '../../components/Routes';

export const SOURCE = NAV_BAR_MENU;

export interface INavigationTab {
	hovered: boolean;
	active: boolean;
}

export interface INavigationBar {
	anchored: boolean;
	offsetTop: number;
	navbarHeight: number;
	mouseInside: boolean | null;
	acitiveTab: LinkInfo | null;
	navigationTabs: INavigationTab[];
}

export const InitialState: INavigationBar = {
	anchored: false,
	offsetTop: 0,
	navbarHeight: 0,
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
				offsetTop: action.payload.offset,
				navbarHeight: action.payload.height
			};
		}
		default:
			return state;
	}
}
