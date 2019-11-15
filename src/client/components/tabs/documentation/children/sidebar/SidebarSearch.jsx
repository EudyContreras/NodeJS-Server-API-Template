import React from 'react';
import Style from './styles/SidebarSearch.style.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

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
			<form className={Style.searchForm} method='post'>
				<input type='text' className={Style.searchTextbox} placeholder='Search' />
				<button id='search' title='Search' value='' className={Style.searchButton} onClick={this.performSearch}>
					<i className={['material-icons', Style.searchIcon]}>search</i>
				</button>
			</form>
		)
	}
}

export default withStyles(Style)(SidebarSearch);