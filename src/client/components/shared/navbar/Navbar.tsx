import React from 'react';
import { Link } from 'react-router-dom';
import { join } from '../../utililties/styling.utils';

interface State {
	hovered: boolean;
	anchored: boolean;
	activeTab: any;
}

class Navbar extends React.PureComponent<any, State> {
	private navbar: React.RefObject<HTMLElement>;

	constructor(props: any) {
		super(props);
		this.navbar = React.createRef();
		this.state = {
			activeTab: null,
			hovered: false,
			anchored: false
		};
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

		window.addEventListener('scroll', () => this.anchor(topPosition));
	};

	private anchor = (top: number): void => {
		const anchored = this.state.anchored;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (scroll! >= top && !anchored) {
			this.setState({ anchored: true });
		}

		if (scroll! < top && anchored) {
			this.setState({ anchored: false });
		}
	};
	
	private onMouseEnter = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const element = event.currentTarget;
		const style = this.props.styling;

		if (!this.state.anchored) return;

		if (!element.classList.contains(style.navTransition)) {
			element.classList.add(style.navTransition);
		}

		if (!element.classList.contains(style.navPeeky)) {
			element.classList.add(style.navPeeky);
		}
	};

	private onMouseExit = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const element = event.currentTarget;
		const style = this.props.styling;

		if (element.classList.contains(style.navPeeky)) {
			element.classList.remove(style.navPeeky);
		}
	};

	private handleLinkClick = (tab: any): void => {
		this.setState(() => ({
			activeTab: tab
		}));
	};

	private applyLinkState = (style: any, element: any, idx: number): JSX.Element => {
		const activeTab = this.state.activeTab;
		const location = this.props.location;

		const linkClick = (): void => {
			this.handleLinkClick({ label: element.label, index: idx });
		};

		const navClasses: string[] = [style.navLink];

		if (activeTab === null) {
			if (element.link === location) {
				navClasses.push(style.navLinkActive);
			}
		} else if (element.label === activeTab.label ) {
			navClasses.push(style.navLinkActive);
		}

		return (<Link onClick={linkClick} className={join(...navClasses)} to={element.link}>{element.label}</Link>);
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;
		const routes = this.props.routings;
		const classes = [style.nav];

		if (this.state.anchored) {
			classes.push(style.navSticky);
		}
		const properties = {
			ref: this.navbar,
			className: join(...classes),
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit
		};

		return (
			<header { ...properties }>
				<div className={style.navLogo}>
					<div className={style.status} />
					<div className={style.navLogoText}>
						<a href='/'>{this.props.brandName}</a>
					</div>
				</div>
				<ul>
					{routes.map((element: any, idx: number) =>
						<li key={idx}>{this.applyLinkState(style, element, idx)}</li>
					)}
				</ul>
			</header>
		);
	};
}

export default Navbar;