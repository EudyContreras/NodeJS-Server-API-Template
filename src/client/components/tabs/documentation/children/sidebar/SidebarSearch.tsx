import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';

class SidebarSearch extends React.PureComponent<any, any> {

	constructor(props: any) {
		super(props)
	}
	
	performSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		event.preventDefault();
		rippleEffect(event, this.props.styling);
	};

	render() {
		const style = this.props.styling;
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

export default SidebarSearch;