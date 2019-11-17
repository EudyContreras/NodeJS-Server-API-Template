
import $ from 'jquery';

interface IScrollListener {
   onScroll(style: any, scroll: number): void
}

export class ScrollListener implements IScrollListener {
   private top: number;
   private bottom?: number;
   private margin: number;

   private sticker: JQuery<HTMLElement>;
   private anchor?: JQuery<HTMLElement>;

   constructor(sticker: HTMLElement, anchor?: HTMLElement, topMargin: number = 0) {
      this.sticker = $(sticker);
      this.top = this.sticker.offset()!.top - topMargin;
      this.margin = topMargin;

      if (anchor) {
         this.anchor = $(anchor);
         this.bottom = this.anchor!.offset()!.top - this.sticker.height()!;
      }
   }

   onScroll(style: any, scroll: number): void {
      if (this.anchor) {
         applyStickyTop(this.sticker, style, scroll, this.top, this.margin);
         applyStickyBottom(this.sticker, style, scroll, this.bottom!, this.margin);
      } else {
         applyStickyTop(this.sticker, style, scroll, this.top, this.margin)
      }
   }
}

export default (style: any, ...listeners: IScrollListener[]) => {
   $(window).scroll(x => {
      const scroll = $(window).scrollTop();
      for (var i = 0, len = listeners.length; i < len; i++) {
         const listener = listeners[i];
         listener.onScroll(style, scroll!)
      }
   });
}

const applyStickyTop = (sticker: JQuery<HTMLElement>, style: any, scroll: number, top: number, margin: number) => {

   if (scroll! > top && sticker.hasClass(style.natural)) {
      sticker.removeClass(style.natural).addClass(style.fixed).css({ top: margin });
   } else if (top > scroll! && sticker.hasClass(style.fixed)) {
      sticker.removeClass(style.fixed).addClass(style.natural).css({ top: 'auto' });
   }
}

const applyStickyBottom = (sticker: JQuery<HTMLElement>, style: any, scroll: number, bottom: number, margin: number) => {
   if (scroll! > bottom && sticker.hasClass(style.fixed)) {
      sticker.removeClass(style.fixed).addClass(style.bottom).css({ top: bottom });
   } else if (bottom > scroll! && sticker.hasClass(style.bottom)) {
      sticker.removeClass(style.bottom).addClass(style.fixed).css({ top: margin });
   }
}