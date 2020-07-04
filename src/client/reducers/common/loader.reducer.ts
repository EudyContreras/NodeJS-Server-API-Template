import {
	ROUTE_LOADER,
	ROUTE_LOADER_SHOW,
	ROUTE_LOADER_HIDE
} from '../../actions/common/loader.action';

import IAction from '../../actions/action';

export const SOURCE = ROUTE_LOADER;

export interface IRouteLoader{
	isActive: boolean;
	loadedRoutes: string[];
}

export const InitialState: IRouteLoader = {
	isActive: true,
	loadedRoutes: []
};

export default function (state = InitialState, action: IAction): IRouteLoader {
	switch (action.type) {
		case ROUTE_LOADER_SHOW: {
			return {
				...state,
				isActive: true
			};
		}
		case ROUTE_LOADER_HIDE: {
			return {
				...state,
				isActive: false,
				loadedRoutes: [action.payload, ...Array.from(state.loadedRoutes)]
			};
		}
		default:
			return state;
	}
}