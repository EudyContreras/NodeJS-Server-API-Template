import React from 'react';
import ReactDom from 'react-dom';
import rippleEffect from '../../../../../appliers/ripple.applier';

const classes = (...names: string[]) => {
	return names.join(' ');
}

const getElement = (component: React.PureComponent) => {
	return (ReactDom.findDOMNode(component) as Element);
}

class SidebarToggle extends React.PureComponent<any, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			expanded: props.expanded,
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
		this.setState((state: any) => ({
			expanded: !state.expanded
		}));

		this.props.onSidebarToggle(this.state.expanded);
	};

	onMouseOver = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		console.log('mouse in')

	}

	onMouseOut = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		console.log('mouse out')
	}

	render() {
		const style = this.props.styling;
		const elementTitle = this.state.expanded ? 'collapse' : 'expand';

		const props = {
			id: 'sidebar-toggle',
			title: elementTitle,
			value: this.state.expanded,
			className: style.expand,
			onMouseEnter: this.onMouseOver,
			onMouseLeave: this.onMouseOut,
			onClick: this.toggleSidebar
		}

		const text = this.state.expanded ? 'chevron_right' : 'menu';

		return (
			<div {...props}>
				<i className={classes('material-icons', style.expandIcon)}>{text}</i>
			</div>
		)
	}
}

export default SidebarToggle;