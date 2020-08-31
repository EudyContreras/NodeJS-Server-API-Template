/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import Styles from '../../../styles/modules/notifier.module.scss';
import { MaterialIcons } from '../../../stores/icon.library';
import { NotificationType, DispatchProps, Dispatchers } from '../../../actions/common/notifier.action';
import { join } from '../../utililties/react.utils';
import { connect } from 'react-redux';

interface StateProps {
	notificationType: NotificationType;
	isActive: boolean;
	text: string;
	icon: string;
}

type NotificationStyling = {
	icon: { style: string[]; icon: string };
	text: { style: string };
	container: { style: string[] };
	action: {
		style: string;
		icon: string;
	};
};

type Props = StateProps & DispatchProps & any;

class NavBarNotifier extends React.PureComponent<Props, any> {
	private dimissNotification = (): void => {
		this.props.hideNotifier();
	};

	private messageStyling = (active: boolean): NotificationStyling => ({
		icon: { style: [MaterialIcons.class, Styles.icon], icon: MaterialIcons.icons.INFORMATION },
		text: { style: Styles.text },
		container: { style: [Styles.snackbar, active ? Styles.show : Styles.hide] },
		action: {
			style: Styles.action,
			icon: MaterialIcons.icons.CLOSE
		}
	});

	private warningStyling = (active: boolean): NotificationStyling => ({
		icon: { style: [MaterialIcons.class, Styles.icon], icon: MaterialIcons.icons.WARNING },
		text: { style: Styles.textWarning },
		container: { style: [Styles.snackbarWarning, active ? Styles.show : Styles.hide] },
		action: {
			style: Styles.action,
			icon: MaterialIcons.icons.CLOSE
		}
	});

	private errorStyling = (active: boolean): NotificationStyling => ({
		icon: { style: [MaterialIcons.class, Styles.icon], icon: MaterialIcons.icons.ERROR },
		text: { style: Styles.textError },
		container: { style: [Styles.snackbarError, active ? Styles.show : Styles.hide] },
		action: {
			style: Styles.action,
			icon: MaterialIcons.icons.CLOSE
		}
	});

	public render = (): JSX.Element => {
		const props = {
			text: this.props.text,
			autoDismiss: this.props.autoDismiss,
			dimissDelay: this.props.dimissDelay
		};

		let styling = this.messageStyling(this.props.isActive);

		switch (this.props.notificationType) {
			case NotificationType.WARNING:
				styling = this.warningStyling(this.props.isActive);
				break;
			case NotificationType.ERROR:
				styling = this.errorStyling(this.props.isActive);
				break;
		}

		if (props.autoDismiss) {
			setTimeout(() => {
				this.props.hideNotifier();
			}, props.dimissDelay);
		}

		return (
			<div className={join(...styling.container.style)}>
				<i className={join(...styling.icon.style)}>{styling.icon.icon}</i>
				<p className={styling.text.style}>{props.text}</p>
				<i className={styling.action.style} onClick={() => this.dimissNotification()}>
					{styling.action.icon}
				</i>
			</div>
		);
	};
}

const mapStateToProps = (state: any): any => ({
	...state.generalData.notifier
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(NavBarNotifier);
