import React, { PureComponent } from 'react';
import config from '../../config';

const classes = { }

export default class SideMenuSearch extends PureComponent {
	
	render() {

		return (
			<form class='search-form shadow-elevate' method='post'>
				<input type='text' class='textbox' placeholder='Search' />
				<div title='Search' value='' type='submit' class='button'>
					<i class='material-icons search-icon'>search</i>
				</div>
			</form>
		)
	}
}