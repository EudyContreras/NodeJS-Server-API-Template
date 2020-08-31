import IAction from '../action';

export const SIDE_MENU = 'SIDE_MENU';

export const SIDE_MENU_FIXED = 'SIDE_MENU_FIXED';
export const SIDE_MENU_TOGGLE = 'SIDE_MENU_TOGGLE';
export const SIDE_MENU_HOVERED = 'SIDE_MENU_HOVERED';

export const toggleExpand = () => (dispatch: (action?: IAction) => any): void => {
	dispatch(toggleAction);
};

export const setHovered = (hovered: boolean) => (dispatch: (action?: IAction) => any): void => {
	dispatch({ ...hoverAction, payload: hovered });
};

export const setFixed = (fixed: boolean) => (dispatch: (action?: IAction) => any): void => {
	dispatch({ ...fixedAction, payload: fixed });
};

export const toggleAction: IAction = {
	from: SIDE_MENU,
	type: SIDE_MENU_TOGGLE
};

export const hoverAction: IAction = {
	from: SIDE_MENU,
	type: SIDE_MENU_HOVERED
};

export const fixedAction: IAction = {
	from: SIDE_MENU,
	type: SIDE_MENU_FIXED
};
