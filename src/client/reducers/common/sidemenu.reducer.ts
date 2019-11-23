import {
	SIDE_MENU_TOGGLE,
	SIDE_MENU_FIXED
} from '../../actions/sidemenu.action';

interface IState {
	expanded: boolean;
	fixed: boolean;
}

interface IAction {
	type: string;
	payload: any | undefined;
}

const initialState: IState = {
	expanded: true,
	fixed: false
};

export default function (state = initialState, action: IAction): IState {
	switch (action.type) {
		case SIDE_MENU_TOGGLE:
			return {
				...state,
				expanded: !state.expanded
			};
		case SIDE_MENU_FIXED:
			return {
				...state,
				fixed: action.payload
			};
		default:
			return state;
	}
}