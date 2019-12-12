import React from 'react';
import TopSection from './sections/TopSection';
import MainSection from './sections/MainSection';
import MiddleSection from './sections/MiddleSection';
import SideMenuSearch from './SidebarSearch';
import { connect } from 'react-redux';
import { shallowEqual } from '../../../../utililties/comparer.utils';
import { appendWhen } from '../../../../../appliers/style.applier';
import { getSidemenu } from '../../../../../selectors/sidemenu.selector';
import { setHovered, setFixed } from '../../../../../actions/documentation/sidebar.action';
import { join } from '../../../../utililties/react.utils';

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

class SidebarMenu extends React.Component<Props, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			hovering: false
		};
	}

	private onMouseEnter = (): void => {
		this.setState({
			hovering: true
		}, () => {
			this.props.setHovered(true);
		});
	};

	private onMouseExit = (): void => {
		this.setState({
			hovering: false
		}, () => {
			setTimeout(() => {
				if (!this.state.hovering) {
					this.props.setHovered(false);
				}
			}, 300);
		});
	};

	public shouldComponentUpdate = (nextProps: any, nextState: any): boolean => {
		return !shallowEqual(this.props.fixed, nextProps.fixed) 
			|| !shallowEqual(this.props.hovered, nextProps.hovered)
			|| !shallowEqual(this.props.expanded, nextProps.expanded);
	};

	private getProperties = (style: any): any & any => {
		const styles = [style.sideMenu];
		const cssTop = this.props.fixed ? this.props.offsetTop : 'auto';

		appendWhen(styles, !this.props.expanded, style.sideMenuClosed);
		appendWhen(styles, !this.props.expanded && this.props.hovered, style.sideMenuPeek);
		appendWhen(styles, this.props.fixed, style.fixed);
		
		const common = {
			ref: this.props.self,
			style: { top: cssTop },
			className: join(...styles)
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

const mapStateToProps = (state: any): any => getSidemenu(state.presentation);

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(SidebarMenu);