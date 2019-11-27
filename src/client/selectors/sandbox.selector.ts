

import { IPresentation } from '../reducers/index';
import { createSelector } from 'reselect';

export const getSandbox = createSelector((state: IPresentation): any => (state), (state: IPresentation) => ({
	fixedTop: state.documentation.sandbox.fixedTop,
	fixedBottom: state.documentation.sandbox.fixedBottom,
	offsetBottom: state.documentation.sandbox .offsetBottom,
	offsetTop: state.navigation.offsetTop
}));