import React from 'react';
import memoize from 'fast-memoize';
import Action from './children/NavabarAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swMessager from '../../../utilities/messageBus';
import { IStateTree } from '../../../reducers';
import { shallowEqual } from '../../utililties/comparer.utils';
import { appendWhen, join } from '../../../appliers/style.applier';
import { getNavigationBar } from '../../../selectors/navbar.selector';
import { showLoader, hideLoader } from '../../../actions/common/loader.action';
import { DispatchProps, Dispatchers } from '../../../actions/common/navigation.action';
import constants from '../../../../workers/constants';

interface StateProps {
	anchored: boolean;
	routings: any;
	styling: any;
	location: string;
	brandName: string;
	mouseInside: boolean | null;
	loadedRoutes: string[];
	isLoaderActive: boolean;
	activeTab: null | {
		label: string;
		index: string;
	};
}

interface DispatchPropsLoader {
	showLoader: () => void;
	hideLoader: (loadedRoute?: string) => void;
}

type Props = StateProps & DispatchProps & DispatchPropsLoader;

type State = {
	hovering: boolean;
};

class Navbar extends React.Component<Props, State> {

	private navbar: React.RefObject<HTMLElement>;

	constructor(props: any) {
		super(props);
		this.navbar = React.createRef();
		this.state = {
			hovering: false
		};
	}

	public shouldComponentUpdate = (nextProps: any): boolean => {
		return !shallowEqual(this.props.anchored, nextProps.anchored) 
			|| !shallowEqual(this.props.mouseInside, nextProps.mouseInside)
			|| !shallowEqual(this.props.activeTab, nextProps.activeTab);
	};

	public componentDidMount = (): void => {
		this.applyAnchor(this.navbar.current!);
	};

	private applyAnchor = (navbar: HTMLElement): void => {
		const margin = 15;
		const topOffset = -(navbar.clientHeight - margin);

		const body = document.body;

		const scroll = body.getBoundingClientRect().top;
		const scrollTop = navbar.getBoundingClientRect().top;

		const topPosition = Math.abs(scroll) + (scrollTop - topOffset);

		this.props.setOffsetTop(margin-1);

		window.addEventListener('scroll', () => this.anchor(topPosition));
	};

	private anchor = (top: number): void => {
		const anchored = this.props.anchored;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (scroll! >= top && !anchored) {
			this.props.setAnchored(true);
		}

		if (scroll! < top && anchored) {
			this.props.setAnchored(false);
		}
	};

	private onMouseEnter = (): void => {
		if (!this.props.anchored) {
			return;
		}
		this.setState({
			hovering: true
		}, () => {
			setTimeout(() => {
				if (this.state.hovering) {
					if (this.props.anchored) {
						this.props.setMouseInside(true);
					}
				}
			}, 100);
		});
	};

	private onMouseExit = (): void => {
		this.setState({
			hovering: false
		});
		if (this.props.anchored) {
			this.props.setMouseInside(false);
		}
	};

	private manageLoader = (tab: any): void => {
		if (this.props.isLoaderActive) {
			this.props.hideLoader();
		}
		if (tab != null) {
			const empty = this.props.loadedRoutes.length <= 0;
			if (empty || !this.props.loadedRoutes.includes(tab.link)) {
				if (tab.lazyLoaded) {
					this.props.showLoader();
				}
			}
		}
	};

	private handleLinkClick = (tab: any): void => {
		const { events, messages } = constants;

		this.manageLoader(tab);

		if (tab == null) {
			return this.props.setActiveTab(tab);
		}
		swMessager.emit(events.MESSAGE, { type: messages.ADD_TO_CACHE, payload: tab.link });

		if (this.props.activeTab === null) {
			this.props.setActiveTab(tab);
		} else if (this.props.activeTab.label !== tab.label) {
			this.props.setActiveTab(tab);		
		}
	};

	private getLinkProps = (style: any, element: any, idx: number): any => {
		const activeTab = this.props.activeTab;
		const location = this.props.location;

		const classes = [style.navLink];

		appendWhen(classes, activeTab === null && element.link === location, style.navLinkActive);
		appendWhen(classes, activeTab !== null && element.label === activeTab.label, style.navLinkActive);

		const properties = {
			className: join(...classes),
			onClick: ((): void => this.handleLinkClick({ ...element, index: idx })),
			to: element.link
		};

		return properties;
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;
		const routes = this.props.routings;
		const classes = [style.nav];

		const mouseInside = this.props.mouseInside === true;
		const mouseOutside = this.props.mouseInside === false;

		appendWhen(classes, this.props.anchored, style.navSticky);
		appendWhen(classes, this.props.anchored && mouseInside, style.navTransition, style.navPeeky);
		appendWhen(classes, this.props.anchored && mouseOutside, style.navTransition);

		const properties = {
			ref: this.navbar,
			className: join(...classes),
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit
		};

		return (
			<header {...properties}>
				<Link to='/' onClick= {(): void => this.handleLinkClick(null)}>
					<div className={style.navLogo}>
						<div className={style.status} />
					</div>
				</Link>
				<ul>
					{routes.map((element: any, idx: number) =>
						<li key={idx}>
							<Link {...memoize(this.getLinkProps)(style, element, idx)}>{element.label}</Link>
						</li>
					)}
				</ul>
				<Action styling={style}/>
			</header>
		);
	};
}

const mapStateToProps = (state: IStateTree | any): any => ({
	...getNavigationBar(state.presentation),
	loadedRoutes: state.generalData.routeLoader.loadedRoutes,
	isLoaderActive: state.generalData.routeLoader.isActive
});

export default connect<StateProps, DispatchProps | DispatchPropsLoader, any>(mapStateToProps, { ...Dispatchers, showLoader, hideLoader })(Navbar);