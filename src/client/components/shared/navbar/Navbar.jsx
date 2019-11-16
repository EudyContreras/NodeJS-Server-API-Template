import React from 'react';
import style from './stylings.scss';
import Logo from '../../../resources/images/brandlogo.png';
import withStyles from 'isomorphic-style-loader/withStyles';
import config from '../../../config';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Navbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = this.props;
	}
	componentDidMount() {
	
	}
	/**
	 * @param {React.MouseEvent<HTMLElement, MouseEvent>} e
	 */
	handleLinkClick = (e, tab) => {
		this.state.activetTab = tab;
		console.log(this.state.activetTab);
	};

	render() {
		const routes = this.props.routings;

		return (
			<header id='navbar' className={style.nav}>
				<div className={style.logo}>
					<img className={style.logoImage} src={Logo} />
					<div className={style.logoText}><a href='/'>{this.props.brandName}</a>
					</div>
				</div>
				<ul>
					{routes.map((element, idx) =>
						<li key={idx}>
							<Link onClick={(e) => this.handleLinkClick(e, { index: idx, label: element.label})} className={style.link} to={element.link}>{element.label}</Link>
						</li>
					)}
				</ul>
			</header>
		)
	}
}

Navbar.propTypes = {
	routings: PropTypes.arrayOf(PropTypes.any),
	activeTab: PropTypes.any,
	brandName: PropTypes.string
};

export default withStyles(style)(Navbar);