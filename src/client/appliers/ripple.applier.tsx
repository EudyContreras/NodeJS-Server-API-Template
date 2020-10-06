import React from 'react';
import RippleStyle from '../styles/modules/ripple.module.scss';

const asClass = (name: string): string => `.${name}`;
const asPixels = (value: number): string => `${value}px`;

const spanElement = (name: string): HTMLSpanElement => {
	const element = document.createElement('span');
	element.classList.add(name);
	return element;
};

export const rippleStyle: any = RippleStyle;

export const useRippple = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
	const element = event.currentTarget;
	const childRipple: HTMLSpanElement | null = element.querySelector(asClass(rippleStyle.ripple));
	childRipple && element.removeChild(childRipple);

	const offset = element.getBoundingClientRect();

	const posX = offset.left;
	const posY = offset.top;

	let buttonWidth = offset.width;
	let buttonHeight = offset.height;

	if (buttonWidth >= buttonHeight) {
		buttonHeight = buttonWidth;
	} else {
		buttonWidth = buttonHeight;
	}

	const x = event.pageX - posX - buttonWidth / 2;
	const y = event.pageY - posY - buttonHeight / 2;

	const ripple = spanElement(rippleStyle.ripple);

	ripple.style.width = asPixels(buttonWidth);
	ripple.style.height = asPixels(buttonHeight);
	ripple.style.top = asPixels(y);
	ripple.style.left = asPixels(x);

	element.prepend(ripple);

	ripple.classList.add(rippleStyle.rippleEffect);
};

export default useRippple;
