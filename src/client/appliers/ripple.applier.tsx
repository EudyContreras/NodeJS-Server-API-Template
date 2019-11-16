import React from 'react'
import $ from 'jquery';

export default (event: React.MouseEvent<HTMLElement, MouseEvent>, style: any) => {
   $(asClass(style.ripple)).remove();

   const element = event.currentTarget;
   const offset = element.getBoundingClientRect();

   const posX = offset.left;
   const posY = offset.top;

   var buttonWidth = offset.width;
   var buttonHeight = offset.height;

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
}