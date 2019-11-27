

import { IPresentation } from '../reducers/index';
import { createSelector } from 'reselect';

export const getNavigationBar = createSelector((state: IPresentation): any => (state), (state: IPresentation) => ({
	anchored: state.navigation.anchored,
	mouseInside: state.navigation.mouseInside,
	mouseOutside: state.navigation.mouseOutside,
	offsetTop: state.navigation.offsetTop,
	activeTab: state.navigation.acitiveTab
}));