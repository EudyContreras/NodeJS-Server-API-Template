import React, { Fragment } from 'react';
import MenuItem from './SidebarMenuItem';
import SideMenuToggle from './SidebarToggle';
import SideMenuSearch from './SidebarSearch';
import { toggleExpand } from '../../../../../actions/sidemenu.action';
import { connect } from 'react-redux';
import { join } from '../../../../utililties/styling.utils';

const version = '1.3.5';
const links = ['Quickstart', 'Basics'];
const headers = ['Introduction', 'Endpoints'];
const routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation'];

interface State {
	fixed: boolean;
	hovered: boolean;
	expanded: boolean;
}

interface StateProps {
	expanded: boolean;
}

interface DispatchProps {
	toggleExpand: () => void;
}

type Props = StateProps & DispatchProps & any


class SidebarMenu extends React.PureComponent<Props, State> {

	constructor(props: any) {
		super(props);

		this.state = {
			fixed: false,
			hovered: false,
			expanded: true
		};
	}

	private onMouseEnter = (): void => {
		this.setState(() => ({
			hovered: true
		}));
	}

	private onMouseExit = (): void => {
		this.setState(() => ({
			hovered: false
		}));
	}

	private handleToggle = (): void => {
		this.props.toggleExpand();
	}

	public render(): JSX.Element {
		console.log(this.props.expanded);
		const style = this.props.styling;
		const isFixed = this.props.fixed;

		const props = {
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit,
		};

		const classes = [style.sideMenu, style.natural];


		if (!this.props.expanded) {
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
					expanded={this.props.expanded}
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
	public render(): JSX.Element {
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
	public render(): JSX.Element {
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
	public render(): JSX.Element {
		const style = this.props.styling;

		return (
			<Fragment>
				<h2 className={style.menuHeader} >{this.props.header}</h2>
				<ul className={style.middleSection}>
					{links.map((x, index) => <MenuItem key={index} styling={style} hash={'#' + x} label={x} />)}
				</ul>
			</Fragment>
		);
	}
}

class MainSection extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}
	public render(): JSX.Element {
		const style = this.props.styling;

		return (
			<Fragment>
				<h2 className={style.menuHeader} >{this.props.header}</h2>
				<ul className={style.mainSection}>
					{routes.map((x, index) => <MenuItem key={index} styling={style} hash={'#' + x} label={x} />)}
				</ul>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: any): any => {
	return {
		...state.sidemenu
	};
};

export default connect<StateProps, DispatchProps, any>(mapStateToProps, { toggleExpand })(SidebarMenu);