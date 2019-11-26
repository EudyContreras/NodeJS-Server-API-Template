

import { INavigationBar } from '../reducers/common/navigation.reducer';
import { createSelector } from 'reselect';

export const getNavigationBar = createSelector((state: INavigationBar): any => (state), (state: INavigationBar) => ({
	anchored: state.anchored,
	mouseInside: state.mouseInside,
	mouseOutside: state.mouseOutside,
	activeTab: state.acitiveTab
}));