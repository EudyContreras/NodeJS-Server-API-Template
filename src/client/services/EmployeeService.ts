import axios from 'axios';

const endpoints = {
   GET_EMPLOYEES: 'rest/api/employees/v2',
}

export default class EmployeeService {

   getAll = async () => {
      return { employees: ['Jose', 'Anette', 'Joe', 'Maria'], error: null };
   }
}