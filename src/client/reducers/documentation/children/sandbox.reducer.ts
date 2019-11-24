import {
	SANDBOX_AREA_FIXED,
	SANDBOX_AREA_HOVERED,
	SANDBOX_AREA_OFFSETS
} from '../../../actions/documentation/children/sandbox.action';

import IAction from '../../../actions/action';

export interface ISandboxArea {
	offsetTop: number;
	offsetBottom: number;
	hovered: boolean;
	fixed: boolean;
}

export const InitialState: ISandboxArea = {
	offsetTop: 0,
	offsetBottom: 0,
	hovered: false,
	fixed: false,
};

export default function (state = InitialState, action: IAction): ISandboxArea {
	switch (action.type) {
		case SANDBOX_AREA_FIXED: {
			return {
				...state,
				fixed: action.payload,
			};
		}
		case SANDBOX_AREA_HOVERED: {
			return {
				...state,
				hovered: action.payload,
			};
		}
		case SANDBOX_AREA_OFFSETS: {
			return {
				...state,
				offsetTop: action.payload.offsetTop,
				offsetBottom: action.payload.offsetBottom
			};
		}
		default:
			return state;
	}
}