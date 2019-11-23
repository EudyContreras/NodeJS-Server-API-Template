
import React from 'react';
import SideMenuToggle from '../SidebarToggle';
import VersionInfo from './VersionInfo';

export default class TopSection extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}
	
	public render(): JSX.Element {
		const style = this.props.styling;

		return (
			<div className={style.topSection}>
				<VersionInfo styling={style} />
				<SideMenuToggle
					styling={style}
					hovered={this.props.hovered}
					expanded={this.props.expanded}
					onSidebarToggle={this.props.onSidebarToggle}
				/>
			</div>
		);
	}
}
