

import { ISandboxArea } from '../reducers/documentation/sandbox.reducer';
import { createSelector } from 'reselect';

export const getSandbox = createSelector((state: ISandboxArea): any => (state), (state: ISandboxArea ) => {
	return {
		fixedTop: state.fixedTop,
		fixedBottom: state.fixedBottom
	};
});