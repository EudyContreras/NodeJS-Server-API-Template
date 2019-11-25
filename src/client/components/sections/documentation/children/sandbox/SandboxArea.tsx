import React from 'react';
import { connect } from 'react-redux';
import SandboxSection from './SandboxSection';
import StyleApplier from '../../../../../appliers/style.applier';
import { getSandbox } from '../../../../../selectors/sandbox.selector';
import { setTopFixed, setBottomFixed } from '../../../../../actions/documentation/sandbox.action';

interface StateProps {
	fixedTop: boolean;
	fixedBottom: boolean;
}

interface DispatchProps {
	setTopFixed: (fixed: boolean) => void;
	setBottomFixed: (fixed: boolean) => void;
}

const Dispatchers = { setTopFixed, setBottomFixed };

type Props = StateProps & DispatchProps & any;

class SandboxArea extends React.PureComponent<Props, any> {

	constructor(props: any) {
		super(props);
	}

	private getProperties = (style: any): any & any => {
		const styler = new StyleApplier(style.sandboxArea);

		styler.appendAndOr(this.props.fixedTop, style.fixed, style.natural);
		
		const common = {
			ref: this.props.self,
			style: { top: this.props.fixedTop ? 10 : 'auto' },
			className: styler.getClasses()
		};

		return { common };
	};

	public render = (): JSX.Element => {
		console.log(this.props);

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

const mapStateToProps = (state: any): any => getSandbox(state.documentation.sandbox);

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(SandboxArea);