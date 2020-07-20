import React from 'react';
import { connect } from 'react-redux';
import { IStateTree } from '../../../reducers';
import { join } from '../../utililties/react.utils';
import { hideLoader, showLoader, DispatchProps } from '../../../actions/common/loader.action';

interface StateProps {
	path: any;
	styling: any;
	loadedRoutes: string[];
}

type Props = StateProps & DispatchProps;

class AboutPage extends React.Component<Props, any> {

	public shouldComponentUpdate = (nextProps: any, nextState: any): boolean => false;

	public componentDidMount = (): void => {
		const route = this.props.path;
		const empty = this.props.loadedRoutes.length <= 0;
		if (empty || !this.props.loadedRoutes.includes(route)) {
			this.props.hideLoader(route);
		}
	};

	public render = (): JSX.Element => {
		const route = this.props.path;
		const style = this.props.styling;
		const classes = [style.routePage];

		const empty = this.props.loadedRoutes.length <= 0;
		if (empty || !this.props.loadedRoutes.includes(route)) {
			classes.push(style.routePageLoading);
		} else {
			classes.push(style.routePageloaded);
		}

		return (
			<section className={join(...classes)}>
				<h2>About Page</h2>
			</section>
		);
	};
}

const mapStateToProps = (state: IStateTree & any): any => ({
	loadedRoutes: state.generalData.routeLoader.loadedRoutes
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, { showLoader, hideLoader })(AboutPage);
