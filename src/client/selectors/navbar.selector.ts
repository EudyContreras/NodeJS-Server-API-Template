

import { IPresentation } from '../reducers/index';
import { createSelector } from 'reselect';

export const getNavigationBar = createSelector((state: IPresentation): any => (state), (state: IPresentation) => ({
	anchored: state.navigation.anchored,
	mouseInside: state.navigation.mouseInside,
	activeTab: state.navigation.acitiveTab
}));