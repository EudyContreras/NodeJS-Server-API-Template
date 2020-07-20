
export const SANDBOX_AREA = 'SANDBOX_AREA';

export const SANDBOX_AREA_HOVERED = 'SANDBOX_AREA_HOVERED';
export const SANDBOX_AREA_FIXED_TOP = 'SANDBOX_AREA_FIXED_TOP';
export const SANDBOX_AREA_FIXED_BOTTOM = 'SANDBOX_AREA_FIXED_BOTTOM';
export const SANDBOX_AREA_OFFSET_BOTTOM = 'SANDBOX_AREA_OFFSET_BOTTOM';

export const setHovered = (hovered: boolean) => (dispatch: Function): void => {
	dispatch({ ...hoverAction, payload: hovered });
};

export const setTopFixed = (fixed: boolean) => (dispatch: Function): void => {
	dispatch({ ...fixedTopAction, payload: fixed });
};

export const setBottomFixed = (fixed: boolean) => (dispatch: Function): void => {
	dispatch({ ...fixedBottomAction, payload: fixed });
};

export const setOffsetBottom = (offset: number) => (dispatch: Function): void => {
	dispatch({ ...offsetBottomAction, payload: offset });
};

export const hoverAction = {
	from: SANDBOX_AREA,
	type: SANDBOX_AREA_HOVERED
};

export const fixedTopAction = {
	from: SANDBOX_AREA,
	type: SANDBOX_AREA_FIXED_TOP
};

export const fixedBottomAction = {
	from: SANDBOX_AREA,
	type: SANDBOX_AREA_FIXED_BOTTOM
};

export const offsetBottomAction = {
	from: SANDBOX_AREA,
	type: SANDBOX_AREA_OFFSET_BOTTOM
};
