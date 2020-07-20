export const NAV_NOTIFIER = 'NAV_NOTIFIER';

export const NAV_NOTIFIER_HIDE = 'NAV_NOTIFIER_HIDE';
export const NAV_NOTIFIER_SHOW = 'NAV_NOTIFIER_SHOW';

export enum NotificationType {
	ERROR,
	WARNING,
	MESSAGE
}

export interface DispatchProps {
	showNotifier: (icon: string, text: string, autoDimiss: boolean, dismissDelay: number, type: NotificationType) => void;
	hideNotifier: () => void;
}

export const showNotifier = (icon: string, text: string, autoDimiss = true, dismissDelay = 3000, type = NotificationType.MESSAGE) => (dispatch: Function): void => {
	dispatch({
		...notifierShowAction,
		payload: {
			icon: icon,
			text: text,
			autoDimiss: autoDimiss,
			dismissDelay: dismissDelay,
			notificationType: type
		}
	});
};

export const hideNotifier = () => (dispatch: Function): void => {
	dispatch(notifierHideAction);
};

export const notifierShowAction = {
	from: NAV_NOTIFIER,
	type: NAV_NOTIFIER_SHOW
};

export const notifierHideAction = {
	from: NAV_NOTIFIER,
	type: NAV_NOTIFIER_HIDE
};

export const Dispatchers = {
	showNotifier,
	hideNotifier
};
