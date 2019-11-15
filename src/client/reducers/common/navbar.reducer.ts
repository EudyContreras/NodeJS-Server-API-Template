import {
   LOADING_NAVBAR,
   GET_NAVBAR_ITEMS
} from '../../actions/navbar.action';

const initialState = {
   items: [],
   loading: false
}

export default function (state = initialState, action: {type: string, payload: any}) {
   switch (action.type) {
      case LOADING_NAVBAR:
         return {
            ...state,
            loading: true
         }
      case GET_NAVBAR_ITEMS:
         return {
            ...state
         };
      default:
         return state;
   }
}