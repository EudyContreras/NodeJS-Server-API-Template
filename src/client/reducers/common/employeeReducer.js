import {
   LOADING_EMPLOYEES,
   GET_ALL_EMPLOYEES,
   ERROR_EVENT
} from '../../actions/employee.action';

const initialState = {
   employees: [],
   loading: false,
   error: null
}

export default function (state = initialState, action) {
   switch (action.type) {
      case LOADING_EMPLOYEES:
         return {
            ...state,
            loading: true
         }
      case GET_ALL_EMPLOYEES:
         return {
            ...state,
            employees: action.payload,
            loading: false
         };
      case ERROR_EVENT:
         return {
            ...state,
            error: action.payload,
            loading: false
         };
      default:
         return state;
   }
}