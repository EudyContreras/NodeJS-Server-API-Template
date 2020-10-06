import { DefaultTheme } from 'styled-components';

export const ApplicationTheme: DefaultTheme = {
	controls: {
		colors: {
			primary: '#373c40',
			secondary: '#373c40',
			hovered: '#484c50',
			pressed: '#484c50',
			icon: {
				primary: '#939495',
				selected: '#a5a7a8',
				unselected: '#a5a7a8',
				disabled: '#a5a7a8'
			}
		}
	},
	easing: {
		easeInInterpolator: 'cubic-bezier(0, 0, 0.25, 1)',
		easeOutInterpolator: 'cubic-bezier(0.4, 0, 1, 1)',
		standardInterpolator: 'cubic-bezier(.25, .8, .25, 1)'
	}
};
