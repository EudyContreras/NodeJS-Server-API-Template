import { IPresentation } from '../reducers/index';
import { createSelector } from 'reselect';

export const getSandbox = createSelector(
	(state: IPresentation): IPresentation => state,
	(state: IPresentation) => ({
		fixedTop: state.navigation.anchored,
		offsetTop: state.navigation.offsetTop,
		fixedBottom: state.documentation.sandbox.fixedBottom,
		offsetBottom: state.documentation.sandbox.offsetBottom
	})
);
