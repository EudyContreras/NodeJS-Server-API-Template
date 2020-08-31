import React, { Fragment } from 'react';
import MenuItem from '../SidebarMenuItem';

const links = ['Quickstart', 'Basics'];

type StateProps = {
	header: string;
	styling: any;
};
export const MiddleSection: React.FC<StateProps> = React.memo(
	(props: StateProps): JSX.Element => {
		const style = props.styling;

		return (
			<Fragment>
				<h2 className={style.menuHeader}>{props.header}</h2>
				<ul className={style.middleSection}>
					{links.map((x, index) => (
						<MenuItem key={index} styling={style} hash={'#' + x} label={x} />
					))}
				</ul>
			</Fragment>
		);
	}
);

export default MiddleSection;
