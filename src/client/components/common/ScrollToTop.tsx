/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { cssStyle } from './ScrollToTop.style';
import { MaterialIcons } from '../../stores/icon.library';
import { join } from '../../appliers/style.applier';

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
	const toggleIconClasses = [MaterialIcons.class, styling.expandIcon];

	const scrollFunc = (): void => {
		if (window.scrollY > topOffset) {
			!showButton && setShowButton(true);
		} else {
			showButton && setShowButton(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollFunc);
		return (): any => {
			window.removeEventListener('scroll', scrollFunc);
		};
	}, [showButton, topOffset]);

	return (
		<div css={cssStyle} onClick={scrollToTop(topOffset)} className={showButton ? 'active' : 'inactive'}>
			<i className={join(...toggleIconClasses)}>{MaterialIcons.icons.EXPAND_MORE}</i>
		</div>
	);
};
