
import $ from 'jquery';

abstract class IScrollListener {
	public top = 0;
	public bottom?: number = undefined;
	public margin = 0;
	public component: React.PureComponent<any> | null = null;
	abstract onScroll(scroll: number): void;
}

export class ScrollListener extends IScrollListener {

	public onFixed: ((fixed: boolean) => void) | undefined;
	public getFixedProps: (() => boolean) | undefined;

	constructor(component: React.PureComponent, sticker: HTMLElement | Element, anchor?: HTMLElement | Element | null, topMargin = 0, getFixedProps?: () => boolean, onFixed?: (fixed: boolean) => void) {
		super();
		this.component = component;
		this.top = $(sticker).offset()!.top - topMargin;
		this.margin = topMargin;
		this.onFixed = onFixed;
		this.getFixedProps = getFixedProps;

		if (anchor) {
			this.bottom = $(anchor)!.offset()!.top - $(sticker).height()!;
		}
	}

	public onScroll(scroll: number): void {
		if (this.bottom) {
			applyStickyTop(scroll, this.top, this.onFixed, this.getFixedProps);
			applyStickyBottom(scroll, this.bottom!, this.onFixed, this.getFixedProps);
		} else {
			applyStickyTop(scroll, this.top, this.onFixed, this.getFixedProps);
		}
	}
}

export default (...listeners: IScrollListener[]): void => {
	$(window).on('scroll', () => {
		for (let i = 0, len = listeners.length; i < len; i++) {
			const listener = listeners[i];
			updateEffect(listener);
		}
	});
};

export const updateEffect = (listener: IScrollListener): void => {
	const scroll = $(window).scrollTop();
	listener.onScroll(scroll!);
};

export const addAnchor = (style: any, listener: ScrollListener, stickyCallBack: (stuck: boolean) => void): void => {
	$(window).on('scroll', () => {
		const scroll = $(window).scrollTop();
  
		// const sticker = listener.sticker;

		// if (scroll! >= listener.top && !sticker.hasClass(style.navSticky)) {
		// 	sticker.addClass(style.navSticky);
		// 	stickyCallBack(true);
		// }

		// if (scroll! < listener.top && sticker.hasClass(style.navSticky)) {
		// 	sticker.removeClass(style.navSticky);
		// 	stickyCallBack(false);
		// }
	});
};

const applyStickyTop = (scroll: number, top: number, onFixed: ((fixed: boolean) => void) | undefined, getFixedProps: (() => boolean) | undefined): void => {
	const fixed = getFixedProps!();

	if (scroll! > top && !fixed) {
		if (onFixed) onFixed(true);
	} else if (top > scroll! && fixed) {
		if (onFixed) onFixed(false);
	}
};

const applyStickyBottom = (scroll: number, bottom: number, onFixed: ((fixed: boolean) => void) | undefined, getFixedProps: (() => boolean) | undefined): void => {
	const fixedBottom = getFixedProps!();
	
	if (scroll! > bottom && fixedBottom) {
		if (onFixed) onFixed(false);
	} else if (bottom > scroll! && !fixedBottom) {
		if (onFixed) onFixed(true);
	}
};