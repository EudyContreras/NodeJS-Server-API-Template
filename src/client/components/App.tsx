import React, { Fragment } from 'react';
import ErrorBoundary from './shared/ErrorBoundary';
import NavbarMenu from './shared/navbar/Navbar';
import NavbarPadder from './shared/navbar/NavbarPadder';
import Notifier from '../components/shared/navbar/NavbarNotifier';
import withStyles from 'isomorphic-style-loader/withStyles';
import Loader from './shared/Loader';
import style from '../styles/app.scss';
import router from './Routes';

import { Switch, Route } from 'react-router-dom';

interface State {
	navPadding: number;
}

class App extends React.PureComponent<any, State> {
	private padder: React.RefObject<HTMLDivElement>;
	private styling: any = style;

	constructor(props: any) {
		super(props);
		this.padder = React.createRef();
		this.state = {
			navPadding: 0
		};
	}

	public componentDidMount = (): void => {
		const padder = this.padder.current!;

		this.setState({
			navPadding: padder.clientHeight
		});
	};

	public render = (): JSX.Element => {
		const props = this.props;
		const routes = router({ styling: this.styling });

		const elements = routes.filter((x) => x.mapping.navLink === true).map((x) => ({ link: x.mapping.path, label: x.mapping.label, lazyLoaded: x.mapping.lazyLoaded }));

		const routings = routes.map((route, idx) => <Route exact history={props.history} key={idx} path={route.mapping.path} component={route.render} />);

		return (
			<Fragment>
				<NavbarPadder self={this.padder} styling={this.styling} />
				<ErrorBoundary>
					<Loader styling={this.styling} />
					<Switch> {routings} </Switch>
				</ErrorBoundary>
				<NavbarMenu styling={this.styling} location={this.props.location} routings={elements} />
			</Fragment>
		);
	};
}

export default withStyles(style)(App);
