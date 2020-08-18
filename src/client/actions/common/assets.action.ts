import IAction from '../action';

export const ASSET_MANAGER = 'ASSET_MANAGER';

export const IMAGE_LOADED = 'ASSET_MANAGER_IMAGE_LOADED';
export const FONTS_LOADED = 'ASSET_MANAGER_FONTS_LOADED';

export enum AssetType {
	IMAGE,
	FONTS,
	COMPONENT
}

export interface DispatchProps {
	setImageLoaded: (url: string) => IAction;
	setMaterialIconsLoaded: () => IAction;
}

export const setImageLoaded = (url: string) => (dispatch: (action?: IAction) => any): IAction =>
	dispatch({
		...ImageLoadedAction,
		payload: url
	});

export const setFontsLoaded = (name: string) => (dispatch: (action?: IAction) => any): IAction =>
	dispatch({
		...FontsLoadedAction,
		payload: name
	});

export const ImageLoadedAction = {
	from: ASSET_MANAGER,
	type: IMAGE_LOADED
};

export const FontsLoadedAction = {
	from: ASSET_MANAGER,
	type: FONTS_LOADED
};

export const Dispatchers = {
	setImageLoaded,
	setFontsLoaded
};
