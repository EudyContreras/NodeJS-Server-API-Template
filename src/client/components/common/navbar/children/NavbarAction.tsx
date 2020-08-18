import React from 'react';
import { MaterialIcons } from '../../../../stores/icon.library';
import rippleEffect from '../../../../appliers/ripple.applier';
import { connect } from 'react-redux';
import { join } from '../../../../appliers/style.applier';
import * as InstallHelper from '../../../../../workers/helpers/intallation.helper';
import { DispatchProps, Dispatchers } from '../../../../actions/common/application/appdata.action';

interface StateProps {
	installed: boolean;
}

type Props = StateProps & DispatchProps & any;

class Action extends React.PureComponent<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			iconLoaded: false
		};
	}

	public componentDidMount = (): void => {
		if (!InstallHelper.hasInstallInfo()) {
			this.props.setInstalled(true);
		} else {
			this.props.setInstalled(InstallHelper.isInstalled());
		}
		InstallHelper.register((state: boolean) => {
			this.props.setInstalled(state);
		});
	};

	private initInstallation = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const style = this.props.styling;

		rippleEffect(event, style);

		InstallHelper.showPrompt();
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		const classes = [style.installButton];
		const iconsClasses = [MaterialIcons.class, style.installButtonIcon, style.pendingIcon];

		let icon = MaterialIcons.icons.ADD;

		if (this.props.installed) {
			icon = MaterialIcons.icons.MORE_VERTICAL;
		}

		return (
			<div onClick={this.initInstallation} className={join(...classes)} title="Install">
				<i id={MaterialIcons.id} className={join(...iconsClasses)}>
					{icon}
				</i>
			</div>
		);
	};
}

const mapStateToProps = (state: any): any => ({
	installed: state.generalData.appData.installed
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(Action);
