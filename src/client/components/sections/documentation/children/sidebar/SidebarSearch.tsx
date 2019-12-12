import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import FontFaceObserver from 'fontfaceobserver';
import { join } from '../../../../utililties/react.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';

class SidebarSearch extends React.PureComponent<any, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			iconLoaded: false
		};
	}
	
	private performSearch = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		event.preventDefault();
		rippleEffect(event, this.props.styling);
	};

	public componentDidMount = (): void => {
		const font = new FontFaceObserver('Material Icons');

		font.load().then( () => {
			this.setState({
				iconLoaded: true
			});
		});
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		const classes = [style.search, style.shadowElevate];
		const buttonClasses = [MaterialIcons.CLASS, style.searchButtonIcon];

		if (!this.state.iconLoaded) {
			buttonClasses.push(style.loadable);
		} else {
			buttonClasses.push(style.loaded);
		}

		return (
			<form className={join(...classes)} method='post'>
				<label htmlFor='search'></label>
				<input type='text' name='search' id='search' aria-label='search' className={style.searchTextbox} placeholder='Search' />
				<button id='search' title='Search' value='' className={style.searchButton} onClick={this.performSearch}>
					<i className={join(...buttonClasses)}>search</i>
				</button>
			</form>
		);
	};
}

export default SidebarSearch;