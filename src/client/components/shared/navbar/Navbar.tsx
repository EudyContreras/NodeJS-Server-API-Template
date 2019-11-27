import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { join } from '../../utililties/styling.utils';
import { appendWhen } from '../../../appliers/style.applier';
import { getNavigationBar } from '../../../selectors/navbar.selector';
import {
	setAnchored,
	setMouseInside,
	setMouseOutside,
	setOffsetTop,
	setActiveTab
} from '../../../actions/common/navigation.action';

interface StateProps {
	anchored: boolean;
	mouseInside: boolean;
	mouseOutside: boolean;
	activeTab: null | {
		label: string;
		index: string;
	};
}

interface DispatchProps {
	setAnchored: (anchored: boolean) => void;
	setMouseInside: (inside: boolean) => void;
	setMouseOutside: (outside: boolean) => void;
	setOffsetTop: (offset: number) => void;
	setActiveTab: (tab: string) => void;
}

const Dispatchers = { setAnchored, setMouseInside, setMouseOutside, setActiveTab, setOffsetTop };

type Props = StateProps & DispatchProps & any;

class Navbar extends React.PureComponent<Props, any> {

	private navbar: React.RefObject<HTMLElement>;

	constructor(props: any) {
		super(props);
		this.navbar = React.createRef();
	}

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
		if (this.props.anchored) {
			this.props.setMouseInside(true);
		}
	};

	private onMouseExit = (): void => {
		if (this.props.anchored) {
			this.props.setMouseOutside(true);
		}
	};

	private handleLinkClick = (tab: any): void => {
		this.props.setActiveTab(tab);
	};

	private getLinkProps = (style: any, element: any, idx: number): any => {
		const activeTab = this.props.activeTab;
		const location = this.props.location;

		const linkClick = (): void => {
			this.handleLinkClick({ label: element.label, index: idx });
		};

		const classes = [style.navLink];

		appendWhen(classes, activeTab === null && element.link === location, style.navLinkActive);
		appendWhen(classes, activeTab !== null && element.label === activeTab.label, style.navLinkActive);

		const properties = {
			className: join(...classes),
			onClick: linkClick,
			to: element.link,
		};

		return properties;
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;
		const routes = this.props.routings;
		const classes = [style.nav];

		appendWhen(classes, this.props.anchored, style.navSticky);
		appendWhen(classes, this.props.anchored && this.props.mouseInside, style.navTransition, style.navPeeky);
		appendWhen(classes, this.props.mouseOutside, style.navTransition);

		const properties = {
			ref: this.navbar,
			className: join(...classes),
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit
		};

		return (
			<header {...properties}>
				<div className={style.navLogo}>
					<div className={style.status} />
					<div className={style.navLogoText}>
						<a href='/'>{this.props.brandName}</a>
					</div>
				</div>
				<ul>
					{routes.map((element: any, idx: number) =>
						<li key={idx}><Link {...this.getLinkProps(style, element, idx)}>{element.label}</Link></li>
					)}
				</ul>
			</header>
		);
	};
}

const mapStateToProps = (state: any): any => getNavigationBar(state.presentation);

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(Navbar);