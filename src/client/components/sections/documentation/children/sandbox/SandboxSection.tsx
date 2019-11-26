import React from 'react';

class SandboxSection extends React.PureComponent<any> {

	constructor(props: any) {
		super(props);
	}

	public render = (): JSX.Element => {
		console.log(' Sandbox Section rendered');
		return (<div> </div>);
	};
}

export default SandboxSection;