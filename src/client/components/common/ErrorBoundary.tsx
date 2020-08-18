import React from 'react';

type StateProps = {
	hasError: boolean;
	errorInfo: any;
	children: JSX.Element;
};

type Props = StateProps & any;

export default class ErrorBoundary extends React.PureComponent<Props, any> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): Props {
		return { hasError: true };
	}

	public render = (): React.ReactNode => {
		if (this.state.hasError) {
			return <h1>Something went wrong!</h1>;
		}
		return this.props.children;
	};

	public componentDidCatch = (error: any, errorInfo: any): void => {
		this.setState({
			hasError: error != null,
			errorInfo: errorInfo
		});
	};
}
