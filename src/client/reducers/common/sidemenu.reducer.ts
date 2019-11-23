import {
	SIDE_MENU_FIXED,
	SIDE_MENU_TOGGLE,
	SIDE_MENU_HOVERED,
	SIDE_MENU_TOGGLE_HIDDEN
} from '../../actions/sidemenu.action';

export interface IAction {
	type: string;
	payload: any | undefined;
}

export interface IState {
	toggle: {
		hidden: boolean;
	};
	expanded: boolean;
	hovered: boolean;
	fixed: boolean;
}

export const InitialState: IState = {
	toggle: {
		hidden: true
	},
	expanded: true,
	hovered: false,
	fixed: false
};

export default function (state = InitialState, action: IAction): IState {
	switch (action.type) {
		case SIDE_MENU_TOGGLE:
			return {
				...state,
				expanded: !state.expanded
			};
		case SIDE_MENU_HOVERED:
			return {
				...state,
				hovered: action.payload
			};
		case SIDE_MENU_FIXED:
			return {
				...state,
				fixed: action.payload
			};
		case SIDE_MENU_TOGGLE_HIDDEN:
			return {
				...state,
				toggle: {
					...state.toggle,
					hidden: action.payload
				}
			};
		default:
			return state;
	}
}