import React, { PureComponent } from 'react';
import config from '../../config';

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

export default class NavbarMenu extends PureComponent {
	
	render() {
		const routes = this.props.routings;

		const links = [];

		routes.forEach((element, index) => {
			links.push(<li><a className={classes.link} href={element.link}>{element.label}</a></li>)
		});

		return (
			<header id='navbar' className={classes.nav}>
				<div className={classes.logo.self}>
					<img className={classes.logo.image} src={logo} />
					<div className={classes.logo.text}><a href='../../'>{this.props.brandName}</a>
					</div>
				</div>
				<ul>
					{links}
				</ul>
			</header>
		)
	}
}