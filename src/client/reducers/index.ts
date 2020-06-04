import { combineReducers } from 'redux';

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
	appData: IApplicationData;
}

export interface IStateTree {
	presentation: IPresentation | any;
	generalData: IApplicationData | any;
}

const reduxState: IStateTree = {
	presentation: combineReducers({
		navigation: navigationReducer,
		documentation: documentationReducer
	}),
	generalData: combineReducers({
		notifier: notifierReducer,
		appData: appdataReducer
	})
};
export default combineReducers(reduxState);