import React from 'react';
import config from '../../../config';
import { Link } from 'react-router-dom';

const logo = config.directories.images('brandlogo.png');

const classes = {
	nav: 'nav',
	link: 'nav-link',
	logo: {
		self: 'logo',
		image: 'logo-image',
		text: 'logo-text',
	}
}

class Navbar extends React.PureComponent {
	
	render() {
		const routes = this.props.routings;

		// const links = [];

		// routes.forEach((element, index) => {
		// 	routes.push(<li><a className={classes.link} href={element.link}>{element.label}</a></li>)
		// });

		return (
			<header id='navbar' className={classes.nav}>
				<div className={classes.logo.self}>
					<img className={classes.logo.image} src={logo} />
					<div className={classes.logo.text}><a href='/'>{this.props.brandName}</a>
					</div>
				</div>
				<ul>
					{/* {links} */}
					{routes.map((element, idx) => <li key={idx}><Link className={classes.link} to={element.link}>{element.label}</Link></li>)}
				</ul>
			</header>
		)
	}
}

export default Navbar;