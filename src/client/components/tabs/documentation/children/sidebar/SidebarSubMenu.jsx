import React from 'react';
import config from '../../../../../config';
import SidebarSubItem from './SidebarSubItem';

class SidebarSubMenu extends React.PureComponent {

	render() {
		const links = [
			{
				label: 'Register dfsd sfsds sdssssuser',
				method: { label: 'PUT' }
			}
			, 
			{
				label: 'Get all users',
				method: { label: 'GET' }
			}
			,
			{
				label: 'Update user',
				method: { label: 'PAT' }
			}
			,
			{
				label: 'Delete user',
				method: { label: 'DEL' }
			}
		];

		return (
			<ul className='sub-menu'>
				{links.map(x => <SidebarSubItem hash={'#' + x} label={x.label} method={x.method.label} />)}
			</ul>
		)
	}
}

export default SidebarSubMenu;