import {
	SANDBOX_AREA,
	SANDBOX_AREA_HOVERED,
	SANDBOX_AREA_FIXED_TOP,
	SANDBOX_AREA_FIXED_BOTTOM,
} from '../../actions/documentation/sandbox.action';

import IAction from '../../actions/action';

export const SOURCE = SANDBOX_AREA;

export interface ISandboxArea {
	hovered: boolean;
	fixedTop: boolean;
	fixedBottom: boolean;
}

export const InitialState: ISandboxArea = {
	fixedTop: false,
	fixedBottom: false,
	hovered: false,
};

export default function (state = InitialState, action: IAction): ISandboxArea {
	switch (action.type) {
		case SANDBOX_AREA_FIXED_TOP: {
			return {
				...state,
				fixedTop: action.payload,
			};
		}
		case SANDBOX_AREA_FIXED_BOTTOM: {
			return {
				...state,
				fixedBottom: action.payload,
			};
		}
		case SANDBOX_AREA_HOVERED: {
			return {
				...state,
				hovered: action.payload,
			};
		}
		default:
			return state;
	}
}