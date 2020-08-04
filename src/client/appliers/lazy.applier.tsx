const offset = 1000;

const options = {
	rootMargin: `${offset}px 0px ${offset}px 0px`,
	threshold: 0.1
};

const inBounds = (image: any): boolean =>
	image.getBoundingClientRect().top <= window.innerHeight + offset && image.getBoundingClientRect().bottom >= 0 && getComputedStyle(image).display !== 'none';

export const lazyClass = 'lazily-loaded-image';

const loadImage = ({ src, srcSet }: ImageProps, decode = true): Promise<{ imageUrl; imageSet }> => {
	const image = new Image();
	if (srcSet) image.srcset = srcSet;
	if (src) image.src = src;
	if (decode)
		return image
			.decode()
			.then(() => Promise.resolve({ imageUrl: src, imageSet: srcSet }))
			.catch((encodingError: Error) => Promise.reject(encodingError));

	return new Promise((resolve, reject) => {
		image.onload = (): void => {
			resolve({ imageUrl: src, imageSet: srcSet });
		};
		image.onerror = (): void => {
			reject(Error(''));
		};
	});
};

export function registerLazyImageLoading(throttleThreshold = 20): void {
	const selectorName = `.${lazyClass}`;

	const lazyImages = [].slice.call(document.querySelectorAll(selectorName));

	if (window.IntersectionObserver) {
		const observer = new IntersectionObserver((entries) => {
			for (let i = 0, len = entries.length; i < len; i++) {
				const entry = entries[i];
				if (entry.intersectionRatio > 0) {
					const image: any = entry.target;
					const src = image.dataset.src;
					const srcSet = image.dataset.srcset;

					loadImage({ src, srcSet })
						.then(() => {
							image.src = image.dataset.src;
							image.srcset = image.dataset.srcset;
							image.dataset.src = null;
							image.dataset.srcset = null;
						})
						.catch(() => {});
					image.classList.remove(lazyClass);
					observer.unobserve(image);
				}
			}
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
						image.src = image.dataset.src;
						image.srcset = image.dataset.srcset;
						image.dataset.src = null;
						image.dataset.srcset = null;
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
