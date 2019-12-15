import React, { createRef, RefObject } from 'react';
import axios from 'axios';
import rippleEffect from '../../../../../appliers/ripple.applier';
import FontFaceObserver from 'fontfaceobserver';
import { join } from '../../../../utililties/react.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';

class SidebarSearch extends React.PureComponent<any, any> {

	private inputRef: RefObject<HTMLInputElement>;

	constructor(props: any) {
		super(props);
		this.inputRef = createRef();
		this.state = {
			iconLoaded: false
		};
	}
	
	private performSearch = async (event: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
		event.preventDefault();

		rippleEffect(event, this.props.styling);

		try {
			const response = await axios.get('http://localhost:5000/rest/api/search', {
				data: { searchText: this.inputRef.current!.value },
				params: { searchText: this.inputRef.current!.value }
			});
			console.log(response);
		} catch(error) {
			console.log(error);
		}
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
		const iconsClasses = [MaterialIcons.CLASS, style.searchButtonIcon];

		if (!this.state.iconLoaded) {
			iconsClasses.push(style.loadable);
		} else {
			iconsClasses.push(style.loaded);
		}

		return (
			<form className={join(...classes)} method='post'>
				<label htmlFor='search'></label>
				<input ref={this.inputRef} type='text' name='search' id='search' aria-label='search' className={style.searchTextbox} placeholder='Search' />
				<button id='search' title='Search' value='' className={style.searchButton} onClick={this.performSearch}>
					<i className={join(...iconsClasses)}>search</i>
				</button>
			</form>
		);
	};
}

export default SidebarSearch;