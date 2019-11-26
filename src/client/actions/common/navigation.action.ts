
export const NAV_MENU = 'NAVIGATION_MENU';
export const NAV_MENU_ANCHORED = 'NAV_MENU_ANCHORED';
export const NAV_MENU_HOVERED = 'NAV_MENU_HOVERED';

export const setNavHovered = (hovered: boolean) => (dispatch: any): void => {
	dispatch({
		from: NAV_MENU,
		type: NAV_MENU_HOVERED,
		payload: hovered
	}); 
};

export const setNavAnchored = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		from: NAV_MENU,
		type: NAV_MENU_ANCHORED,
		payload: fixed
	}); 
};