
export const DOCUMENTATION_SECTION_ALL_FIXED = 'DOCUMENTATION_SECTION_ALL_FIXED';
export const DOCUMENTATION_SECTION_SIDEBAR_FIXED = 'DOCUMENTATION_SECTION_SIDEBAR_FIXED';
export const DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP = 'DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP';
export const DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM = 'DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM';
export const DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM = 'DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM';

export const setAllFixed = (sidebarFixed: boolean, sandboxFixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_ALL_FIXED,
		payload: { sidebarFixed, sandboxFixed }
	});
};

export const setSidebarFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SIDEBAR_FIXED,
		payload: fixed
	});
};

export const setSandboxFixedTop = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SANDBOX_FIXED_TOP,
		payload: fixed
	});
};

export const setSandboxFixedBottom = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SANDBOX_FIXED_BOTTOM,
		payload: fixed
	});
};

export const setSandboxOffsetBottom = (offset: number) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SANDBOX_OFFSET_BOTTOM,
		payload: offset
	});
};