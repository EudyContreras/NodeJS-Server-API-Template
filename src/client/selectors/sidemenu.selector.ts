

import { ISideMenu } from '../reducers/common/sidemenu.reducer';
import { createSelector } from 'reselect';


export const getSidemenu = createSelector((state: ISideMenu): any => (state), (state: any) => {
	return {
		fixed: state.fixed,
		hovered: state.hovered,
		expanded: state.expanded,
		topOffset: state.topOffset
	};
});