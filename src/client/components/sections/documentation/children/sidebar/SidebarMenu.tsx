import React from 'react';
import TopSection from './sections/TopSection';
import MainSection from './sections/MainSection';
import MiddleSection from './sections/MiddleSection';
import SideMenuSearch from './SidebarSearch';
import { connect } from 'react-redux';
import { join } from '../../../../utililties/styling.utils';
import { setHovered } from '../../../../../actions/common/sidemenu.action';
import { ISideMenu } from '../../../../../reducers/common/sidemenu.reducer';

const headers = ['Introduction', 'Endpoints'];

interface StateProps {
	expanded: boolean;
	hovered: boolean;
	fixed: boolean;
}

interface DispatchProps {
	setHovered: (hovered: boolean) => void;
}

type State = ISideMenu;
type Props = StateProps & DispatchProps & any;

class SidebarMenu extends React.PureComponent<Props, State> {

	constructor(props: any) {
		super(props);
	}

	private onMouseEnter = (): void => {
		this.props.setHovered(true);
	};

	private onMouseExit = (): void => {
		this.props.setHovered(false);
	};

	public render(): JSX.Element {
		const style = this.props.styling;
		const fixed = this.props.fixed;

		const actions = {
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit,
		};

		const classes = [style.sideMenu, style.natural];

		if (!this.props.expanded) {
			classes.push(style.sideMenuClosed);
			if (this.props.hovered) {
				classes.push(style.sideMenuPeek);
			}
		}

		return (
			<aside ref={this.props.refProp} {...actions} className={join(...classes)}>
				< TopSection styling={style} hovered={this.props.hovered} expanded={this.props.expanded} />
				< SideMenuSearch styling={style} menuState={this.state} />
				< MiddleSection styling={style} header={headers[0]} />
				< MainSection styling={style} header={headers[1]} />
			</aside>
		);
	}
}

const mapStateToProps = (state: any): any => {
	return {
		...state.sidemenu
	};
};

export default connect<StateProps, DispatchProps, any>(mapStateToProps, { setHovered })(SidebarMenu);