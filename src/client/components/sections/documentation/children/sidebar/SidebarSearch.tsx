import React, { createRef, RefObject } from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import FontFaceObserver from 'fontfaceobserver';
import { connect } from 'react-redux';
import { IStateTree } from '../../../../../reducers';
import { join } from '../../../../utililties/react.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { DispatchProps, Dispatchers } from '../../../../../actions/documentation/search.action';

interface StateProps {
	searchError?: any | undefined | null;
	searchResults: any[];
	isSearching: boolean;
	iconLoaded: boolean;
}

type Props = StateProps & DispatchProps & any;

class SidebarSearch extends React.PureComponent<Props, any> {
	private _isMounted: boolean;
	private inputRef: RefObject<HTMLInputElement>;

	constructor(props: any) {
		super(props);
		this._isMounted = false;
		this.inputRef = createRef();
		this.state = {
			isSearching: false,
			iconLoaded: false
		};
	}

	private performSearch = async (event: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
		event.preventDefault();

		rippleEffect(event, this.props.styling);

		const searchText = this.inputRef.current!.value;

		this.props.performSearch(searchText);
	};

	public componentWillUnmount = (): void => {
		this._isMounted = false;
	};

	public componentDidMount = (): void => {
		this._isMounted = true;
		new FontFaceObserver('Material Icons')
			.load(null, 5000)
			.then(() => {
				if (this._isMounted) {
					this.setState({
						iconLoaded: true
					});
				}
			})
			.catch((error) => {
				console.log('Something went wrong!', error);
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
			<form className={join(...classes)} method="post">
				<label htmlFor="search"></label>
				<input key="search-input" ref={this.inputRef} type="text" name="search" aria-label="search" className={style.searchTextbox} placeholder="Search" />
				<div id="search" title="Search" className={style.searchButton} onClick={this.performSearch}>
					<i className={join(...iconsClasses)}>search</i>
				</div>
			</form>
		);
	};
}

const mapStateToProps = (state: IStateTree & any): any => ({
	isSearching: state.presentation.documentation.sidebar.searchbar.isLoading,
	searchResults: state.presentation.documentation.sidebar.searchbar.searchResults,
	searchError: state.presentation.documentation.sidebar.searchbar.error
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(SidebarSearch);
