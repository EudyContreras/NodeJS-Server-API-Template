
import React, { Fragment } from 'react';
import MenuItem from '../SidebarMenuItem';

const routes = ['Users', 'Privideles', 'Roles', 'Invitation', 'Users', 'Privideles', 'Roles', 'Invitation'];

export default class MainSection extends React.PureComponent<any, any> {

	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<Fragment>
				<h2 className={style.menuHeader} >
					{this.props.header}
				</h2>
				<ul className={style.mainSection}>
					{routes.map((x, index) => <MenuItem key={index} styling={style} hash={`#${x}`} label={x} />)}
				</ul>
			</Fragment>
		);
	};
}
