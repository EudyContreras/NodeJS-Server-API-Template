import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '../../stores/icon.library';
import { join } from '../../appliers/style.applier';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../reducers';

interface Props {
	styling: any;
	topOffset?: number;
}

const Button = styled.div`
	cursor: pointer;
	bottom: 0;
	right: 0;
	display: inline-flex;
	position: fixed;
	z-index: 10000;
	width: 45px;
	height: 45px;
	margin: 0 3em 2.5em 0;
	border-radius: 50%;
	will-change: transform, opacity;
	background-color: ${(props): any => props.theme.controls.colors.primary};
	box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.4);
	transition: all 0.4s ${(props): any => props.theme.easing.standardInterpolator};

	& > i {
		color: ${(props): any => props.theme.controls.colors.icon.primary};
		margin: auto;
		opacity: 0;
		font-size: 26px;
		transition: 0.3s transform 0.2s ${(props): any => props.theme.easing.easeInInterpolator};
	}

	&.active {
		opacity: 1;
		transform: translateY(0px);

		& > i {
			opacity: 1;
			transform: translateY(0);
		}

		&:hover {
			transform: scale(1.1);
			box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
			background-color: ${(props): any => props.theme.controls.colors.hovered};
			transition: all 0.8s ${(props): any => props.theme.easing.standardInterpolator};
		}

		&:active {
			transform: scale(0.9);
			box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.1);
		}
	}

	&.inactive {
		opacity: 0.2;
		clip-path: inset(0);
		transform: translateY(100px) scale(0.5, 1.2);

		& > i {
			opacity: 0;
			transform: translateY(6px);
		}
	}
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
