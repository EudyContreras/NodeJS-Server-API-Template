import {
	SANDBOX_AREA,
	SANDBOX_AREA_HOVERED,
	SANDBOX_AREA_FIXED_TOP,
	SANDBOX_AREA_FIXED_BOTTOM,
	SANDBOX_AREA_OFFSET_BOTTOM
} from '../../actions/documentation/sandbox.action';

import IAction from '../../actions/action';

export const SOURCE = SANDBOX_AREA;

export interface ISandboxArea {
	hovered: boolean;
	fixedTop: boolean;
	fixedBottom: boolean;
	offsetBottom: number;
}

export const InitialState: ISandboxArea = {
	hovered: false,
	fixedTop: false,
	fixedBottom: false,
	offsetBottom: 0
};

export default function (state = InitialState, action: IAction): ISandboxArea {
	switch (action.type) {
		case SANDBOX_AREA_HOVERED: {
			return {
				...state,
				hovered: action.payload
			};
		}
		case SANDBOX_AREA_FIXED_TOP: {
			return {
				...state,
				fixedTop: action.payload
			};
		}
		case SANDBOX_AREA_FIXED_BOTTOM: {
			return {
				...state,
				fixedBottom: action.payload
			};
		}
		case SANDBOX_AREA_OFFSET_BOTTOM: {
			return {
				...state,
				offsetBottom: action.payload
			};
		}
		default:
			return state;
	}
}