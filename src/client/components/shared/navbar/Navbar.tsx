import React from 'react';
import Logo from '../../../resources/images/.png';
import config from '../../../config';
import { Link } from 'react-router-dom';


const classes = {
	nav: 'nav',
	link: 'nav-link',
	logo: {
		self: 'logo',
		image: 'logo-image',
		text: 'logo-text',
	}
}

interface PropState {
	routings: any[],
	brandName: string | null,
	isToggleOn: boolean
}

class Navbar extends React.PureComponent<PropState,PropState> {
	constructor(props: PropState) {
		super(props);
		this.state = {
			routings: [],
			brandName: null,
			isToggleOn: true
		};
	 }

	 handleLinkClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		console.log(e.currentTarget.innerText);
	 };
  
	render() {
		const routes = this.props.routings;

		return (
			<header id='navbar' className={classes.nav}>
				<div className={classes.logo.self}>
					<img className={classes.logo.image} src={logo} />
					<div className={classes.logo.text}><a href='/'>{this.props.brandName}</a>
					</div>
				</div>
				<ul>
					{routes.map((element, idx) => <li key={idx}><Link onClick={this.handleLinkClick} className={classes.link} to={element.link}>{element.label}</Link></li>)}
				</ul>
			</header>
		)
	}
}

export default Navbar;