
import $ from 'jquery';
import { on } from 'cluster';

interface IScrollListener {
   onScroll(style: any, scroll: number): void;
}

export class ScrollListener implements IScrollListener {
   public top: number;
   public bottom?: number;
   public margin: number;
   public onFixed: ((fixed: boolean) => void) | undefined;

   public sticker: JQuery<HTMLElement | Element>;
   public anchor?: JQuery<HTMLElement | Element>;

   constructor(sticker: HTMLElement | Element, anchor?: HTMLElement | Element | null, topMargin: number = 0, onFixed?: (fixed: boolean) => void) {
      this.sticker = $(sticker);
      this.top = this.sticker.offset()!.top - topMargin;
      this.margin = topMargin;
      this.onFixed = onFixed;

      if (anchor) {
         this.anchor = $(anchor);
         this.bottom = this.anchor!.offset()!.top - this.sticker.height()!;
      }
   }

   public onScroll(style: any, scroll: number): void {
      if (this.anchor) {
         applyStickyTop(this.sticker, style, scroll, this.top, this.margin, this.onFixed);
         applyStickyBottom(this.sticker, style, scroll, this.bottom!, this.margin, this.onFixed);
      } else {
         applyStickyTop(this.sticker, style, scroll, this.top, this.margin, this.onFixed);
      }
   }
}

export default (style: any, ...listeners: IScrollListener[]) => {
   $(window).on('scroll', () => {
      const scroll = $(window).scrollTop();
      for (var i = 0, len = listeners.length; i < len; i++) {
         const listener = listeners[i];
         listener.onScroll(style, scroll!);
      }
   });
};


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
};

const applyStickyTop = (sticker: JQuery<HTMLElement | Element>, style: any, scroll: number, top: number, margin: number, onFixed: ((fixed: boolean) => void) | undefined) => {

   if (scroll! > top && sticker.hasClass(style.natural)) {
      sticker.removeClass(style.natural).addClass(style.fixed).css({ top: margin });
      if (onFixed) onFixed(true);
   } else if (top > scroll! && sticker.hasClass(style.fixed)) {
      sticker.removeClass(style.fixed).addClass(style.natural).css({ top: 'auto' });
      if (onFixed) onFixed(false);
   }
};

const applyStickyBottom = (sticker: JQuery<HTMLElement | Element>, style: any, scroll: number, bottom: number, margin: number, onFixed: ((fixed: boolean) => void) | undefined) => {
   if (scroll! > bottom && sticker.hasClass(style.fixed)) {
      sticker.removeClass(style.fixed).addClass(style.bottom).css({ top: bottom });
      if (onFixed) onFixed(false);
   } else if (bottom > scroll! && sticker.hasClass(style.bottom)) {
      sticker.removeClass(style.bottom).addClass(style.fixed).css({ top: margin });
      if (onFixed) onFixed(true);
   }
};