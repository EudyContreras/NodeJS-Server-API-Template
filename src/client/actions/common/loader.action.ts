export const ROUTE_LOADER = 'ROUTE_LOADER';

export const ROUTE_LOADER_HIDE = 'ROUTE_LOADER_HIDE';
export const ROUTE_LOADER_SHOW = 'ROUTE_LOADER_SHOW';

export interface DispatchProps {
	showLoader: () => void;
	hideLoader: (loadedRoute?: string) => void;
}

export const showLoader = () => (dispatch: (action?: any) => any): void => {
	dispatch(showLoaderAction);
};

export const hideLoader = (loadedRoute?: string) => (dispatch: (action?: any) => any): void => {
	dispatch({ ...hideLoaderAction, payload: loadedRoute });
};

export const showLoaderAction = {
	from: ROUTE_LOADER,
	type: ROUTE_LOADER_SHOW
};

export const hideLoaderAction = {
	from: ROUTE_LOADER,
	type: ROUTE_LOADER_HIDE
};

export const Dispatchers = {
	showLoader,
	hideLoader
};
