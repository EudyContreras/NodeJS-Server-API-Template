
import React, { Fragment } from 'react';
import MenuItem from '../SidebarMenuItem';

const links = ['Quickstart', 'Basics'];

export default class MiddleSection extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render(): JSX.Element {
		const style = this.props.styling;

		return (
			<Fragment>
				<h2 className={style.menuHeader} >
					{this.props.header}
				</h2>
				<ul className={style.middleSection}>
					{links.map((x, index) => <MenuItem key={index} styling={style} hash={'#' + x} label={x} />)}
				</ul>
			</Fragment>
		);
	}
}