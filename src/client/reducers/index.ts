import { combineReducers } from 'redux';
import routingsReducer from './common/routings.reducer';
import navbarReducer from './common/navbar.reducer';

export default combineReducers({
   routings: routingsReducer,
   items: navbarReducer
});