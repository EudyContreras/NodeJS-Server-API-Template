import React from 'react';
import SidebarSubMenu from './SidebarSubMenu';

class SidebarMenuItem extends React.PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			menuOpen: false
		}
	}

	openSubMenu = (event) => {
		this.setState(state => {
			menuOpen: !state.menuOpen
		});
	}

	render() {
		const hash = this.props.hash;
		const label = this.props.label;
		const style = this.props.styling;

		return (
			<div>
				<li className={style.menuItem} onClick={(e) => openSubMenu(e, style)}>
					<a href={hash}>{label}</a>
					<i className='material-icons'>chevron_right</i>
				</li>
				<SidebarSubMenu styling={style}/>
			</div>

		)
	}
}

export default SidebarMenuItem