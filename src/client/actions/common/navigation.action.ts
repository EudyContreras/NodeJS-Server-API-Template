import IAction from '../action';
import { LinkInfo } from '../../components/Routes';

export const NAV_BAR_MENU = 'NAV_BAR_MENU';
export const NAV_BAR_MENU_ANCHORED = 'NAV_BAR_MENU_ANCHORED';
export const NAV_BAR_MENU_OFFSET_TOP = 'NAV_BAR_MENU_OFFSET_TOP';
export const NAV_BAR_MENU_ACTIVE_TAB = 'NAV_BAR_MENU_ACTIVE_TAB';
export const NAV_BAR_MENU_MOUSE_INSIDE = 'NAV_BAR_MENU_MOUSE_INSIDE';

export interface DispatchProps {
	setAnchored: (anchored: boolean) => void;
	setMouseInside: (inside: boolean) => void;
	setOffsetTop: (offset: number, height: number) => void;
	setActiveTab: (tab: string) => void;
}

export const setOffsetTop = (offset: number, height: number) => (dispatch: (action?: IAction) => any): void => {
	dispatch({
		...offsetTopAction,
		payload: {
			offset: offset,
			height: height
		}
	});
};

export const setMouseInside = (inside: boolean) => (dispatch: (action?: IAction) => any): void => {
	dispatch({ ...navInsideAction, payload: inside });
};

export const setAnchored = (anchored: boolean) => (dispatch: (action?: IAction) => any): void => {
	dispatch({ ...navAnchorAction, payload: anchored });
};

export const setActiveTab = (tab: LinkInfo | null) => (dispatch: (action?: any) => IAction): void => {
	dispatch({ ...activeTabAction, payload: tab });
};

export const activeTabAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_ACTIVE_TAB
};

export const navInsideAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_MOUSE_INSIDE
};

export const navAnchorAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_ANCHORED
};

export const offsetTopAction = {
	from: NAV_BAR_MENU,
	type: NAV_BAR_MENU_OFFSET_TOP
};

export const Dispatchers = {
	setAnchored,
	setMouseInside,
	setActiveTab,
	setOffsetTop
};
