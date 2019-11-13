import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './stylings.css';
import logo from '../../../resources/images/brandlogo.png';
import withStyles from 'isomorphic-style-loader/withStyles';

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Container
} from 'reactstrap';

class AppNavbar extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const routes = this.props.routings;

		var links = [];

		routes.forEach((element, index) => {
			links.push(<NavItem key={index}><Link className="nav-link" to={element.link}>{element.text}</Link></NavItem>)
		});

		var logoImage = (
			<span class="navbar-logo">
			  <a href="https:knowit.se">
				 <img src={logo} height="33" width="33" alt="text here"/></a>
			</span>
		 );

		return (
			<div>
				<Navbar color="dark" dark expand="sm" className="md-5">
					{logoImage}
					<NavbarBrand className="brand-name" href="/">{this.props.brandName}</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{links}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}

export default withStyles(styles)(AppNavbar);