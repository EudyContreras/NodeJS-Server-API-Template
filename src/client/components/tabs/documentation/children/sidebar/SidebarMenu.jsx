import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MenuItem from './SidebarMenuItem';
import SideMenuToggle from './SidebarToggle';
import SideMenuSearch from './SidebarSearch';
import Wrapper from '../../../../common/Wrapper';

const version = '1.3.5';
const links = ['Quickstart', 'Basics'];
const headers = ['Introduction', 'Endpoints']
const routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation'];

const classes = (...names) => {
   return names.join(' ');
}

class SidebarMenu extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			expanded: true
		}
	}

	/**
	 * @param {HTMLElement} element
	 */
	closeSidebar = (style) => {
		ReactDOM.findDOMNode(this).classList.add(style.closed);
   }
	
	/**
	 * @param {HTMLElement} element
	 */
   openSidebar = (style) => {
		ReactDOM.findDOMNode(this).classList.remove(style.closed);
	}
	
	/**
	 * @param {React.MouseEvent<HTMLElement, MouseEvent>} event
	 */
	handleToggle = (event) => {
		const style = this.props.styling;
		const expanded = this.state.expanded;

		if (expanded) {
			this.closeSidebar(style)
		} else {
			this.openSidebar(style)
		}
		this.setState(state => ({
			expanded: !state.expanded
		}));
	}

	componentDidMount() {}

	render() {
		const style = this.props.styling;

		return (
			<aside className={classes(style.sideMenu, style.natural)}>
				< TopSection styling={style} expanded={this.state.expanded} onSidebarToggle={this.handleToggle}/>
				< SideMenuSearch styling={style}/>
				< MiddleSection styling={style} header={headers[0]}/>
				< MainSection styling={style} header={headers[1]}/>
			</aside>
		)
	}
}

class VersionInfo extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h2>Api Name</h2>
				<h5>version: {version}</h5>
			</div>
		)
	}
}

class TopSection extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		const style = this.props.styling;

		return (
			<div className={style.topSection}>
				<VersionInfo styling={style}/>
				<SideMenuToggle styling={style} expanded={this.props.expanded} onSidebarToggle={this.props.onSidebarToggle} />
			</div>
		)
	}
}

class MiddleSection extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		const style = this.props.styling;

		return (
			<Wrapper>
				<h2 className={style.menuHeader} >{this.props.header}</h2>
				<ul className={style.middleSection}>
					{links.map(x => <MenuItem styling={style} hash={'#' + x} label={x} />)}
				</ul>
			</Wrapper>
		)
	}
}

class MainSection extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		const style = this.props.styling;

		return (
			<Wrapper>
				<h2 className={style.menuHeader} >{this.props.header}</h2>
				<ul className={style.mainSection}>
					{routes.map(x => <MenuItem styling={style} hash={'#' + x} label={x} />)}
				</ul>
			</Wrapper>
		)
	}
}

SidebarMenu.propTypes = {
	expanded: PropTypes.bool.isRequired,
	toggleSidebar: PropTypes.func.isRequired
}

// const mapStateToProps = (state) => ({
// 	expanded: state.expanded,
// });

// export default connect(mapStateToProps, { toggleSidebar })(withStyles(style)(SidebarMenu));

export default SidebarMenu;