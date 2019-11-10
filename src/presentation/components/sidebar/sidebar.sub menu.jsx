import React, { PureComponent } from 'react';

import SidebarSubItem from './sidebar.sub.item';

export default class SidebarSubMenu extends PureComponent {

	render() {

		const links = ['Register user', 'Get all users', 'Update user', 'Delete user'];

		return (
			<ul className='sub-menu'>
				{links.map(x => <SidebarSubItem hash={'#' + x} label={x} />)}
			</ul>
		)
	}
}