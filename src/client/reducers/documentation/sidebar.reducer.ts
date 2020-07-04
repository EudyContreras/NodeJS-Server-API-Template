import {
	SIDE_MENU,
	SIDE_MENU_FIXED,
	SIDE_MENU_TOGGLE,
	SIDE_MENU_HOVERED
} from '../../actions/documentation/sidebar.action';

import * as SearchBar from '../documentation/search.reducer';

import IAction from '../../actions/action';

export const SOURCE = SIDE_MENU;

export const children = [
	SearchBar.SOURCE
];

export interface IRoute {
	hovered: boolean;
	selected: boolean;
	pressed: boolean;
}

export interface IEndpoint {
	expanded: boolean;
	routes: IRoute[];
}

export interface IToggle {
	hidden: boolean;
	locked: boolean;
}

export interface ISideMenu{
	expanded: boolean;
	hovered: boolean;
	fixed: boolean;
	toggle: IToggle;
	searchbar: SearchBar.ISearchEvent;
	endpoints: IEndpoint[];
}

export const InitialState: ISideMenu = {
	expanded: true,
	hovered: false,
	fixed: false,
	toggle: {
		hidden: true,
		locked: true
	},
	searchbar: SearchBar.InitialState,
	endpoints: []
};

export default function (state = InitialState, action: IAction): ISideMenu {
	if (action.from != SOURCE) return handleSubReducers(state, action);
	switch (action.type) {
		case SIDE_MENU_TOGGLE: {
			return {
				...state,
				expanded: !state.expanded,
				toggle: {
					...state.toggle,
					locked: !state.expanded
				}
			};
		}
		case SIDE_MENU_HOVERED: {
			let forwardHover = state.hovered;
			let toggleHidden = state.toggle.hidden;

			if (state.expanded) {
				toggleHidden = !action.payload;
			}
			if (!state.expanded) {
				forwardHover = action.payload;
			}
			return {
				...state,
				hovered: forwardHover,
				toggle: {
					...state.toggle,
					hidden: toggleHidden
				}
			};
		}
		case SIDE_MENU_FIXED: {
			return {
				...state,
				fixed: action.payload
			};
		}
		default:
			return state;
	}
}

const handleSubReducers = (state = InitialState, action: IAction): ISideMenu => {
	switch(action.from) {
		case SearchBar.SOURCE: {
			return {
				...state,
				searchbar: SearchBar.default(state.searchbar, action)
			};
		}
		default:
			return state; 
	};
};