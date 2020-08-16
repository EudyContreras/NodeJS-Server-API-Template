import React, { useEffect, useState, Fragment } from 'react';
import { Button } from './ScrollToTop.style';
import { throttle } from 'lodash';
import { MaterialIcons } from '../../stores/icon.library';
import { join } from '../../appliers/style.applier';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../reducers';

interface Props {
	styling: any;
	topOffset?: number;
}

const scrollToTop = (topOffset) => (): void => {
	const top = document.documentElement.scrollTop || document.body.scrollTop;
	if (top > topOffset) {
		window.scroll(0, topOffset);
	}
};

export const ScrollToTop: React.FC<Props> = ({ styling, topOffset = 65 }: Props): JSX.Element => {
	const [showButton, setShowButton] = useState(false);
	const iconsLoaded = useSelector<IStateTree>((state) => state.presentation.assets.fonts[MaterialIcons.name] === true);
	const iconClasses = [MaterialIcons.class];

	useEffect(() => {
		const scrollFunc = throttle((): void => {
			if (window.scrollY > topOffset) {
				!showButton && setShowButton(true);
			} else {
				showButton && setShowButton(false);
			}
		}, 150);

		window.addEventListener('scroll', scrollFunc, { passive: true });

		return (): any => window.removeEventListener('scroll', scrollFunc);
	}, [showButton]);

	return (
		<Button onClick={scrollToTop(topOffset)} className={showButton ? 'active' : 'inactive'}>
			{iconsLoaded ? <i className={join(...iconClasses)}>{MaterialIcons.icons.EXPAND_LESS}</i> : <Fragment />}
		</Button>
	);
};
