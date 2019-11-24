export const SIDE_MENU = 'SIDE_MENU';

export const SIDE_MENU_TOGGLE = SIDE_MENU + '_TOGGLE';
export const SIDE_MENU_FIXED = SIDE_MENU + '_FIXED';
export const SIDE_MENU_HOVERED = SIDE_MENU + '_HOVERED';
export const SIDE_MENU_TOP_OFFSET = SIDE_MENU + '_TOP_OFFSET';

export const toggleExpand = () => (dispatch: any): void => {
	dispatch({
		from: SIDE_MENU,
		type: SIDE_MENU_TOGGLE
	}); 
};

export const setHovered = (hovered: boolean) => (dispatch: any): void => {
	dispatch({
		from: SIDE_MENU,
		type: SIDE_MENU_HOVERED,
		payload: hovered
	}); 
};

export const setTopOffset = (offset: number) => (dispatch: any): void => {
	dispatch({
		from: SIDE_MENU,
		type: SIDE_MENU_TOP_OFFSET,
		payload: offset
	}); 
};

export const setFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		from: SIDE_MENU,
		type: SIDE_MENU_FIXED,
		payload: fixed
	}); 
};