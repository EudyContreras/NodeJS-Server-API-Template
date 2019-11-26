
export const NAV_BAR_MENU = 'NAV_BAR_MENU';
export const NAV_BAR_MENU_ACTIVE_TAB = 'NAV_BAR_MENU_ACTIVE_TAB';
export const NAV_BAR_MENU_ANCHORED = 'NAV_BAR_MENU_ANCHORED';
export const NAV_BAR_MENU_MOUSE_INSIDE = 'NAV_BAR_MENU_MOUSE_INSIDE';
export const NAV_BAR_MENU_MOUSE_OUTSIDE = 'NAV_BAR_MENU_MOUSE_OUTSIDE';

export interface DispatchProps {
	setAnchored: (anchored: boolean) => void;
	setMouseInside: (inside: boolean) => void;
	setMouseOutside: (outside: boolean) => void;
	setActiveTab: (tab: string) => void;
}

export const setMouseInside = (inside: boolean) => (dispatch: any): void => {
	dispatch({ ...navInsideAction, payload: inside }); 
};

export const setMouseOutside = (outside: boolean) => (dispatch: any): void => {
	dispatch({ ...navOutsideAction, payload: outside }); 
};

export const setAnchored = (anchored: boolean) => (dispatch: any): void => {
	dispatch({ ...navAnchorAction, payload: anchored }); 
};

export const setActiveTab = (tab: any) => (dispatch: any): void => {
	dispatch({ ...activeTabAction, payload: tab }); 
};

export const activeTabAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_ACTIVE_TAB
};

export const navInsideAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_MOUSE_INSIDE
};

export const navOutsideAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_MOUSE_OUTSIDE
};

export const navAnchorAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_ANCHORED,
};