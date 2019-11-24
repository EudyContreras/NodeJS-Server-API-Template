
export const SANDBOX_AREA = 'SANDBOX_AREA';

export const SANDBOX_AREA_FIXED = SANDBOX_AREA + '_FIXED';
export const SANDBOX_AREA_HOVERED = SANDBOX_AREA + '_HOVERED';
export const SANDBOX_AREA_OFFSETS = SANDBOX_AREA + '_OFFSETS';

export const setHovered = (hovered: boolean) => (dispatch: any): void => {
	dispatch({
		from: SANDBOX_AREA,
		type: SANDBOX_AREA_HOVERED,
		payload: hovered
	}); 
};

export const setOffsets = (offsetTop?: number, offsetBottom?: number) => (dispatch: any): void => {
	dispatch({
		from: SANDBOX_AREA,
		type: SANDBOX_AREA_OFFSETS,
		payload: { offsetTop, offsetBottom }
	}); 
};

export const setFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		from: SANDBOX_AREA,
		type: SANDBOX_AREA_FIXED,
		payload: fixed
	}); 
};