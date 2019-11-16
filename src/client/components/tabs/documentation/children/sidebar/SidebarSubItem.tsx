import React from 'react';

class SidebarSubItem extends React.PureComponent<any, any> {

	render() {
		const hash = this.props.hash;
		const label = this.props.label;
		const method = this.props.method;

		return (
			<li className='sub-menu-item'>
				<h3 className='http-method http-all'>{method}</h3>
				<a className='truncate' href={hash}>{label}</a>
				<i className='material-icons'>chevron_right</i>
			</li>
		)
	}
}

export default SidebarSubItem;