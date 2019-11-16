import React from 'react';
import PropTypes from 'prop-types';
import style from './styles/SidbarToggle.style.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import rippleEffect from '../../../../../appliers/ripple.applier';

class SidebarToggle extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded
		};
	}
	/**
	 * @param {React.MouseEvent<HTMLElement, MouseEvent>} event
	 */
	toggleSidebar = (event) => {
		rippleEffect(event, style);
		this.setState(state => ({
			expanded: !this.state.expanded
		}));
		this.props.onSidebarToggle(this.state.expanded);
	};

	render() {
		const elementId = 'sidebar-toggle';
		const elementTitle = this.state.expanded ? 'collapse' : 'expand';
		return (
			<div id={elementId} title={elementTitle} value={this.state.expanded} className={style.expand} onClick={this.toggleSidebar}>
				<i className={`material-icons ${style.expandIcon}`}>chevron_right</i>
			</div>
		)
	}
}

SidebarToggle.propTypes = {
	expanded: PropTypes.bool.isRequired,
}

export default withStyles(style)(SidebarToggle);