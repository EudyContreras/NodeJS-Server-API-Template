import React, { Fragment } from 'react';
import MenuItem from '../SidebarMenuItem';

const routes = ['Users', 'Priviledges', 'Roles', 'Invitation', 'Users', 'Priviledges', 'Roles', 'Invitation', 'Users', 'Priviledges', 'Roles', 'Invitation'];

type StateProps = {
	header: string;
	styling: any;
};

export const MainSection: React.FC<StateProps> = React.memo(
	(props: StateProps): JSX.Element => {
		const style = props.styling;

		return (
			<Fragment>
				<h2 className={style.menuHeader}>{props.header}</h2>
				<ul className={style.mainSection}>
					{routes.map((x, index) => (
						<MenuItem key={index} styling={style} hash={`#${x}`} label={x} />
					))}
				</ul>
			</Fragment>
		);
	}
);

export default MainSection;
