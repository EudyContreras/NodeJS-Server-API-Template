import React, { PureComponent } from 'react';
import MenuItem from './sidebar.menu.item';
import SideMenuSearch from './sidebar.menu.search';

export default class SideMenuPanel extends PureComponent {

	render() {

		const links = ['Quickstart', 'Basics'];
		const routes = ['Users', 'Privideles', 'Roles', 'Invitation'];
		const headers = ['Introduction', 'Endpoints']
		const version= '1.3.5';

		return (
			<aside className='side-menu natural'>
				<div className='top-section'>
					<h2>Api Name</h2>
					<h5>version: {version}</h5>
				</div>
				< SideMenuSearch />
				<h2 className='menu-header' >{headers[0]}</h2>
				<ul className='middle-section'>
					{links.map(x => <MenuItem hash={'#'+x} label={x} />)}
				</ul>
				<h2 className='menu-header' >{headers[1]}</h2>
				<ul className='main-section'>
					{routes.map(x => <MenuItem hash={'#'+x} label={x} />)}
				</ul>
			</aside>
		)
	}
}