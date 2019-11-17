import React from 'react';
import logo from '../../../resources/images/logo.png';
import { Link } from 'react-router-dom';
import { classes, getElement } from '../../utililties/styling.utils';

class Navbar extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			activeTab: null
		}
	}

	componentDidMount() {
		console.log(this.state.activeTab);
	}

	handleLinkClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, tab: any) => {
		const style = this.props.styling;

		this.setState((state: any)  => ({
			activeTab: tab
		}));
	};

	applyLinkState(style: any, element: any, idx: number) {
		const activeTab = this.state.activeTab;
		const location = this.props.location;

		console.log(location);
		const linkClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, element: any, idx: number) => {
			this.handleLinkClick(event, { label: element.label, index: idx });
		}

		const navClasses: string[] = [style.navLink];

		if (activeTab === null) {
			if (element.link === location) {
				navClasses.push(style.navLinkActive);
			}
		} else if (element.label === activeTab.label ) {
			navClasses.push(style.navLinkActive);
		}

		return (	<Link onClick={(e) => linkClick(e, element, idx)} className={classes(...navClasses)} to={element.link}>{element.label}</Link>)
	}

	render() {
		const style = this.props.styling;
		const routes = this.props.routings;

		return (
			<header id='navbar' className={style.nav}>
				<div className={style.navLogo}>
					<img className={style.navLogoImage} src={logo}/>
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