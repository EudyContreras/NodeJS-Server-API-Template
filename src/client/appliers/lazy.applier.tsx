const config = {
	offset: 1000,
	foldLoadDelay: 2500,
	foldLoadInterval: 200
};

const attributes = {
	SRC: 'data-src',
	SRC_SET: 'data-srcset'
};

const options = {
	rootMargin: `${config.offset}px 0px ${config.offset}px 0px`,
	threshold: 0.1
};

export const lazyClass = 'lazily-loaded-image';

const selectorName = `.${lazyClass}`;

const inBounds = (image: any): boolean =>
	image.getBoundingClientRect().top <= window.innerHeight + config.offset &&
	image.getBoundingClientRect().bottom >= 0 &&
	getComputedStyle(image).display !== 'none';

const applyOnSource = (source: HTMLSourceElement): void => {
	source.srcset = source.dataset.srcset || '';
	source.removeAttribute(attributes.SRC_SET);
};
const applyOnImage = (image: HTMLImageElement): void => {
	image.src = image.dataset.src || '';
	image.srcset = image.dataset.srcset || '';
	image.removeAttribute(attributes.SRC);
	image.removeAttribute(attributes.SRC_SET);
};

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
			reject(Error(`Could not load the image for: ${src}`));
		};
	});
};

/**
 *
 * @param element The current element to extract images and sources from
 * @param delay
 */
const loadImagesBelowFold = (element: HTMLElement | null, delay: number): void => {
	if (!element) {
		return;
	}

	let src = element.dataset.src || '';
	let srcSet = element.dataset.srcset || '';

	if (element instanceof HTMLPictureElement) {
		const sources: HTMLSourceElement[] | null = [].slice.call(element.querySelectorAll('source'));
		const images: HTMLImageElement[] | null = [].slice.call(element.querySelectorAll('img'));

		src = images[0].dataset.src || '';
		srcSet = sources[0].dataset.srcset || images[0].dataset.srcset || '';
	}

	loadImage({ src, srcSet })
		.then(() => {
			const lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll(selectorName));
			const currentImage = lazyImages.length > 0 && lazyImages.shift();
			if (currentImage) {
				currentImage.classList.remove(lazyClass);
				applyOnImage(currentImage);
			}
			if (lazyImages.length > 0) {
				const nextImage = lazyImages.shift();
				if (nextImage) {
					setTimeout(() => {
						loadImagesBelowFold(nextImage, delay);
					}, delay);
				}
			}
		})
		.catch((error) => console.log(error));
};

export function registerLazyImageLoading({
	throttleThreshold = 20,
	useNativeLoading = false,
	loadBelowFold = true,
	decodeImages = true
}: {
	throttleThreshold: number;
	useNativeLoading: boolean;
	loadBelowFold: boolean;
	decodeImages: boolean;
}): void {
	const lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll(selectorName));

	if ('loading' in HTMLImageElement.prototype && useNativeLoading) {
		lazyImages.forEach((element: HTMLElement) => {
			element.classList.remove(lazyClass);
			if (element instanceof HTMLPictureElement) {
				const sources: HTMLSourceElement[] | null = [].slice.call(element.querySelectorAll('source'));
				const images: HTMLImageElement[] | null = [].slice.call(element.querySelectorAll('img'));
				if (sources) {
					sources.forEach(applyOnSource);
				}
				if (images) {
					images.forEach((image) => {
						image.setAttribute('loading', 'lazy');
						applyOnImage(image);
					});
				}
			} else {
				if (element instanceof HTMLImageElement) {
					applyOnImage(element);
				}
			}
		});
		return;
	}
	if (window.IntersectionObserver) {
		const observer = new IntersectionObserver((entries) => {
			for (let i = 0, len = entries.length; i < len; i++) {
				const entry = entries[i];
				if (entry.intersectionRatio > 0) {
					const element: any = entry.target;

					element.classList.remove(lazyClass);

					if (element instanceof HTMLPictureElement) {
						const sources: HTMLSourceElement[] | null = [].slice.call(element.querySelectorAll('source'));
						const images: HTMLImageElement[] | null = [].slice.call(element.querySelectorAll('img'));
						sources && sources.forEach(applyOnSource);
						images && images.forEach(applyOnImage);
					} else if (element instanceof HTMLImageElement) {
						if (decodeImages) {
							const src = element.dataset.src || '';
							const srcSet = element.dataset.srcset || '';

							loadImage({ src, srcSet }, decodeImages)
								.then(() => {
									applyOnImage(element);
								})
								.catch((error) => console.log(error));
						} else {
							applyOnImage(element);
						}
					}

					observer.unobserve(element);
				}
			}
		}, options);

		lazyImages.forEach((image) => {
			observer.observe(image);
		});

		if (loadBelowFold) {
			setTimeout(() => {
				const lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll(selectorName));
				if (lazyImages.length > 0) {
					const image = lazyImages.shift();
					image && loadImagesBelowFold(image, config.foldLoadInterval);
				}
			}, config.foldLoadDelay);
		}
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
					if (image.offsetTop < window.innerHeight + (scrollTop + config.offset) || inBounds(image)) {
						applyOnImage(image);
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
