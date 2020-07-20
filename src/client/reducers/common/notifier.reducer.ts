import {
	NotificationType,
	NAV_NOTIFIER,
	NAV_NOTIFIER_SHOW,
	NAV_NOTIFIER_HIDE
} from '../../actions/common/notifier.action';

import IAction from '../../actions/action';

export const SOURCE = NAV_NOTIFIER;

export interface INavNotifier{
	notificationType: NotificationType;
	autoDismiss: boolean;
	dismissDelay?: number;
	isActive: boolean;
	text: string;
	icon: string;
}

export const InitialState: INavNotifier = {
	notificationType: NotificationType.MESSAGE,
	autoDismiss: true,
	dismissDelay: 300,
	isActive: false,
	text: '',
	icon: ''
};

export default function (state = InitialState, action: IAction): INavNotifier {
	switch (action.type) {
		case NAV_NOTIFIER_SHOW: {
			return {
				...state,
				isActive: action.payload.isActive,
				text: action.payload.text,
				icon: action.payload.icon
			};
		}
		case NAV_NOTIFIER_HIDE: {
			return {
				...state,
				isActive: false,
				text: '',
				icon: ''
			};
		}
		default:
			return state;
	}
}
