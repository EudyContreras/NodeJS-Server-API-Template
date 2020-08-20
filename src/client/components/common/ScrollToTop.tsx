import React, { useEffect, useState } from 'react';
import { Button } from './ScrollToTop.style';
import { MaterialIcons } from '../../stores/icon.library';
import { join } from '../../appliers/style.applier';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../reducers';
import { createSelector } from 'reselect';

type State = {
	fonts: Record<string, boolean>;
	topOffset: number;
	navbarHeight: number;
};

type ViewProps = {
	title: string;
	event: string;
	class: string;
};

const getSelection = createSelector<IStateTree, IStateTree, State>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree) => ({
		fonts: state.presentation.assets.fonts,
		topOffset: state.presentation.navigation.offsetTop,
		navbarHeight: state.presentation.navigation.navbarHeight
	})
);

export const ScrollToTop: React.FC = (): JSX.Element => {
	const { fonts, topOffset, navbarHeight } = getSelection(useSelector<IStateTree, IStateTree>((state) => state));
	const [showButton, setShowButton] = useState(false);
	const fontIsLoaded = fonts[MaterialIcons.name] === true;
	const iconClasses = [MaterialIcons.class];
	const offsetTop = navbarHeight - topOffset;

	const viewProps: ViewProps = {
		event: 'scroll',
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

	function scrollFunc(): void {
		if (window.scrollY > offsetTop) {
			!showButton && setShowButton(true);
		} else {
			showButton && setShowButton(false);
		}
	}

	useEffect(() => {
		window.addEventListener(viewProps.event, scrollFunc, { passive: true });
		return (): any => window.removeEventListener(viewProps.event, scrollFunc);
	}, [showButton]);

	return (
		<Button title={viewProps.title} onClick={scrollToTop} className={viewProps.class}>
			{fontIsLoaded && <i className={join(...iconClasses)}>{MaterialIcons.icons.EXPAND_LESS}</i>}
		</Button>
	);
};
