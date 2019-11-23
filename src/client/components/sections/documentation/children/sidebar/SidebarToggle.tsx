import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { toggleExpand } from '../../../../../actions/sidemenu.action';
import { IState } from '../../../../../reducers/common/sidemenu.reducer';
import { join } from '../../../../utililties/styling.utils';
import { connect } from 'react-redux';

interface StateProps {
	expanded: boolean;
	toggleHidden: boolean;
}

interface DispatchProps {
	toggleExpand: () => void;
}

type State = IState;
type Props = StateProps & DispatchProps & any;

class SidebarToggle extends React.PureComponent<Props, State> {

	constructor(props: any) {
		super(props);
	}

	private toggleSidebar = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const style = this.props.styling;

		rippleEffect(event, style);

		this.props.toggleExpand();
	}

	public render(): JSX.Element {
		const style = this.props.styling;
		const elementTitle = this.props.expanded ? 'collapse' : 'expand';
		const iconText = this.props.expanded ? MaterialIcons.icons.CHEV_RIGHT : MaterialIcons.icons.MENU;

		const props = {
			title: elementTitle,
			value: this.props.expanded,
			onClick: this.toggleSidebar
		};

		const toggleClasses = [style.expand];
		const toggleIconClasses = [MaterialIcons.CLASS, style.expandIcon];

		if (this.props.toggleHidden) {
			toggleClasses.push(style.expandHidden);
		}

		if (this.props.expanded) {
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
		...state.sidemenu
	};
};

export default connect<StateProps, DispatchProps, any>(mapStateToProps, { toggleExpand })(SidebarToggle);