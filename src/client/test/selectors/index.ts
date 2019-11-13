import get from 'lodash/get';

export const employeeSelector = (state: any) => get(state, ['employeeReducer', 'employees']);