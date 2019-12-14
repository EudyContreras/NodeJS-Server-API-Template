import { combineReducers } from 'redux';

import navigationReducer, { INavigationBar } from './common/navigation.reducer';
import documentationReducer, { IDocumentationArea } from './documentation/section.reducer';
import appdataReducer, { IApplicationData } from './common/application.reducer';

export interface IPresentation {
	navigation: INavigationBar;
	documentation: IDocumentationArea;
}

export interface IGeneralData {
	appData: IApplicationData;
}

export interface IStateTree {
	presentation: IPresentation;
	appData: IApplicationData;
}

export default combineReducers({
	presentation: combineReducers({
		navigation: navigationReducer,
		documentation: documentationReducer
	}),
	generalData: combineReducers({
		appData: appdataReducer
	})
});