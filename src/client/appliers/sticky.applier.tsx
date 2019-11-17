
import $ from 'jquery';

interface IScrollListener {
   onScroll(style: any, scroll: number): void
}

export class ScrollListener implements IScrollListener {
   public top: number;
   public bottom?: number;
   public margin: number;

   public sticker: JQuery<HTMLElement>;
   public anchor?: JQuery<HTMLElement>;

   constructor(sticker: HTMLElement, anchor?: HTMLElement | null, topMargin: number = 0) {
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
   $(window).on('scroll', () => {
      const scroll = $(window).scrollTop();
      for (var i = 0, len = listeners.length; i < len; i++) {
         const listener = listeners[i];
         listener.onScroll(style, scroll!)
      }
   });
}


export const addAnchor = (style: any, listener: ScrollListener, stickyCallBack: (stuck: boolean) => void) => {
   $(window).on('scroll', () => {
      const scroll = $(window).scrollTop();
  
      const sticker = listener.sticker;

      if (scroll! >= listener.top && !sticker.hasClass(style.navSticky)) {
         sticker.addClass(style.navSticky);
         stickyCallBack(true);
      }

      if (scroll! < listener.top && sticker.hasClass(style.navSticky)) {
         sticker.removeClass(style.navSticky);
         stickyCallBack(false);
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