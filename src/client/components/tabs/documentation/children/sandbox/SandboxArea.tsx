import React from 'react';
import SandboxSection from './SandboxSection';
import { classes } from '../../../../utililties/styling.utils';

class SandboxArea extends React.PureComponent<any, any> {

	constructor(props: any) {
		super(props);
	}

	public render() {
		const style = this.props.styling;
		return (
			<aside ref={this.props.refProp}  className={classes(style.sandboxArea, style.natural)}>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
			</aside>
		);
	}
}

export default SandboxArea;