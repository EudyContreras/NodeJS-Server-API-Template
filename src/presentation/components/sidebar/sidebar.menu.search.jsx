import React, { PureComponent } from 'react';

export default class SideMenuSearch extends PureComponent {

	render() {
		return (
			<form className='search-form shadow-elevate' method='post'>
				<input type='text' className='textbox' placeholder='Search' />
				<button id='search' title='Search' value='' className='button'>
					<i className='material-icons search-icon'>search</i>
				</button>
			</form>
		)
	}
}