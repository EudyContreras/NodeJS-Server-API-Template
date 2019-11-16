import React from 'react';
import PropTypes from 'prop-types';
import rippleEffect from '../../../../../appliers/ripple.applier';

const classes = (...names) => {
   return names.join(' ');
}

class SidebarToggle extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded,
		};
	}
	/**
	 * @param {React.MouseEvent<HTMLElement, MouseEvent>} event
	 */
	toggleSidebar = (event) => {
		rippleEffect(event, this.props.styling);
		this.setState(state => ({
			expanded: !state.expanded
		}));
		this.props.onSidebarToggle(this.state.expanded);
	};

	render() {
		const style = this.props.styling;
		const elementId = 'sidebar-toggle';
		const elementTitle = this.state.expanded ? 'collapse' : 'expand';
		return (
			<div id={elementId} title={elementTitle} value={this.state.expanded} className={style.expand} onClick={this.toggleSidebar}>
				<i className={classes('material-icons',style.expandIcon)}>chevron_right</i>
			</div>
		)
	}
}

SidebarToggle.propTypes = {
	expanded: PropTypes.bool.isRequired,
}

export default SidebarToggle;