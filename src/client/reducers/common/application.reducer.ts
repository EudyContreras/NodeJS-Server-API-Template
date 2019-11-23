// import { NAV_MENU } from '../../actions/common/navigation.action';
// import { SIDE_MENU } from '../../actions/common/sidemenu.action';

// import * as NavbarReducer from './navigation.reducer';
// import * as SideMenuReducer from './sidemenu.reducer';

// import IAction from '../../actions/action';

// export interface IApplicationState {
// 	navbar: NavbarReducer.INavigationBar;
// 	sidemenu: SideMenuReducer.ISideMenu;
// }

// export const InitialState: IApplicationState = {
// 	navbar: NavbarReducer.InitialState,
// 	sidemenu: SideMenuReducer.InitialState
// };

// export default function (state = InitialState, action: IAction): IApplicationState {
// 	switch (action.from) {
// 		case NAV_MENU:
// 			return {
// 				...state,
// 				navbar:  NavbarReducer.default(state.navbar, action)
// 			};
// 		case SIDE_MENU:
// 			return {
// 				...state,
// 				sidemenu: SideMenuReducer.default(state.sidemenu, action)
// 			};
// 		default:
// 			return state;
// 	}
// }