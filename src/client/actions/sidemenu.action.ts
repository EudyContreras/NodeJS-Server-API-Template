
export const SIDE_MENU_TOGGLE = 'SIDE_MENU_TOGGLE';
export const SIDE_MENU_FIXED = 'SIDE_MENU_FIXED';
export const SIDE_MENU_HOVERED = 'SIDE_MENU_HOVERED';
export const SIDE_MENU_TOGGLE_HIDDEN = 'SIDE_MENU_TOGGLE_HIDDEN';

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

export const setToggleVisible = (hidden: boolean) => (dispatch: any): void => {
	dispatch({
		type: SIDE_MENU_TOGGLE_HIDDEN,
		payload: hidden
	}); 
};