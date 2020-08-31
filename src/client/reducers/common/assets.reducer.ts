import { IMAGE_LOADED, FONTS_LOADED, ASSET_MANAGER } from '../../actions/common/assets.action';

import IAction from '../../actions/action';

export const SOURCE = ASSET_MANAGER;

export interface IAssetsState {
	fonts: Record<string, boolean>;
	images: Record<string, boolean>;
}

export const InitialState: IAssetsState = {
	fonts: {},
	images: {}
};

export default function (state = InitialState, action: IAction): IAssetsState {
	switch (action.type) {
		case IMAGE_LOADED: {
			const reccord = { [action.payload as string]: true };
			return {
				...state,
				images: { ...state.images, ...reccord }
			};
		}
		case FONTS_LOADED: {
			const reccord = { [action.payload as string]: true };
			return {
				...state,
				fonts: { ...state.fonts, ...reccord }
			};
		}
		default:
			return state;
	}
}
