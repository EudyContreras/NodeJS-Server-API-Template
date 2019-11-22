
export const SIDE_MENU_TOGGLE = 'SIDE_MENU_TOGGLE';
export const SIDE_MENU_FIXED = 'SIDE_MENU_FIXED';

export const toggleExpand = () => (dispatch:any) => {
    dispatch({
        type: SIDE_MENU_TOGGLE
    }); 
};

export const fixed = (fixed: boolean) => {
    return {
        type: SIDE_MENU_FIXED,
        payload: fixed
    };
};
