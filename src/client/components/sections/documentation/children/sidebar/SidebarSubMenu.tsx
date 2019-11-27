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
	hidden: boolean;
	loaded: boolean;
	height: number;
}

class SidebarSubMenu extends React.PureComponent<any, State> {

	private readonly menu: RefObject<HTMLUListElement>;

	constructor(props: any) {
		super(props);
		this.menu = createRef();
		this.state = {
			hidden: true,
			loaded: false,
			height: 0
		};
	}

	private hiddenStyle = (): any => {
		return {
			height: 0,
			position: 'absolute',
			visibility: 'hidden'
		};
	};

	private getStyle = (height: number): any => {
		return {
			height: height,
			position: 'relative',
			visibility: 'visible'
		};
	};

	private onHidden = (): void => {
		this.setState(() => ({
			hidden: true
		}));
	};

	private onShown = (): void => {
		this.setState(() => ({
			hidden: false
		}));
	};

	public componentDidMount = (): void => {
		const menu = this.menu!.current!;

		this.setState(() => ({
			loaded: true,
			height: menu.clientHeight
		}));
	};

	public render = (): JSX.Element => {

		const style = this.props.styling;
		const expand = this.props.expanded;

		const classes = [style.subMenu];
		const listItems = links.map((x, index) => <SidebarSubItem key={index} hash={'#' + x} label={x.label} styling={style} method={x.method.label} />);
		
		if (this.state.loaded) {
			classes.push(style.smExpanded);
			if (expand) {
				return (
					<ul ref={this.menu} onTransitionEnd={this.onShown} className={join(...classes)} style={this.getStyle(this.state.height)} >
						{listItems}
					</ul>
				);
			} else {
				const styling = this.state.hidden ? this.hiddenStyle() : this.getStyle(0);

				return (
					<ul ref={this.menu} onTransitionEnd={this.onHidden} className={join(...classes)} style={styling}>
						{listItems}
					</ul>
				);
			}
		}
		return (<ul ref={this.menu}>{listItems}</ul>);
	};
}

export default SidebarSubMenu;