import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { classes, getElement } from '../../../../utililties/styling.utils';

interface State {
	sidebarHovered: boolean,
	expanded: boolean
};

class SidebarToggle extends React.PureComponent<any, State> {

	constructor(props: any) {
		super(props);
		this.state = {
			sidebarHovered: props.hovered,
			expanded: props.expanded
		};
	}

	toggleSidebar = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const style = this.props.styling;

		rippleEffect(event, style);

		if (this.state.expanded) {
			getElement(this).classList.add(style.expandActive)
		} else {
			getElement(this).classList.remove(style.expandActive)
		}
		this.setState((state: State) => ({
			expanded: !state.expanded
		}));

		this.props.onSidebarToggle(this.state.expanded);
	};

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.hovered !== this.state.sidebarHovered) {
			this.setState(() => ({
				sidebarHovered: nextProps.hovered
			}));
		}
	}

	render() {
		const style = this.props.styling;
		const elementTitle = this.state.expanded ? 'collapse' : 'expand';

		const props = {
			id: 'sidebar-toggle',
			title: elementTitle,
			value: this.state.expanded,
			onClick: this.toggleSidebar
		}

		const iconText = this.state.expanded ? MaterialIcons.icons.CHEV_RIGHT : MaterialIcons.icons.MENU;

		const classNamesToggle = [style.expand];
		const classnamesIcon = [MaterialIcons.className, style.expandIcon];

		if (!this.state.sidebarHovered && this.state.expanded) {
			classNamesToggle.push(style.expandHidden);
		}

		if (!this.state.expanded) {
			classnamesIcon.push(style.expandIconActive);
		}

		return (
			<div className={classes(...classNamesToggle)} {...props}>
				<i className={classes(...classnamesIcon)}>{iconText}</i>
			</div>
		)
	}
}

export default SidebarToggle;