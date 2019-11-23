import React from 'react';
import { Link } from 'react-router-dom';
import { join } from '../../utililties/styling.utils';
import { ScrollListener, addAnchor } from '../../../appliers/sticky.applier';

interface State {
	activeTab: any;
	anchored: boolean;
}

class Navbar extends React.PureComponent<any, State> {
	private navbar: React.RefObject<HTMLElement>

	constructor(props: any) {
		super(props);
		this.navbar = React.createRef();
		this.state = {
			activeTab: null,
			anchored: false
		};
	}

	public componentDidMount(): void {
		const navbar = this.navbar.current!;
		this.applyAnchor(navbar);
	}

	private applyAnchor(element: HTMLElement): void {
		const style = this.props.styling;

		const listener = new ScrollListener(element, undefined, -65);

		addAnchor(style, listener, (anchored: boolean) => {
			if (!anchored) {
				element.classList.remove(style.navTransition);
			} 
			this.setState(() => ({
				anchored: anchored
			}));
		});
	}
	
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
	}

	private onMouseExit = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		const element = event.currentTarget;
		const style = this.props.styling;

		if (element.classList.contains(style.navPeeky)) {
			element.classList.remove(style.navPeeky);
		}
	}

	private handleLinkClick = (tab: any): void => {
		this.setState(() => ({
			activeTab: tab
		}));
	}

	private applyLinkState(style: any, element: any, idx: number): JSX.Element {
		const activeTab = this.state.activeTab;
		const location = this.props.location;

		const linkClick = (element: any, idx: number): void => {
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

		return (<Link onClick={(): any => linkClick(element, idx)} className={join(...navClasses)} to={element.link}>{element.label}</Link>);
	}

	public render(): JSX.Element {
		const style = this.props.styling;
		const routes = this.props.routings;
		const classes = [style.nav];

		const properties = {
			id: 'navbar',
			ref: this.navbar,
			className: join(...classes),
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit
		};

		return (
			<header { ...properties }>
				<div className={style.navLogo}>
					<div className={style.status} />
					{/* <img className={style.navLogoImage} src={logo}/> */}
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
	}
}

export default Navbar;