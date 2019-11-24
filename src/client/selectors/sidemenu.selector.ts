

import { IDocumentationArea } from '../reducers/documentation/section.reducer';
import { createSelector } from 'reselect';

export const getSidemenu = createSelector((state: IDocumentationArea): any => (state), (state: IDocumentationArea) => {
	return {
		fixed: state.sidemenu.fixed,
		hovered: state.sidemenu.hovered,
		expanded: state.sidemenu.expanded,
		topOffset: state.sidemenu.topOffset
	};
});