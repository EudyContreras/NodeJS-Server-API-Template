import React, { createRef, RefObject } from 'react';
import axios from 'axios';
import rippleEffect from '../../../../../appliers/ripple.applier';
import FontFaceObserver from 'fontfaceobserver';
import { join } from '../../../../utililties/react.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';

class SidebarSearch extends React.PureComponent<any, any> {

	private _isMounted: boolean;
	private inputRef: RefObject<HTMLInputElement>;

	constructor(props: any) {
		super(props);
		this._isMounted = false;
		this.inputRef = createRef();
		this.state = {
			iconLoaded: false
		};
	}
	
	private performSearch = async (event: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
		event.preventDefault();

		rippleEffect(event, this.props.styling);

		const data = {
			data: { searchText: this.inputRef.current!.value },
			params: { searchText: this.inputRef.current!.value }
		};
		console.log(data);
		try {
			await axios.get('http://localhost:5000/rest/api/search', data);
		} catch(error) {
			console.log(error);
		}
	};

	public componentWillUnmount = (): void => {
		this._isMounted = false;
	};
	
	public componentDidMount = (): void => {
		this._isMounted = true;
		const font = new FontFaceObserver('Material Icons');

		font.load().then( () => {
			if (this._isMounted) {
				this.setState({
					iconLoaded: true
				});
			}
		});
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		const classes = [style.search, style.shadowElevate];
		const iconsClasses = [MaterialIcons.class, style.searchButtonIcon];

		if (!this.state.iconLoaded) {
			iconsClasses.push(style.loadable);
		} else {
			iconsClasses.push(style.loaded);
		}

		return (
			<form className={join(...classes)} method='post'>
				<label htmlFor='search'></label>
				<input key='search-input' ref={this.inputRef} type='text' name='search' aria-label='search' className={style.searchTextbox} placeholder='Search' />
				<button id='search' title='Search' value='' className={style.searchButton} onClick={this.performSearch}>
					<i className={join(...iconsClasses)}>search</i>
				</button>
			</form>
		);
	};
}

export default SidebarSearch;