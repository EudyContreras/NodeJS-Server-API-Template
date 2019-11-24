
const DOCUMENTATION_SECTION = 'DOCUMENTATION_SECTION';

export const DOCUMENTATION_SECTION_ALL_FIXED = DOCUMENTATION_SECTION + '_ALL_FIXED';
export const DOCUMENTATION_SECTION_ALL_OFFSETS = DOCUMENTATION_SECTION + '_ALL_OFFSETS';

export const DOCUMENTATION_SECTION_SIDEBAR_FIXED = DOCUMENTATION_SECTION + '_SIDEBAR_FIXED';
export const DOCUMENTATION_SECTION_SIDEBAR_OFFSETS = DOCUMENTATION_SECTION + '_SIDEBAR_OFFSETS';

export const DOCUMENTATION_SECTION_SANDBOX_FIXED = DOCUMENTATION_SECTION + '_SANDBOX_FIXED';
export const DOCUMENTATION_SECTION_SANDBOX_OFFSETS = DOCUMENTATION_SECTION + '_SANDBOX_OFFSETS';


export const setAllFixed = (sidebarFixed: boolean, sandboxFixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_ALL_FIXED,
		payload: { sidebarFixed, sandboxFixed }
	}); 
};

export const setAllOffsets = (sidebarOffsetTop?: number, sidebarOffsetBottom?: number, sandboxOffsetTop?: number, sandboxOffsetBottom?: number) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_ALL_OFFSETS,
		payload: { sidebarOffsetTop, sidebarOffsetBottom, sandboxOffsetTop, sandboxOffsetBottom }
	}); 
};

export const setSidebarFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SIDEBAR_FIXED,
		payload: fixed
	}); 
};

export const setSidebarOffsets = (offsetTop?: number, offsetBottom?: number) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SIDEBAR_OFFSETS,
		payload: { offsetTop, offsetBottom }
	}); 
};

export const setSandboxFixed = (fixed: boolean) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SANDBOX_FIXED,
		payload: fixed
	}); 
};

export const setSandboxOffsets = (offsetTop?: number, offsetBottom?: number) => (dispatch: any): void => {
	dispatch({
		type: DOCUMENTATION_SECTION_SANDBOX_OFFSETS,
		payload: { offsetTop, offsetBottom }
	}); 
};