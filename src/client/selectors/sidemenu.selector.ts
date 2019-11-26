

import { ISideMenu } from '../reducers/documentation/sidebar.reducer';
import { createSelector } from 'reselect';

export const getSidemenu = createSelector((state: ISideMenu): any => (state), (state: ISideMenu) => ({
	fixed: state.fixed,
	hovered: state.hovered,
	expanded: state.expanded
}));