import {
	APPLICATION,
	APPLICATION_INSTALLED
} from '../../actions/common/application/appdata.action';

import IAction from '../../actions/action';

export const SOURCE = APPLICATION;

export interface IApplicationData {
	installed: boolean;
}

const InitialState: IApplicationData = {
	installed: false
};

export default function (state = InitialState, action: IAction): IApplicationData {
	switch (action.type) {
		case APPLICATION_INSTALLED: {
			return {
				...state,
				installed: action.payload
			};
		}
		default:
			return state;
	}
}
