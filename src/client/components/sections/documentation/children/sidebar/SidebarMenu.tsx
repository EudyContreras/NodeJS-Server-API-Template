import React from 'react';
import { connect } from 'react-redux';
import TopSection from './sections/TopSection';
import MainSection from './sections/MainSection';
import MiddleSection from './sections/MiddleSection';
import SideMenuSearch from './SidebarSearch';
import StyleApplier from '../../../../../appliers/style.applier';
import { getSidemenu } from '../../../../../selectors/sidemenu.selector';
import { setHovered, setFixed } from '../../../../../actions/documentation/sidebar.action';

const headers = ['Introduction', 'Endpoints'];

interface StateProps {
	fixed: boolean;
	hovered: boolean;
	expanded: boolean;
}

interface DispatchProps {
	setHovered: (hovered: boolean) => void;
	setFixed: (fixed: boolean) => void;
}

const Dispatchers = { setHovered, setFixed };

type Props = StateProps & DispatchProps & any;

class SidebarMenu extends React.PureComponent<Props> {

	constructor(props: any) {
		super(props);
	}

	private onMouseEnter = (): void => {
		this.props.setHovered(true);
	};

	private onMouseExit = (): void => {
		this.props.setHovered(false);
	};

	private getProperties = (style: any): any & any => {
		const styler = new StyleApplier(style.sideMenu);
		const cssTop = this.props.fixed ? 15 : 'auto';

		styler
			.appendWhen(!this.props.expanded, style.sideMenuClosed)
			.appendWhen(this.props.hovered, style.sideMenuPeek, false)
			.append(this.props.fixed, style.fixed);
		
		const common = {
			ref: this.props.self,
			style: { top: cssTop },
			className: styler.getClasses()
		};

		const actions = {
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit,
		};

		return { common, actions };
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		const { common , actions } = this.getProperties(style);

		return (
			<aside {...common} {...actions} >
				< TopSection styling={style} />
				< SideMenuSearch styling={style} menuState={this.state} />
				< MiddleSection styling={style} header={headers[0]} />
				< MainSection styling={style} header={headers[1]} />
			</aside>
		);
	};
}

const mapStateToProps = (state: any): any => getSidemenu(state.documentation.sidebar);

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(SidebarMenu);