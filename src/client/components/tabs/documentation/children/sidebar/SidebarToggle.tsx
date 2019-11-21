import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { join } from '../../../../utililties/styling.utils';

interface State {
	expanded: boolean;
}

class SidebarToggle extends React.PureComponent<any, State> {

	constructor(props: any) {
		super(props);
		this.state = {
			expanded: props.expanded
		};
	}

	private toggleSidebar = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const style = this.props.styling;

		rippleEffect(event, style);

		this.setState((state: State) => ({
			expanded: !state.expanded
		}));

		this.props.onSidebarToggle(this.state.expanded);
	}

	public render() {
		const style = this.props.styling;
		const elementTitle = this.state.expanded ? 'collapse' : 'expand';

		const props = {
			title: elementTitle,
			value: this.state.expanded,
			onClick: this.toggleSidebar
		};

		const iconText = this.state.expanded ? MaterialIcons.icons.CHEV_RIGHT : MaterialIcons.icons.MENU;

		const toggleClasses = [style.expand];
		const toggleIconClasses = [MaterialIcons.CLASS, style.expandIcon];

		if (!this.props.hovered && this.state.expanded) {
			toggleClasses.push(style.expandHidden);
		}

		if (this.state.expanded) {
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

export default SidebarToggle;