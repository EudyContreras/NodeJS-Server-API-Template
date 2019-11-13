import axios from 'axios';
import {
   LOADING_EMPLOYEES,
   GET_ALL_EMPLOYEES,
   ERROR_EVENT,
   GET_EMPLOYEE
} from './types';

const { EmployeeService } = require('../../services/EmployeeService');

const endpoints = {
   GET_EMPLOYEES: 'api/employees/v2',
   getEmployee : function(id) {
      return `api/employees/${id}`
   }
}

export const getAllEmployees = () => async dispatch => {
   dispatch(setEmployeesLoading(true))
   const { error, employees } = await EmployeeService.getAll();
   
   if (error) {
      return dispatch(reportError(error));
   }

   dispatch({
      type: GET_ALL_EMPLOYEES,
      payload: employees
   })
}

export const getEmployee = (id) => dispatch => {
   dispatch(setEmployeesLoading(true))

   var onSuccess = (data) => ({
      type: GET_EMPLOYEE,
      payload: [data.content.employee]
   });

   var onError = (error) => (
      console.log("Error: " + error)
   );

   axios
      .get(endpoints.getEmployee(id))
      .then(res => dispatch(onSuccess(res.data)))
      .catch(err => onError(err));
}

export const setEmployeesLoading = () => {
   return {
      type: LOADING_EMPLOYEES
   };
}

export const reportError = (error) => {
   return {
      type: ERROR_EVENT,
      payload: error
   };
}

