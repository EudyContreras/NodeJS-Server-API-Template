import { combineReducers } from 'redux';
import sidemenuReducer from './common/sidemenu.reducer';

export default combineReducers({
	sidemenu: sidemenuReducer
});