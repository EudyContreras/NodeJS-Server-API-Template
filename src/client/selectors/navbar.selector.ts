import { IStateTree } from '../reducers/index';
import { createSelector } from 'reselect';

export const getNavigationBar = createSelector(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree) => ({
		anchored: state.presentation.navigation.anchored,
		mouseInside: state.presentation.navigation.mouseInside,
		activeTab: state.presentation.navigation.acitiveTab,
		loadedRoutes: state.generalData.routeLoader.loadedRoutes,
		isLoaderActive: state.generalData.routeLoader.isActive
	})
);
