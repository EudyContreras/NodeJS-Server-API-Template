

import { IPresentation } from '../reducers/index';
import { createSelector } from 'reselect';

export const getSidemenu = createSelector((state: IPresentation): any => (state), (state: IPresentation) => ({
	fixed: state.documentation.sidebar.fixed,
	hovered: state.documentation.sidebar.hovered,
	expanded: state.documentation.sidebar.expanded,
	offsetTop: state.navigation.offsetTop
}));