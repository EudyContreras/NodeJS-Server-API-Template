import React, { useState } from 'react';
import { createSelector } from 'reselect';
import { Button } from './ScrollToTop.style';
import { MaterialIcons } from '../../stores/icon.library';
import { join } from '../../appliers/style.applier';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../reducers';

type Selection = {
	isFixed: boolean;
	topOffset: number;
	navbarHeight: number;
	fontsLoaded: boolean;
};

type ViewProps = {
	title: string;
	class: string;
};

const getSelection = createSelector<IStateTree, IStateTree, Selection>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree) => ({
		isFixed: state.presentation.navigation.anchored,
		topOffset: state.presentation.navigation.offsetTop,
		navbarHeight: state.presentation.navigation.navbarHeight,
		fontsLoaded: state.presentation.assets.fonts[MaterialIcons.name] === true
	})
);

export const ScrollToTop: React.FC = React.memo(
	(): JSX.Element => {
		const { fontsLoaded, isFixed, topOffset, navbarHeight } = useSelector<IStateTree, Selection>(getSelection);
		const [showButton, setShowButton] = useState(false);
		const iconClasses = [MaterialIcons.class];
		const offsetTop = navbarHeight - topOffset;

		const viewProps: ViewProps = {
			title: 'Scroll to top',
			class: showButton ? 'active' : 'inactive'
		};

		function scrollToTop(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
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
			<Button title={viewProps.title} onClick={scrollToTop} showIcon={fontsLoaded} className={viewProps.class}>
				<i className={join(...iconClasses)}>{MaterialIcons.icons.EXPAND_LESS}</i>
			</Button>
		);
	}
);
