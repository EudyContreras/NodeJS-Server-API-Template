import axios from 'axios';

const endpoints = {
   GET_EMPLOYEES: 'rest/api/employees/v2',
}

export const EmployeeService = {
   getAll
}

async function getAll() {
   return { employees: ['Jose','Anette','Joe', 'Maria'] };
}