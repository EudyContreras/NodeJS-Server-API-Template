import React, { PureComponent } from 'react';

export default class SidebarSubItem extends PureComponent {

	render() {
		const hash = this.props.hash;
		const label = this.props.label;

		return (
			<li className='sub-menu-item'>
				<a href={hash}>{label}</a>
				<i className='material-icons'>chevron_right</i>
			</li>
		)
	}
}