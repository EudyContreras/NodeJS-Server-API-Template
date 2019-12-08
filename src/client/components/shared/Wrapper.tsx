import React from 'react';

// export default class Wrapper extends React.PureComponent<any> {
	
// 	public render = (): JSX.Element => {
// 		const { children, ...props } = this.props;
// 		return (<div {...props}>{children}</div>);
// 	};
// } 


const Wrapper: React.FunctionComponent<any> = (properties) => {
	const { children, ...props } = properties;
	return (<div {...props}>{children}</div>);
};

export default Wrapper;