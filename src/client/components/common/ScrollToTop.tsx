import React, { useState } from 'react';
import { Button } from './ScrollToTop.style';
import { MaterialIcons } from '../../stores/icon.library';
import { join } from '../../appliers/style.applier';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../reducers';
import { createSelector } from 'reselect';

type State = {
	fonts: Record<string, boolean>;
	isFixed: boolean;
	topOffset: number;
	navbarHeight: number;
};

type ViewProps = {
	title: string;
	class: string;
};

const getSelection = createSelector<IStateTree, IStateTree, State>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree) => ({
		fonts: state.presentation.assets.fonts,
		isFixed: state.presentation.navigation.anchored,
		topOffset: state.presentation.navigation.offsetTop,
		navbarHeight: state.presentation.navigation.navbarHeight
	})
);

export const ScrollToTop: React.FC = (): JSX.Element => {
	const { fonts, isFixed, topOffset, navbarHeight } = useSelector<IStateTree, State>(getSelection);
	const [showButton, setShowButton] = useState(false);
	const fontIsLoaded = fonts[MaterialIcons.name] === true;
	const iconClasses = [MaterialIcons.class];
	const offsetTop = navbarHeight - topOffset;

	const viewProps: ViewProps = {
		title: 'Scroll to top',
		class: showButton ? 'active' : 'inactive'
	};

	function scrollToTop(): void {
		const top = document.documentElement.scrollTop || document.body.scrollTop;
		if (top > offsetTop) {
			window.scroll({
				top: offsetTop,
				behavior: 'smooth'
			});
		}
	}

	if (isFixed) {
		!showButton && setShowButton(true);
	} else {
		showButton && setShowButton(false);
	}

	return (
		<Button title={viewProps.title} onClick={scrollToTop} className={viewProps.class}>
			{fontIsLoaded && <i className={join(...iconClasses)}>{MaterialIcons.icons.EXPAND_LESS}</i>}
		</Button>
	);
};
