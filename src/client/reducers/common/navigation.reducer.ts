import {
	NAV_MENU_ANCHORED,
	NAV_MENU_HOVERED
} from '../../actions/common/navigation.action';

import IAction from '../../actions/action';

export interface INavigationTab {
	hovered: boolean;
	active: boolean;
}

export interface INavigationBar {
	hovered: boolean;
	anchored: boolean;
	navigationTabs: INavigationTab[];
}

const InitialState: INavigationBar = {
	hovered: false,
	anchored: false,
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
		case NAV_MENU_ANCHORED: {
			return {
				...state,
				anchored: action.payload
			};
		}
		default:
			return state;
	}
}