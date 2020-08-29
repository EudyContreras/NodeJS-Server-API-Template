import { combineReducers } from 'redux';

import routeLoaderReducer, { IRouteLoader, InitialState as InitialRoutes } from './common/loader.reducer';
import assetsReducer, { IAssetsState, InitialState as InitialAssets } from './common/assets.reducer';
import notifierReducer, { INavNotifier, InitialState as InitialNotifier } from './common/notifier.reducer';
import navigationReducer, { INavigationBar, InitialState as InitialNavBar } from './common/navigation.reducer';
import documentationReducer, { IDocumentationArea, InitialState as InitialDocsArea } from './documentation/section.reducer';
import appdataReducer, { IApplicationData, InitialState as InitialAppData } from './common/application.reducer';

export interface IPresentation {
	assets: IAssetsState;
	navigation: INavigationBar;
	documentation: IDocumentationArea;
}

export interface IGeneralData {
	notifier: INavNotifier;
	routeLoader: IRouteLoader;
	appData: IApplicationData;
}

export interface IStateTree {
	presentation: IPresentation;
	generalData: IGeneralData;
}

const RootReducer = combineReducers({
	presentation: combineReducers({
		assets: assetsReducer,
		navigation: navigationReducer,
		documentation: documentationReducer
	}),
	generalData: combineReducers({
		notifier: notifierReducer,
		routeLoader: routeLoaderReducer,
		appData: appdataReducer
	})
});

export const InitialState : IStateTree = {
	presentation: {
		assets: InitialAssets,
		navigation: InitialNavBar,
		documentation: InitialDocsArea
	},
	generalData: {
		appData: InitialAppData,
		notifier: InitialNotifier,
		routeLoader: InitialRoutes
	}
};

export default RootReducer;
