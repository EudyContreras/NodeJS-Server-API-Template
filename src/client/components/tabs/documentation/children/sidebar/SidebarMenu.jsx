import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './SidebarMenuItem';
import SideMenuToggle from './SidebarToggle';
import SideMenuSearch from './SidebarSearch';
import withStyles from 'isomorphic-style-loader/withStyles';
import Wrapper from '../../../../common/Wrapper';
import style from './styles/SidebarMenu.style.scss';

const links = ['Quickstart', 'Basics'];
const routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation'];

class SidebarMenu extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			expanded: true
		}
	}

	handleToggle = () => {
		console.log('Parent handle toggle');
	}

	render() {
		const headers = ['Introduction', 'Endpoints']

		return (
			<aside className='side-menu natural'>
				< TopSection expanded={this.state.expanded} onSidebarToggle={this.handleToggle}/>
				< SideMenuSearch />
				< MiddleSection header={headers[0]}/>
				< MainSection header={headers[1]}/>
			</aside>
		)
	}
}

class VersionInfo extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		const version = '1.3.5';

		return (
			<div className='version-wrapper'>
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
		return (
			<div className='top-section'>
				<VersionInfo />
				<SideMenuToggle expanded={this.props.expanded} onSidebarToggle={this.props.onSidebarToggle} />
			</div>
		)
	}
}

class MiddleSection extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Wrapper>
				<h2 className='menu-header' >{this.props.header}</h2>
				<ul className='middle-section'>
					{links.map(x => <MenuItem hash={'#' + x} label={x} />)}
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
		return (
			<Wrapper>
				<h2 className='menu-header' >{this.props.header}</h2>
				<ul className='main-section'>
					{routes.map(x => <MenuItem hash={'#' + x} label={x} />)}
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

export default withStyles(style)(SidebarMenu);