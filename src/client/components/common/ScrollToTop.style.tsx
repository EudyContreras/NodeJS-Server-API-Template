import { css } from 'styled-components';

export const cssStyle = css`
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

	i {
		color: ${(props): any => props.theme.controls.colors.icon.primary};
		font-size: 26px;
	}

	&.active {
		opacity: 1;
		transform: translateY(0px);

		i {
			transform: translateY(0);
			transition: 0.3s all 0.2s ${(props): any => props.theme.easing.easeInInterpolator};
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

		i {
			transform: translateY(6px);
		}
	}
`;

export default cssStyle;
