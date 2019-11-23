import { combineReducers } from 'redux';
import sidemenuReducer from './common/sidemenu.reducer';
import navigationReducer from './common/navigation.reducer';

export default combineReducers({
	navbar: navigationReducer,
	sidemenu: sidemenuReducer
});