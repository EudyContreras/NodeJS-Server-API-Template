import React from 'react';
import { join } from '../../../../utililties/react.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';

type StateProps = {
	hash: string;
	label: string;
	method: string;
	styling: any;
};

const SidebarSubItem: React.FC<StateProps> = React.memo(
	(props: StateProps): JSX.Element => {
		const { hash, label, method, styling } = props;

		const classes = [styling.httpMethod, styling.httpAll];
		const className = join(...classes);

		return (
			<li className={styling.subMenuItem}>
				<div className={styling.subMenuItemWrapper}>
					<h3 className={className}>{method}</h3>
					<a className={styling.truncate} href={hash}>
						{label}
					</a>
				</div>
				<i className={MaterialIcons.class}>{MaterialIcons.icons.CHEV_RIGHT}</i>
			</li>
		);
	}
);

export default SidebarSubItem;
