

import { ISandboxArea } from '../reducers/documentation/sandbox.reducer';
import { createSelector } from 'reselect';

export const getSandbox = createSelector((state: ISandboxArea): any => (state), (state: ISandboxArea) => ({
	fixedTop: state.fixedTop,
	fixedBottom: state.fixedBottom,
	offsetBottom: state.offsetBottom
}));