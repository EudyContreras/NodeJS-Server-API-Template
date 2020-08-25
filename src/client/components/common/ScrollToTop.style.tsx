import styled from 'styled-components';

export const Button = styled.div.attrs((props: { showIcon: boolean }) => ({
	opacity: props.showIcon ? '1' : '0'
}))`
	cursor: pointer;
	bottom: 0;
	right: 0;
	display: inline-flex;
	position: fixed;
	z-index: 10000;
	width: 45px;
	height: 45px;
	margin: 0 2em 1.5em 0;
	border-radius: 50%;
	will-change: transform, opacity;
	background-color: ${(props): any => props.theme.controls.colors.primary};
	box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.4);
	transition: all 0.4s ${(props): any => props.theme.easing.standardInterpolator};

	& > i {
		color: ${(props): any => props.theme.controls.colors.icon.primary};
		margin: auto;
		opacity: ${(props): any => props.opacity};
		font-size: 26px;
		transition: 0.3s transform 0.2s ${(props): any => props.theme.easing.easeInInterpolator};
	}

	&.active {
		opacity: 1;
		transform: translateY(0px);

		& > i {
			opacity: ${(props): any => props.opacity};
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

export default Button;
