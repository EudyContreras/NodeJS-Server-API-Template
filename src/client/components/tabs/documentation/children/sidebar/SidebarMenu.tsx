import React, {createRef, RefObject } from 'react';
import Wrapper from '../../../../common/Wrapper';
import MenuItem from './SidebarMenuItem';
import SideMenuToggle from './SidebarToggle';
import SideMenuSearch from './SidebarSearch';

import { join } from '../../../../utililties/styling.utils';

const version = '1.3.5';
const links = ['Quickstart', 'Basics'];
const headers = ['Introduction', 'Endpoints'];
const routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation'];

interface State {
	expanded: boolean;
	hovered: boolean;
}

class SidebarMenu extends React.PureComponent<any, State> {

	constructor(props: any) {
		super(props);

		this.state = {
			expanded: true,
			hovered: false
		};
	}

	private onMouseEnter = () => {
		this.setState(() => ({
			hovered: true
		}));
	}

	private onMouseExit = () => {
		this.setState(() => ({
			hovered: false
		}));
	}

	private handleToggle = () => {
		this.setState((state: State) => ({
			expanded: !state.expanded
		}));
	}

	public componentDidMount() { }

	public render() {
		console.log('TOGGLE hap');
		const style = this.props.styling;

		const props = {
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit,
		};

		const classes = [style.sideMenu, style.natural];

		if (!this.state.expanded) {
			classes.push(style.sideMenuClosed);
			if (this.state.hovered) {
				classes.push(style.sideMenuPeek);
			}
		} 

		return (
			<aside ref={this.props.refProp} {...props} className={join(...classes)}>
				< TopSection 
					styling={style}
					hovered={this.state.hovered} 
					expanded={this.state.expanded} 
					onSidebarToggle={this.handleToggle}
				/>
				< SideMenuSearch styling={style} menuState={this.state} />
				< MiddleSection styling={style} header={headers[0]} />
				< MainSection styling={style} header={headers[1]} />
			</aside>
		);
	}
}

class VersionInfo extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}
	public render() {
		return (
			<div>
				<h2>Api Name</h2>
				<h5>version: {version}</h5>
			</div>
		);
	}
}

class TopSection extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}
	public render() {
		const style = this.props.styling;

		return (
			<div className={style.topSection}>
				<VersionInfo styling={style} />
				<SideMenuToggle 
				   styling={style} 
					hovered={this.props.hovered} 
					expanded={this.props.expanded} 
					onSidebarToggle={this.props.onSidebarToggle} 
				/>
			</div>
		);
	}
}

class MiddleSection extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}
	public render() {
		const style = this.props.styling;

		return (
			<Wrapper>
				<h2 className={style.menuHeader} >{this.props.header}</h2>
				<ul className={style.middleSection}>
					{links.map((x, index) => <MenuItem key={index} styling={style} hash={'#' + x} label={x} />)}
				</ul>
			</Wrapper>
		);
	}
}

class MainSection extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}
	public render() {
		const style = this.props.styling;

		return (
			<Wrapper>
				<h2 className={style.menuHeader} >{this.props.header}</h2>
				<ul className={style.mainSection}>
					{routes.map((x, index) => <MenuItem key={index} styling={style} hash={'#' + x} label={x} />)}
				</ul>
			</Wrapper>
		);
	}
}

// const mapStateToProps = (state) => ({
// 	expanded: state.expanded,
// });

// export default connect(mapStateToProps, { toggleSidebar })(withStyles(style)(SidebarMenu));

export default SidebarMenu;