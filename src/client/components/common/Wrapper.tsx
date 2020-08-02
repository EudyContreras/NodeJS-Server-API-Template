import React from 'react';

const Wrapper: React.FC<any> = (properties) => {
	const { children, ...props } = properties;
	return <div {...props}>{children}</div>;
};

export default Wrapper;
