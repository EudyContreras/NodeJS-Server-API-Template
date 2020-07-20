import React from 'react';
import SideMenuToggle from '../SidebarToggle';
import VersionInfo from './VersionInfo';

export default class TopSection extends React.PureComponent<any, any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<div className={style.topSection}>
				<VersionInfo styling={style} />
				<SideMenuToggle styling={style} />
			</div>
		);
	};
}
