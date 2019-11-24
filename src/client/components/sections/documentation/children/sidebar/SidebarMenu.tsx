import React from 'react';
import { connect } from 'react-redux';
import TopSection from './sections/TopSection';
import MainSection from './sections/MainSection';
import MiddleSection from './sections/MiddleSection';
import SideMenuSearch from './SidebarSearch';
import StyleApplier from '../../../../../appliers/style.applier';
import { setHovered, setTopOffset, setFixed } from '../../../../../actions/common/sidemenu.action';
import { getSidemenu } from '../../../../../selectors/sidemenu.selector';

const headers = ['Introduction', 'Endpoints'];

interface StateProps {
	topOffset: number;
	expanded: boolean;
	hovered: boolean;
	fixed: boolean;
}

interface DispatchProps {
	setTopOffset: (offset: number) => void;
	setHovered: (hovered: boolean) => void;
	setFixed: (fixed: boolean) => void;
}

type Props = StateProps & DispatchProps & any;

class SidebarMenu extends React.PureComponent<Props> {

	private readonly sidebar: React.RefObject<HTMLElement>;

	constructor(props: any) {
		super(props);
		this.sidebar = React.createRef();
	}

	private onMouseEnter = (): void => {
		this.props.setHovered(true);
	};

	private onMouseExit = (): void => {
		this.props.setHovered(false);
	};

	// public componentDidMount = (): void => {
	// 	const style = this.props.styling;
	// 	const sideBar = this.sidebar.current;

	// 	const sidebarListener = new ScrollListener(sideBar!, null ,10, (fixed: boolean): void => {
	// 		this.setState(() => ({
	// 			fixed: fixed
	// 		}));
	// 	});

	// 	makeSticky(style, sidebarListener);
	// };

	private handleScroll = (): void => {
		const offset = this.props.topOffset;
		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (scroll >= offset && !this.props.fixed) {
			this.props.setFixed(true);
		} 

		if (scroll < offset && this.props.fixed) {
			this.props.setFixed(false);
		}
	};

	public componentDidMount = (): void => {
		const sidebar = this.sidebar.current!;
		const margin = 10;
		const scrollTop = sidebar.getBoundingClientRect().top - margin;
		this.props.setTopOffset(scrollTop);
		window.addEventListener('scroll', this.handleScroll);
	};

	public componentWillUnmount = (): void => {
		window.removeEventListener('scroll', this.handleScroll);
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		const styler = new StyleApplier(style.sideMenu);

		styler
			.appendWhen(style.sideMenuClosed, !this.props.expanded)
			.appendWhen(style.sideMenuPeek, this.props.hovered, false)
			.appendAndOr(style.fixed, style.natural, this.props.fixed); // .append(style.natural, !this.state.fixed);
		
		const common = {
			style: { top: this.props.fixed ? 10 : 'auto' },
			className: styler.getClasses()
		};

		const actions = {
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit,
		};

		return (
			<aside ref={this.sidebar} {...common} {...actions} >
				< TopSection styling={style} />
				< SideMenuSearch styling={style} menuState={this.state} />
				< MiddleSection styling={style} header={headers[0]} />
				< MainSection styling={style} header={headers[1]} />
			</aside>
		);
	};
}

const mapStateToProps = (state: any): any => getSidemenu(state.sidemenu);

export default connect<StateProps, DispatchProps, any>(mapStateToProps, { setHovered, setTopOffset, setFixed })(SidebarMenu);