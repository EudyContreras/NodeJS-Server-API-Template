import React from 'react';

interface Props {
	styling: any;
	self: any;
}

export default class NavbarPadder extends React.PureComponent<Props> {
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return <div ref={this.props.self} className={style.navPadder}></div>;
	};
}
