
import React from 'react';

export default class VersionInfo extends React.PureComponent<any, any> {
	
	constructor(props: any) {
		super(props);
		this.state = {
			version: '1.3.5'
		}
	}

	public render = (): JSX.Element => {
		const version = `version: ${this.state.version}`;

		return (
			<div>
				<h2>Api Name</h2>
				<h5>{version}</h5>
			</div>
		);
	};
}