import React from 'react';
import { join } from '../../../../utililties/styling.utils'
import { MaterialIcons } from '../../../../../stores/icon.library';

class SidebarSubItem extends React.PureComponent<any, any> {

	constructor(props: any) {
		super(props);
	}

	public render() {
		const hash = this.props.hash;
		const label = this.props.label;
		const method = this.props.method;
		const style = this.props.styling;

		const classes = []
		
		return (

			<li className={style.subMenuItem}>
				{/* <h3 className={join(http-method http-all)}>{method}</h3> */}
				<a className={style.truncate} href={hash}>{label}</a>
				<i className={MaterialIcons.className}>{MaterialIcons.icons.CHEV_RIGHT}</i>
			</li>
		);
	}
}

export default SidebarSubItem;