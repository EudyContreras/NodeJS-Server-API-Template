import React, { PureComponent } from 'react';
import MenuItem from './sidebar.menu.item';
import config from '../../config';
import SideMenuSearch from './sidebar.menu.search';

const classes = { }

export default class SideMenuPanel extends PureComponent {

	render() {

		const links = ['Quickstart', 'Basics'];
		const routes = ['Users', 'Privideles', 'Roles', 'Invitation'];
		const headers = ['Introduction', 'Endpoints']
		const version= '1.3.5';

		return (
			<aside class='side-menu natural'>
				<div class='top-section'>
					<h2>Api Name</h2>
					<h5>version: {version}</h5>
				</div>
				< SideMenuSearch />
				<h2 class='menu-header' >{headers[0]}</h2>
				<ul class='middle-section'>
					{links.map(x => <MenuItem hash={'#'+x} label={x} />)}
				</ul>
				<h2 class='menu-header' >{headers[1]}</h2>
				<ul class='main-section'>
					{routes.map(x => <MenuItem hash={'#'+x} label={x} />)}
				</ul>
			</aside>
		)
	}
}