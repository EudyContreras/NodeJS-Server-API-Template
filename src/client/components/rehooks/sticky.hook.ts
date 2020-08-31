import { RefObject, useState, useEffect } from 'react';

export const useSticky = <T extends HTMLElement>(ref: RefObject<T>, offset = 15): boolean => {
	const [isSticky, setSticky] = useState(false);

	useEffect(() => {
		const element = ref.current!;

		const body = document.body;
		const topOffset = -(element.clientHeight - offset);

		const scroll = body.getBoundingClientRect().top;
		const scrollTop = element.getBoundingClientRect().top;

		const topPosition = 65;

		const onScroll = (): void => {
			const scroll = (document.body.scrollTop || document.documentElement.scrollTop || 0) - 65;

			if (scroll >= topPosition) {
				if (!isSticky) setSticky(true);
			}

			if (scroll < topPosition) {
				if (isSticky) setSticky(false);
			}
			console.log('Sticky: ', isSticky, ' Scroll: ', scroll);
		};

		window.addEventListener('scroll', onScroll, {
			capture: true,
			passive: true
		});

		return (): any => window.removeEventListener('scroll', onScroll);
	}, [ref]);

	return isSticky;
};
