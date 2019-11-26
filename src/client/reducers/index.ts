import { combineReducers } from 'redux';

import navigationReducer from './common/navigation.reducer';
import documentationReducer from './documentation/section.reducer';

export default combineReducers({
	presentation: combineReducers({
		navbar: navigationReducer,
		documentation: documentationReducer
	})
});