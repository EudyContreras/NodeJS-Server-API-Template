import React, { PureComponent } from 'react';
import SandboxSection from './sandbox.area.section';

export default class SandboxArea extends PureComponent {

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