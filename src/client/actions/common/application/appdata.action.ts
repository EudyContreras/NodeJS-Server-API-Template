import IAction from '../../action';

export const APPLICATION = 'APPLICATION';
export const APPLICATION_INSTALLED = 'APPLICATION_INSTALLED';

export interface DispatchProps {
	setInstalled: (installed: boolean) => void;
}

export const setInstalled = (installed: boolean) => (dispatch: (action?: IAction) => any): void => {
	dispatch({ ...installationAction, payload: installed });
};

export const installationAction = {
	from: APPLICATION,
	type: APPLICATION_INSTALLED
};

export const Dispatchers = {
	setInstalled
};
