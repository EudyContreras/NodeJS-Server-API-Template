import React from 'react';
import { join } from '../../../../utililties/styling.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';

class SidebarSubItem extends React.PureComponent<any, any> {

	constructor(props: any) {
		super(props);
	}

	public render = (): JSX.Element => {
		const hash = this.props.hash;
		const label = this.props.label;
		const method = this.props.method;
		const style = this.props.styling;

		const classes = [];
		
		return (

			<li className={style.subMenuItem}>
				<div className={style.subMenuItemWrapper}>
					<h3 className={join(style.httpMethod, style.httpAll)}>{method}</h3>
					<a className={style.truncate} href={hash}>{label}</a>
				</div>
				<i className={MaterialIcons.CLASS}>{MaterialIcons.icons.CHEV_RIGHT}</i>
			</li>
		);
	};
}

export default SidebarSubItem;