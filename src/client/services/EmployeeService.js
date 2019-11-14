import axios from 'axios';

const endpoints = {
   GET_EMPLOYEES: 'api/employees/v2',
   getEmployee: function (id) {
      return `api/employees/${id}`
   }
}

export const EmployeeService = {
   getAll
}

async function getAll() {
   return { employees: ['Jose','Anette','Joe'] };
}