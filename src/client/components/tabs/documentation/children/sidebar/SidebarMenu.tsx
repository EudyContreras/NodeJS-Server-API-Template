import React from 'react';
import Wrapper from '../../../../common/Wrapper';
import MenuItem from './SidebarMenuItem';
import SideMenuToggle from './SidebarToggle';
import SideMenuSearch from './SidebarSearch';

import { classes, getElement } from '../../../../utililties/styling.utils';

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

	private closeSidebar = (style: any) => {
		getElement(this).classList.add(style.sideMenuClosed);
		getElement(this).classList.remove(style.sideMenuPeak);
	}

	private openSidebar = (style: any) => {
		getElement(this).classList.remove(style.sideMenuClosed);
		getElement(this).classList.remove(style.sideMenuPeak);
	}

	private onMouseEnter = () => {
		const style = this.props.styling;
		const expanded = this.state.expanded;
		if (!expanded) {
			getElement(this).classList.add(style.sideMenuPeek);
		}
		this.setState(() => ({
			hovered: true
		}));
	}

	private onMouseExit = () => {
		const style = this.props.styling;
		const expanded = this.state.expanded;
		if (!expanded) {
			getElement(this).classList.remove(style.sideMenuPeek);
		}
		this.setState(() => ({
			hovered: false
		}));
	}

	private handleToggle = () => {
		const style = this.props.styling;
		const expanded = this.state.expanded;

		if (expanded) {
			this.closeSidebar(style);
		} else {
			this.openSidebar(style);
		}
		this.setState((state: State) => ({
			expanded: !state.expanded
		}));
	}

	public componentDidMount() { }

	public render() {
		const style = this.props.styling;

		const props = {
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit,
		};
		return (
			<aside ref={this.props.refProp} {...props} className={classes(style.sideMenu, style.natural)}>
				< TopSection hovered={this.state.hovered} styling={style} expanded={this.state.expanded} onSidebarToggle={this.handleToggle} />
				< SideMenuSearch styling={style} />
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
				<SideMenuToggle hovered={this.props.hovered} styling={style} expanded={this.props.expanded} onSidebarToggle={this.props.onSidebarToggle} />
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
					{links.map((x) => <MenuItem styling={style} hash={'#' + x} label={x} />)}
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
					{routes.map((x) => <MenuItem styling={style} hash={'#' + x} label={x} />)}
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