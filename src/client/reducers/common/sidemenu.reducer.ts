import {
   SIDE_MENU_TOGGLE,
   SIDE_MENU_FIXED
} from '../../actions/sidemenu.action';

const initialState = {
   expanded: true,
   fixed: false
};

interface Action {
   type: string,
   payload: any
}

export default function (state = initialState, action: Action) {
   switch (action.type) {
      case SIDE_MENU_TOGGLE:
         return {
            ...state,
            expanded: false
         };
      case SIDE_MENU_FIXED:
         return {
            ...state,
            fixed: action.payload
         };
      default:
         return state;
   }
}