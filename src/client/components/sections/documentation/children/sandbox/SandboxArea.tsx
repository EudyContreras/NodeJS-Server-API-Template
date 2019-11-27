import React from 'react';
import SandboxSection from './SandboxSection';
import { connect } from 'react-redux';
import { appendWhen } from '../../../../../appliers/style.applier';
import { getSandbox } from '../../../../../selectors/sandbox.selector';
import { setTopFixed, setBottomFixed } from '../../../../../actions/documentation/sandbox.action';
import { join } from '../../../../utililties/styling.utils';

interface StateProps {
	fixedTop: boolean;
	fixedBottom: boolean;
	offsetBottom: number;
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
		const styles = [style.sandboxArea];
		const cssTop = this.props.fixedTop ? this.props.offsetTop : this.props.fixedBottom ? this.props.offsetBottom : 'auto';

		appendWhen(styles, this.props.fixedTop, style.fixed);
		
		const common = {
			ref: this.props.self,
			style: { top: cssTop },
			className: join(...styles)
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
			</aside>
		);
	};
}

const mapStateToProps = (state: any): any => getSandbox(state.presentation);

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(SandboxArea);