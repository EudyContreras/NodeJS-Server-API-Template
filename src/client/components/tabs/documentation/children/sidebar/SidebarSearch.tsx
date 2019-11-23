import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import { join } from '../../../../utililties/styling.utils';

class SidebarSearch extends React.PureComponent<any, any> {

	constructor(props: any) {
		super(props);
	}
	
	private performSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		event.preventDefault();
		rippleEffect(event, this.props.styling);
	}

	public render(): JSX.Element {
		const style = this.props.styling;

		const menuState = this.props.menuState;

		const classes = [style.search, style.shadowElevate];

		if (!menuState.expanded) {
			if (menuState.hovered) {
				//classes.push(style.staggerOut);
			} else {
				//classes.push(style.staggerIn);
			}
		}
		return (
			<form className={join(...classes)} method='post'>
				<input type='text' className={style.searchTextbox} placeholder='Search' />
				<button id='search' title='Search' value='' className={style.searchButton} onClick={this.performSearch}>
					<i className={`material-icons ${style.searchButtonIcon}`}>search</i>
				</button>
			</form>
		);
	}
}

export default SidebarSearch;