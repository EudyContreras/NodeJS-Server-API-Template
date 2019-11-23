import {
	NAV_MENU_FIXED,
	NAV_MENU_HOVERED
} from '../../actions/common/navigation.action';

import IAction from '../../actions/action';

export interface INavigationTab {
	hovered: boolean;
	active: boolean;
}

export interface INavigationBar {
	fixed: boolean;
	hovered: boolean;
	navigationTabs: INavigationTab[];
}

export const InitialState: INavigationBar = {
	fixed: false,
	hovered: false,
	navigationTabs: []
};

export default function (state = InitialState, action: IAction): INavigationBar {
	switch (action.type) {
		case NAV_MENU_HOVERED: {
			return {
				...state,
				hovered: action.payload
			};
		}
		case NAV_MENU_FIXED: {
			return {
				...state,
				fixed: action.payload
			};
		}
		default:
			return state;
	}
}