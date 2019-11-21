import React, { RefObject, createRef } from 'react';
import SidebarSubItem from './SidebarSubItem';
import { join } from '../../../../utililties/styling.utils';

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

	private getStyle = (height: number): any => {
		return {
			height: height,
			position: 'relative',
			visibility: 'visible',
		}
	}

	public componentDidMount() {
		const menu = this.menu!.current!;

		this.setState(() => ({
			loaded: true,
			height: menu.clientHeight
		}));
	}

	public render() {
		const style = this.props.styling;
		const expand = this.props.expanded;

		const classes = [style.subMenu];
		const listItems = links.map((x, index) => <SidebarSubItem key={index} hash={'#' + x} label={x.label} styling={style} method={x.method.label} />);
		
		if (this.state.loaded) {
			classes.push(style.smExpanded);
			if (expand) {
				return (
					<ul ref={this.menu} className={join(...classes)} style={this.getStyle(this.state.height)} >
						{listItems}
					</ul>
				);
			} else {
				return (
					<ul ref={this.menu} className={join(...classes)} style={this.getStyle(0)}>
						{listItems}
					</ul>
				);
			}
		}
		return (<ul ref={this.menu}>{listItems}</ul>);
	}
}

export default SidebarSubMenu;