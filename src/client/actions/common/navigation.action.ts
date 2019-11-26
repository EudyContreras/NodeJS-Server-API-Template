
export const NAV_MENU = 'NAVIGATION_MENU';
export const NAV_MENU_ANCHORED = 'NAV_MENU_ANCHORED';
export const NAV_MENU_HOVERED = 'NAV_MENU_HOVERED';

export const setNavHovered = (hovered: boolean) => (dispatch: any): void => {
	dispatch({ ...navHoverAction, payload: hovered }); 
};

export const setNavAnchored = (fixed: boolean) => (dispatch: any): void => {
	dispatch({ ...navAnchorAction, payload: fixed }); 
};

export const navHoverAction = {
	from: NAV_MENU,
	type: NAV_MENU_HOVERED
};

export const navAnchorAction = {
	from: NAV_MENU,
	type: NAV_MENU_ANCHORED,
};