
export const NAV_MENU = 'NAVIGATION_MENU';
export const NAV_MENU_FIXED = NAV_MENU + '_FIXED';
export const NAV_MENU_HOVERED = NAV_MENU + '_HOVERED';

export const setNavHovered = (hovered: boolean) => (dispatch: any): void => {
	dispatch({
		from: NAV_MENU,
		type: NAV_MENU_HOVERED,
		payload: hovered
	}); 
};

export const setNavFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		from: NAV_MENU,
		type: NAV_MENU_FIXED,
		payload: fixed
	}); 
};