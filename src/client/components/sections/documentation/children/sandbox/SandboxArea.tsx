import React from 'react';
import { connect } from 'react-redux';
import SandboxSection from './SandboxSection';
import StyleApplier from '../../../../../appliers/style.applier';
import { getSandbox } from '../../../../../selectors/sandbox.selector';
import { setFixed, setOffsets } from '../../../../../actions/documentation/children/sandbox.action';

interface StateProps {
	fixed: boolean;
	offsetTop: number;
	offsetBottom: number;
}

interface DispatchProps {
	setOffsets: (offsetTop?: number, offsetBottom?: number) => void;
	setFixed: (fixed: boolean) => void;
}

const Dispatchers = { setOffsets, setFixed };

type Props = StateProps & DispatchProps & any;

class SandboxArea extends React.PureComponent<Props, any> {

	constructor(props: any) {
		super(props);
	}

	private getProperties = (style: any): any & any => {
		const styler = new StyleApplier(style.sandboxArea);

		styler.appendAndOr(this.props.fixed, style.fixed, style.natural);
		
		const common = {
			ref: this.props.self,
			style: { top: this.props.fixed ? 10 : 'auto' },
			className: styler.getClasses()
		};

		return { common };
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		const { common } = this.getProperties(style);

		return (
			<aside {...common}>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
				<SandboxSection styling={style}/>
			</aside>
		);
	};
}

const mapStateToProps = (state: any): any => getSandbox(state.documentation);

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(SandboxArea);