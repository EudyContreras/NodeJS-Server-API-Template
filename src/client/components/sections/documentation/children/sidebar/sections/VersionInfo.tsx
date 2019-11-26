
import React from 'react';

const version = '1.3.5';

export default class VersionInfo extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render = (): JSX.Element => {
		return (
			<div>
				<h2>Api Name</h2>
				<h5>version: {version}</h5>
			</div>
		);
	};
}