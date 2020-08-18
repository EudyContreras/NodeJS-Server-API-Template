import React, { useRef } from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import { useSelector, useDispatch } from 'react-redux';
import { IStateTree } from '../../../../../reducers';
import { join } from '../../../../utililties/react.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { performSearchAction } from '../../../../../actions/documentation/search.action';

type StateProps = {
	styling: any;
	menuState?: any;
};

const elementProps = {
	formMethod: 'post',
	inputType: 'text',
	inputName: 'search',
	inputTitle: 'Search',
	inputKey: 'search-input'
};

const SidebarSearch: React.FC<StateProps> = React.memo(
	({ styling }: StateProps): JSX.Element => {
		const dispatch = useDispatch();
		const inputRef = useRef<HTMLInputElement>(null);

		const formClasses = [styling.search, styling.shadowElevate];
		const iconsClasses = [MaterialIcons.class, styling.searchButtonIcon];
		const iconsLoaded = useSelector<IStateTree>((state) => state.presentation.assets.fonts[MaterialIcons.name] === true);

		const performSearch = async (event: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> => {
			event.preventDefault();

			rippleEffect(event, styling);

			performSearchAction(inputRef.current!.value)(dispatch);
		};

		if (!iconsLoaded) {
			iconsClasses.push(styling.pendingIcon);
		}

		const formClassName = join(...formClasses);
		const iconClassName = join(...iconsClasses);

		return (
			<form className={formClassName} method={elementProps.formMethod}>
				<label htmlFor={elementProps.inputName}></label>
				<input
					ref={inputRef}
					key={elementProps.inputKey}
					type={elementProps.inputType}
					name={elementProps.inputName}
					aria-label={elementProps.inputName}
					className={styling.searchTextbox}
					placeholder={elementProps.inputTitle}
				/>
				<div id={elementProps.inputName} title={elementProps.inputTitle} className={styling.searchButton} onClick={performSearch}>
					<i className={iconClassName}>search</i>
				</div>
			</form>
		);
	}
);

export default SidebarSearch;
