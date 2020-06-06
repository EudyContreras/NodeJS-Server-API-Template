import React, { Fragment } from 'react';

interface Props {
	styling: any;
	self: any;
}
class AdminPage extends React.PureComponent<Props> {
	
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (<Fragment><h2>Admin Page</h2></Fragment>);
	};
}

export default AdminPage;