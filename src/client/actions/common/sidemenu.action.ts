
export const SIDE_MENU = 'SIDE_MENU';
export const SIDE_MENU_TOGGLE = SIDE_MENU + '_TOGGLE';
export const SIDE_MENU_FIXED = SIDE_MENU + '_FIXED';
export const SIDE_MENU_HOVERED = SIDE_MENU + '_HOVERED';

export const toggleExpand = () => (dispatch: any): void => {
	dispatch({
		type: SIDE_MENU_TOGGLE
	}); 
};

export const setHovered = (hovered: boolean) => (dispatch: any): void => {
	dispatch({
		type: SIDE_MENU_HOVERED,
		payload: hovered
	}); 
};

export const setFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: SIDE_MENU_FIXED,
		payload: fixed
	}); 
};