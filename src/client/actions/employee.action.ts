import EmployeeService from '../services/EmployeeService'

export const LOADING_EMPLOYEES = 'LOADING_EMPLOYEES';
export const GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES';
export const ERROR_EVENT = 'EMPLOYEE_ERROR_EVENT';

export const getAllEmployees = () => async (dispatch:Function) => {
   dispatch(loading())

   const service = new EmployeeService();
   
   const { error, employees } = await service.getAll();
   
   if (error) return dispatch(onError(error));

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

export const onError = (error: any) => {
   return {
      type: ERROR_EVENT,
      payload: error
   };
}

