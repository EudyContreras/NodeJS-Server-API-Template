import React from 'react';
import style from './styles/SidebarSearch.style.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import rippleEffect from '../../../../../appliers/ripple.applier';

class SidebarSearch extends React.PureComponent {

	/**
	 * @param {React.MouseEvent<HTMLElement, MouseEvent>} event
	 */
	performSearch = (event) => {
		event.preventDefault();
		rippleEffect(event, style);
	};

	render() {
		return (
			<form className={`${style.search} ${style.shadowElevate}`} method='post'>
				<input type='text' className={style.searchTextbox} placeholder='Search' />
				<button id='search' title='Search' value='' className={style.searchButton} onClick={this.performSearch}>
					<i className={`material-icons ${style.searchButtonIcon}`}>search</i>
				</button>
			</form>
		)
	}
}

export default withStyles(style)(SidebarSearch);