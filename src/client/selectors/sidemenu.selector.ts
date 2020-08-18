import { IPresentation } from '../reducers/index';
import { createSelector } from 'reselect';

export const getSidemenu = createSelector(
	(state: IPresentation): IPresentation => state,
	(state: IPresentation) => ({
		isFixed: state.documentation.sidebar.fixed,
		isHovered: state.documentation.sidebar.hovered,
		isExpanded: state.documentation.sidebar.expanded,
		offsetTop: state.navigation.offsetTop
	})
);
