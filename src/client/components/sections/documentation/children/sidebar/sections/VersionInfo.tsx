
import React from 'react';

export default class VersionInfo extends React.PureComponent<any, any> {
	
	constructor(props: any) {
		super(props);
		this.state = {
			version: '1.3.5'
		};
	}

	public render = (): JSX.Element => {
		const version = `version: ${this.state.version}`;
		const styling = this.props.styling;
		return (
			<div>
				<h2>Api Name</h2>
				<section>
					<h3 className={styling.topSectionVersion}>{version}</h3>
				</section>
			</div>
		);
	};
}