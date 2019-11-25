
export const DOCUMENTATION_SECTION_ALL_FIXED = 'DOCUMENTATION_SECTION_ALL_FIXED';
export const DOCUMENTATION_SECTION_SIDEBAR_FIXED = 'DOCUMENTATION_SECTION_SIDEBAR_FIXED';
export const DOCUMENTATION_SECTION_SANDBOX_FIXED = 'DOCUMENTATION_SECTION_SANDBOX_OFFSETS';

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

export const setSandboxFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SANDBOX_FIXED,
		payload: fixed
	});
};
