const { EmployeeService } = require('../services/EmployeeService');

export const LOADING_EMPLOYEES = 'LOADING_EMPLOYEES';
export const GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES';
export const ERROR_EVENT = 'EMPLOYEE_ERROR_EVENT';

export const getAllEmployees = () => async dispatch => {
   dispatch(loading(true))

   const { error, employees } = await EmployeeService.getAll();
   
   if (error) return dispatch(error(error));

   dispatch({
      type: GET_ALL_EMPLOYEES,
      payload: employees
   });
}

export const loading = () => {
   return {
      type: LOADING_EMPLOYEES
   };
}

export const error = (error) => {
   return {
      type: ERROR_EVENT,
      payload: error
   };
}

