

import { IDocumentationArea } from '../reducers/documentation/section.reducer';
import { createSelector } from 'reselect';

export const getSandbox = createSelector((state: IDocumentationArea): any => (state), (state: IDocumentationArea) => {
	return {
		fixed: state.sandbox.fixed,
		offsetTop: state.sandbox.offsetTop,
		offsetBottom: state.sandbox.offsetBottom
	};
});