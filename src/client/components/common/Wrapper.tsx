import React from 'react';

export default class Wrapper extends React.PureComponent<any> {
	
	public render = (): JSX.Element => {
		const { children, ...props } = this.props;
		return (<div {...props}>{children}</div>);
	};
} 