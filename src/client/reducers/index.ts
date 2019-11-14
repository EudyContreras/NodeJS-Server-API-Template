import { combineReducers } from 'redux';
import employeeReducer from './common/employeeReducer';
import reportReducer from './common/reportReducer';

export default combineReducers({
   employees: employeeReducer,
   reports: reportReducer
})