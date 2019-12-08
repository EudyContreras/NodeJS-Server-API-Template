import { combineReducers } from 'redux';

import navigationReducer, { INavigationBar } from './common/navigation.reducer';
import documentationReducer, { IDocumentationArea } from './documentation/section.reducer';

export interface IPresentation {
	navigation: INavigationBar;
	documentation: IDocumentationArea;
}

export interface IStateTree {
	presentation: IPresentation;
}

export default combineReducers({
	presentation: combineReducers({
		navigation: navigationReducer,
		documentation: documentationReducer
	})
});