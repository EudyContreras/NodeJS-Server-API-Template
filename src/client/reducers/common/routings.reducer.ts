import {
   GET_ALL_ROUTINGS,
   LOADING_ROUTINGS,
   ERROR_EVENT
} from '../../actions/router.action';

const initialState = {
   routings: [],
   loading: false,
   error: null
};

export default function (state = initialState, action: { type: string, payload: any }) {
   switch (action.type) {
      case LOADING_ROUTINGS:
         return {
            ...state,
            loading: true
         };
      case GET_ALL_ROUTINGS:
         return {
            ...state,
            routings: action.payload,
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