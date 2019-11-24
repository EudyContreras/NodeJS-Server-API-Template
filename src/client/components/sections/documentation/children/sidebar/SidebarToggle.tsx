import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { toggleExpand } from '../../../../../actions/documentation/children/sidemenu.action';
import { IToggle } from '../../../../../reducers/documentation/children/sidemenu.reducer';
import { join } from '../../../../utililties/styling.utils';
import { connect } from 'react-redux';

interface StateProps {
	hidden: boolean;
	locked: boolean;
}

interface DispatchProps {
	toggleExpand: () => void;
}

type State = IToggle;
type Props = StateProps & DispatchProps & any;

class SidebarToggle extends React.PureComponent<Props, State> {

	constructor(props: any) {
		super(props);
	}

	private toggleSidebar = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const style = this.props.styling;

		rippleEffect(event, style);

		this.props.toggleExpand();
	};

	public render(): JSX.Element {

		const style = this.props.styling;
		const elementTitle = this.props.locked ? 'collapse' : 'expand';
		const iconText = this.props.locked ? MaterialIcons.icons.CHEV_RIGHT : MaterialIcons.icons.MENU;

		const props = {
			title: elementTitle,
			value: this.props.locked,
			onClick: this.toggleSidebar
		};

		const toggleClasses = [style.expand];
		const toggleIconClasses = [MaterialIcons.CLASS, style.expandIcon];

		if (this.props.hidden) {
			toggleClasses.push(style.expandHidden);
		}

		if (this.props.locked) {
			toggleClasses.push(style.expandActive);
		} else {
			toggleIconClasses.push(style.expandIconActive);
		}

		return (
			<div className={join(...toggleClasses)} {...props}>
				<i className={join(...toggleIconClasses)}>{iconText}</i>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => {
	return {
		...state.documentation.sidemenu.toggle
	};
};

export default connect<StateProps, DispatchProps, any>(mapStateToProps, { toggleExpand })(SidebarToggle);