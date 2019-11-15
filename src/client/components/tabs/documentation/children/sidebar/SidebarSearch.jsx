import React from 'react';

class SidebarSearch extends React.PureComponent {

		/**
	 * @param {React.MouseEvent<HTMLElement, MouseEvent>} e
	 */
	performSearch = (e) => {
		e.preventDefault();
		console.log('Search');
	};

	render() {
		return (
			<form className='search-form shadow-elevate' method='post'>
				<input type='text' className='textbox' placeholder='Search' />
				<button id='search' title='Search' value='' className='button' onClick={this.performSearch}>
					<i className='material-icons search-icon'>search</i>
				</button>
			</form>
		)
	}
}

export default SidebarSearch;