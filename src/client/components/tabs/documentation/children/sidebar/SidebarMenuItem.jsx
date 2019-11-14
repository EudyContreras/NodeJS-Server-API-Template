import React from 'react';
import config from '../../../../../config';
import SidebarSubMenu from './SidebarSubMenu';

const classes = {}

class SidebarMenuItem extends React.PureComponent {

	render() {
		const hash = this.props.hash;
		const label = this.props.label;
		return (
			<div>
				<li className='menu-item'>
					<a href={hash}>{label}</a>
					<i className='material-icons'>chevron_right</i>
				</li>
				<SidebarSubMenu/>
			</div>

		)
	}
}

export default SidebarMenuItem