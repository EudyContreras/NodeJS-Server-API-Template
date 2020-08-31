import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IStateTree } from '../../reducers';
import { DispatchProps, Dispatchers } from '../../actions/common/loader.action';

interface StateProps {
	styling: any;
	isActive: boolean;
}

type Props = StateProps & DispatchProps;

class Loading extends React.PureComponent<Props, any> {
	public render = (): JSX.Element => {
		const styling = this.props.styling;

		if (this.props.isActive) {
			return (
				<section className={styling.loadingPage}>
					<div className={styling.loading}>
						<div></div>
						<div></div>
					</div>
				</section>
			);
		}
		return <Fragment />;
	};
}

const mapStateToProps = (state: IStateTree & any): any => ({
	isActive: state.generalData.routeLoader.isActive
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(Loading);
