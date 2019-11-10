import React, { PureComponent } from 'react';
import SidebarSubMenu from './sidebar.sub menu';
import config from '../../config';
import SidebarSubItem from './sidebar.sub.item';

const classes = { }

export default class SideMenuItem extends PureComponent {

	render() {
		const hash = this.props.hash;
		const label = this.props.label;
	
		return (
			<li class='menu-item'>
				<a href={hash}>{label}</a>
				<i class='material-icons'>chevron_right</i>
			</li>
			
		)
	}
}