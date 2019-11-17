import React from 'react';
import ReactDom from 'react-dom';
import logo from '../../../resources/images/brandlogo.png';
import { Link } from 'react-router-dom';
import { classes, getHTMLElement } from '../../utililties/styling.utils';
import { ScrollListener, addAnchor } from '../../../appliers/sticky.applier';

interface State {
	activeTab: any,
	anchored: boolean
}

class Navbar extends React.PureComponent<any, State> {
	constructor(props: any) {
		super(props)
		this.state = {
			activeTab: null,
			anchored: false
		}
	}

	componentDidMount() {
      const style = this.props.styling;

		const element = getHTMLElement(this);
		
		const listener = new ScrollListener(element, undefined, -65);

      addAnchor(style, listener, (anchored: boolean) => {
			if (!anchored) {
				element.classList.remove(style.navTransition);
			} 
			this.setState(()  => ({
				anchored: anchored
			}));
		});
	}
	
	onMouseEnter = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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

	onMouseExit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const element = event.currentTarget;
		const style = this.props.styling;

		if (element.classList.contains(style.navPeeky)) {
			element.classList.remove(style.navPeeky);
		}
	}

	handleLinkClick = (tab: any) => {
		this.setState(()  => ({
			activeTab: tab
		}));
	};

	applyLinkState(style: any, element: any, idx: number) {
		const activeTab = this.state.activeTab;
		const location = this.props.location;

		const linkClick = (element: any, idx: number) => {
			this.handleLinkClick({ label: element.label, index: idx });
		}

		const navClasses: string[] = [style.navLink];

		if (activeTab === null) {
			if (element.link === location) {
				navClasses.push(style.navLinkActive);
			}
		} else if (element.label === activeTab.label ) {
			navClasses.push(style.navLinkActive);
		}

		return (	<Link onClick={(e) => linkClick(element, idx)} className={classes(...navClasses)} to={element.link}>{element.label}</Link>)
	}

	render() {
		const style = this.props.styling;
		const routes = this.props.routings;
		const classNames = [style.nav]

		const properties = {
			id: 'navbar',
			className: classes(...classNames),
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseExit
		}

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
		)
	}
}

export default Navbar;