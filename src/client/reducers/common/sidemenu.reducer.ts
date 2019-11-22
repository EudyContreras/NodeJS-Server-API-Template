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
   payload: any | undefined
}

export default function (state = initialState, action: Action) {
   switch (action.type) {
      case SIDE_MENU_TOGGLE:
         return {
            ...state,
            expanded: !state.expanded
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