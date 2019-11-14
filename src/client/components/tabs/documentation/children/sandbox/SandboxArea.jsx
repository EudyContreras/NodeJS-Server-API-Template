import React from 'react';
import SandboxSection from './SandboxSection';

class SandboxArea extends React.PureComponent {

	render() {

		return (
			<aside className='sandbox-area natural-sb bottom-sb'>
				<SandboxSection/>
				<SandboxSection/>
				<SandboxSection/>
				<SandboxSection/>
				<SandboxSection/>
			</aside>
		)
	}
}

export default SandboxArea;