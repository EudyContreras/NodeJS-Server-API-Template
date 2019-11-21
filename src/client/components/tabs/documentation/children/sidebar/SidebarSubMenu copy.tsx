import React, { RefObject, createRef } from 'react';
import SidebarSubItem from './SidebarSubItem';
import { join, css } from '../../../../utililties/styling.utils';

const links = [
	{
		label: 'Register a user',
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

interface Expand {
	state: boolean,
	height: number
}
interface State {
	loaded: boolean,
	height: number
}

class SidebarSubMenu extends React.PureComponent<any, State> {

	private readonly menu: RefObject<HTMLUListElement>

	constructor(props: any) {
		super(props);
		this.menu = createRef();
		this.state = {
			loaded: false,
			height: 0
		}
	}

	private expand = () => {
		console.log(this.state);
	}

	private collapse = () => {
		console.log(this.state);
	}

	public componentDidMount() {
		const menu = this.menu!.current!;
 
		this.setState(() => ({
			loaded: true,
			height: menu.clientHeight
		}));

		const style: any = {
			height: '0px',
			position: 'relative',
			visibility: 'visible',
		}

		menu.setAttribute('style', css(style));
	}

	private getMenuElement = (css: any) => {
		const style = this.props.styling;

		const classes = [style.subMenu, style.smExpanded];

		return (
			<ul ref={this.menu} className={join(...classes)} style={css} >
				{links.map((x, index) => {
					<SidebarSubItem key={index} hash={'#' + x} label={x.label} styling={style} method={x.method.label} />
				})}
			</ul>
		);
	}

	public render() {
		const expanded = this.props.expanded;

		if (this.state.loaded) {
			if (expanded) {
				return this.getMenuElement({ height: "180px" });
			} else {
				return this.getMenuElement({ height: "0px" });
			}
		} 
		return this.getMenuElement(null)
	}
}

export default SidebarSubMenu;