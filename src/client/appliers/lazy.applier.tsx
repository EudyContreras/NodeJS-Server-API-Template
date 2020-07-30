const offset = 500;

const options = {
	threshold: 0.01,
	rootMargin: '75%'
};

const inBounds = (image: any): boolean =>
	image.getBoundingClientRect().top <= window.innerHeight + offset && image.getBoundingClientRect().bottom >= 0 && getComputedStyle(image).display !== 'none';

export const lazyClass = 'lazily-loaded-image';

export function registerLazyImageLoading(throttleThreshold = 20): void {
	const selectorName = `.${lazyClass}`;

	const lazyImages = [].slice.call(document.querySelectorAll(selectorName));

	if (window.IntersectionObserver) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting || entry.intersectionRatio > 0) {
					const image: any = entry.target;

					if (image.dataset.srcset) image.srcset = image.dataset.srcset;
					if (image.dataset.srcset) image.srcset = image.dataset.srcset;
					image.classList.remove(lazyClass);
					observer.unobserve(image);
				}
			});
		}, options);

		lazyImages.forEach((image) => {
			observer.observe(image);
		});
	} else {
		let throttleTimeout;
		let lazyImages = [].slice.call(document.querySelectorAll(selectorName));

		const lazyload = (): void => {
			if (throttleTimeout) {
				clearTimeout(throttleTimeout);
			}

			throttleTimeout = setTimeout(() => {
				const scrollTop = window.pageYOffset;
				lazyImages.forEach((image: any) => {
					if (image.offsetTop < window.innerHeight + (scrollTop + offset) || inBounds(image)) {
						if (image.dataset.src) image.src = image.dataset.src;
						if (image.dataset.srcset) image.srcset = image.dataset.srcset;
						image.classList.remove(lazyClass);
						lazyImages = [].slice.call(document.querySelectorAll(selectorName));
					}
				});
				if (lazyImages.length === 0) {
					document.removeEventListener('scroll', lazyload);
					window.removeEventListener('resize', lazyload);
					window.removeEventListener('orientationChange', lazyload);
				}
			}, throttleThreshold);
		};

		document.addEventListener('scroll', lazyload);
		window.addEventListener('resize', lazyload);
		window.addEventListener('orientationChange', lazyload);
	}
}
