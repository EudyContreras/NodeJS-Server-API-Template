import { combineReducers } from 'redux';

import routeLoaderReducer, { IRouteLoader } from './common/loader.reducer';
import notifierReducer, { INavNotifier } from './common/notifier.reducer';
import navigationReducer, { INavigationBar } from './common/navigation.reducer';
import documentationReducer, { IDocumentationArea } from './documentation/section.reducer';
import appdataReducer, { IApplicationData } from './common/application.reducer';

export interface IPresentation {
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

export default combineReducers({
	presentation: combineReducers({
		navigation: navigationReducer,
		documentation: documentationReducer
	}),
	generalData: combineReducers({
		notifier: notifierReducer,
		routeLoader: routeLoaderReducer,
		appData: appdataReducer
	})
});