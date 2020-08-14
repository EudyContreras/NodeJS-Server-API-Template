import React, { useEffect, useState, Fragment } from 'react';
import { cssStyle, styled } from './ScrollToTop.style';
import { MaterialIcons } from '../../stores/icon.library';
import { join } from '../../appliers/style.applier';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../reducers';

interface Props {
	styling: any;
	topOffset?: number;
}

const Button = styled.div`
	${(): any => cssStyle}
`;

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
		<Button onClick={scrollToTop(topOffset)} className={showButton ? 'active' : 'inactive'}>
			{iconsLoaded ? <i className={join(...iconClasses)}>{MaterialIcons.icons.EXPAND_LESS}</i> : <Fragment />}
		</Button>
	);
};
