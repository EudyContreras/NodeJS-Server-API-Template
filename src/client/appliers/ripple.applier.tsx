import React from 'react';
import $ from 'jquery';

const asClass = (name: string): string => '.'+name;

const spanElement = (name: string): Element => {
	const element = document.createElement('span');
	element.classList.add(name);
	return element;
};

export default (event: React.MouseEvent<HTMLElement, MouseEvent>, style: any): void => {
	$(asClass(style.ripple)).remove();

	const element = event.currentTarget;
	const offset = element.getBoundingClientRect();

	const posX = offset.left;
	const posY = offset.top;

	let buttonWidth = offset.width;
	let buttonHeight = offset.height;

	const ripple = spanElement(style.ripple);
 
	element.prepend(ripple);

	if (buttonWidth >= buttonHeight) {
		buttonHeight = buttonWidth;
	} else {
		buttonWidth = buttonHeight;
	}

	const x = event.pageX - posX - buttonWidth / 2;
	const y = event.pageY - posY - buttonHeight / 2;

	$(asClass(style.ripple)).css({
		width: buttonWidth,
		height: buttonHeight,
		top: y,
		left: x
	}).addClass(style.rippleEffect);
};