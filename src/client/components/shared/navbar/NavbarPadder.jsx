import React from 'react';
import style from './stylings.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

class NavbarPadder extends React.PureComponent {
	
	componentDidMount() {
		
	}
	render() {
		return (
			<header className={style.navPadder}></header>
		)
	}
}

export default withStyles(style)(NavbarPadder);