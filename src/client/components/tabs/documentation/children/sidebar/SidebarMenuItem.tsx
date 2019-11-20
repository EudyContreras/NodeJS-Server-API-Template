import React from 'react';
import SidebarSubMenu from './SidebarSubMenu';

class SidebarMenuItem extends React.PureComponent<any, any>{

	constructor(props: any) {
		super(props);
		this.state = {
			menuOpen: false
		};
	}

	private openSubMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>, style: any) => {
		this.setState((state: any) => {
			menuOpen: !state.menuOpen;
		});
	}

	public render() {
		const key = this.props.itemId;
		const hash = this.props.hash;
		const label = this.props.label;
		const style = this.props.styling;

		return (
			<div>
				<li className={style.menuItem} onClick={(e) => this.openSubMenu(e, style)}>
					<a href={hash}>{label}</a>
					<i className='material-icons'>chevron_right</i>
				</li>
				<SidebarSubMenu styling={style}/>
			</div>

		);
	}
}

export default SidebarMenuItem;