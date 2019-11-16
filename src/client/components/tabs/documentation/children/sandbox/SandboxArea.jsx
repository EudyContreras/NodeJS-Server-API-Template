import React from 'react';
import SandboxSection from './SandboxSection';
import { classes } from '../../../../utililties/styling.utils';

class SandboxArea extends React.PureComponent {

	constructor(props) {
		super(props)
	}

	render() {
		const style = this.props.styling;
		return (
			<aside className={classes(style.sandboxArea, style.natural)}>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
			</aside>
		)
	}
}

export default SandboxArea;