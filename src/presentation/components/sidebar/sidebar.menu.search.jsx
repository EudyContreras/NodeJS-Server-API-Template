import React, { PureComponent } from 'react';

export default class SideMenuSearch extends PureComponent {
	
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		console.log('this is:', this);
	 }
	 
	render() {

		return (
			<form className='search-form shadow-elevate' method='post'>
				<input type='text' className='textbox' placeholder='Search' />
				<div title='Search' value='' type='submit' className='button' onClick={this.handleClick}>
					<i className='material-icons search-icon'>search</i>
				</div>
			</form>
		)
	}
}