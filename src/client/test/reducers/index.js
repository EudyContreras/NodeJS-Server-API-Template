import { combineReducers } from 'redux';
import employeeReducer from './employee/employeeReducer';
import reportReducer from './report/reportReducer';

export default combineReducers({
   employees: employeeReducer,
   reports: reportReducer
})