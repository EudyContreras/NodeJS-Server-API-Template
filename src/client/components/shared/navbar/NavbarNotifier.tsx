import React from 'react';
import Styles from '../../../styles/modules/notifier.module.scss';
import { MaterialIcons } from '../../../stores/icon.library';
import { hideNotifier, NotificationType } from '../../../actions/common/notifier.action';
import { IStateTree } from '../../../reducers/index';
import { INavNotifier } from '../../../reducers/common/notifier.reducer';
import { join } from '../../utililties/react.utils';
import { connect } from 'react-redux';

interface StateProps {
	notificationType: NotificationType;
	isActive: boolean;
	text: string;
	icon: string;
}

interface DispatchProps {
	hideNotifier: () => void;
}

type NotificationStyling = {
	icon: { style: string[]; icon: string };
	text: { style: string };
	container: { style: string[] };
	action: { 
		style: string;
		icon: string;
		handler: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
	};
};

type State = INavNotifier;
type Props = StateProps & DispatchProps & any;

class NavBarNotifier extends React.PureComponent<Props, State> {

	constructor(props: any) {
		super(props);
	}

	private dimissNotification = (): void => {
		this.props.hideNotifier();
	};

	private messageStyling = (active: boolean): NotificationStyling => ({
		icon: { style: [MaterialIcons.class, Styles.icon], icon: MaterialIcons.icons.INFORMATION },
		text: { style: Styles.text },
		container: { style: [Styles.snackbar, active ? Styles.show : Styles.hide] },
		action: { 
			style: Styles.action,
			icon: MaterialIcons.icons.CLOSE,
			handler: this.dimissNotification
		}
	});

	private warningStyling = (active: boolean): NotificationStyling => ({
		icon: { style: [MaterialIcons.class, Styles.icon], icon: MaterialIcons.icons.WARNING },
		text: { style: Styles.textWarning },
		container: { style: [Styles.snackbarWarning, active ? Styles.show : Styles.hide] },
		action: { 
			style: Styles.action,
			icon: MaterialIcons.icons.CLOSE,
			handler: this.dimissNotification
		}
	});

	private errorStyling = (active: boolean): NotificationStyling => ({
		icon: { style: [MaterialIcons.class, Styles.icon], icon: MaterialIcons.icons.ERROR },
		text: { style: Styles.textError },
		container: { style: [Styles.snackbarError, active ? Styles.show : Styles.hide] },
		action: { 
			style: Styles.action,
			icon: MaterialIcons.icons.CLOSE,
			handler: this.dimissNotification
		}
	});

	public render = (): JSX.Element => {
		const props = {
			text: this.props.text
		};
		
		let styling = this.messageStyling(this.props.isActive);
		
		switch(this.props.notificationType) {
			case NotificationType.WARNING:
				styling = this.warningStyling(this.props.isActive);
				break;
			case NotificationType.ERROR:
				styling = this.errorStyling(this.props.isActive);
				break;
		}
		return (
			<div className={join(...styling.container.style)} {...this.props}>
				<i className={join(...styling.icon.style)}>{styling.icon.icon}</i>
				<p className={styling.text.style}>{props.text}</p>
				<i className={join(...styling.action.style)} onClick={styling.action.handler}>{styling.action.icon}</i>
			</div>
		);
	};
}

const mapStateToProps = (state: IStateTree | any ): any => {
	return {
		...state.generalData.notifier.isActive
	};
};

export default connect<StateProps, DispatchProps, any>(mapStateToProps, { hideNotifier })(NavBarNotifier);