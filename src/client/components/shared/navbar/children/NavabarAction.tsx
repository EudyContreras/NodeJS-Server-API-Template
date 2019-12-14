import React from 'react';
import rippleEffect from '../../../../appliers/ripple.applier';
import FontFaceObserver from 'fontfaceobserver';
import { connect } from 'react-redux';
import { join } from '../../../../appliers/style.applier';
import { showPrompt, register, isInstalled } from '../../../../scriptsjs/helpers/intallation.helper';
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
		const font = new FontFaceObserver('Material Icons');

		font.load().then( () => {
			this.setState({
				iconLoaded: true
			});
		});
		this.props.setInstalled(isInstalled());
		register((state: boolean) => {
			this.props.setInstalled(state);
		});
	};

	private initInstallation = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const style = this.props.styling;

		rippleEffect(event, style);

		showPrompt();
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		const classes = [style.installButton];
		const iconsClasses = ['material-icons', style.installButtonIcon];

		if (!this.state.iconLoaded) {
			iconsClasses.push(style.loadable);
		} else {
			iconsClasses.push(style.loaded);
		}

		let icon = 'add';

		if (this.props.installed) {
			icon = 'more_vert';
		}

		return (
			<div onClick={this.initInstallation} className={join(...classes)} title='install'>
				<i className={join(...iconsClasses)}>{icon}</i>
			</div>
		);
	};
}

const mapStateToProps = (state: any): any => ({
	installed: state.generalData.appData.installed
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(Action);