import {
   LOADING_REPORTS,
   GET_ALL_REPORTS,
   GET_REPORT
} from '../../actions/report/types';

const initialState = {
   reports: [],
   loading: false
}

export default function name(state = initialState, action) {
   switch (action.type) {
      case LOADING_REPORTS:
         return {
            ...state,
            loading: true
         }
      case GET_ALL_REPORTS:
         return {
            ...state
         };
      case GET_REPORT:
         return {
            ...state
         };
      default:
         return state;
   }
}