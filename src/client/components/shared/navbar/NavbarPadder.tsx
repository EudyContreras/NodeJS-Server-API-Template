import React from 'react';

export default class NavbarPadder extends React.PureComponent<any, any> {
	render() {
		const style = this.props.styling;
		return (
			<header className={style.navPadder}></header>
		)
	}
}