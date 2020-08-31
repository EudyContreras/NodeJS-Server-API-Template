const config = {
	offset: 1000,
	foldLoadDelay: 1200,
	foldLoadInterval: 70
};

const attributes = {
	SRC: 'data-src',
	SRC_SET: 'data-srcset'
};

const options = {
	rootMargin: `${config.offset}px 0px ${config.offset}px 0px`,
	threshold: 0.1
};

type LazyConfigOptions = {
	throttleThreshold?: number;
	useNativeLoading: boolean;
	loadBelowFold: boolean;
	decodeImages: boolean;
};

export const lazyClass = 'lazily-loaded-image';

const selectorName = `.${lazyClass}`;

const inBounds = (image: any): boolean =>
	image.getBoundingClientRect().top <= window.innerHeight + config.offset &&
	image.getBoundingClientRect().bottom >= -config.offset &&
	getComputedStyle(image).display !== 'none';

const applyOnSource = (source: HTMLSourceElement): void => {
	if (source.dataset.srcset) {
		source.srcset = source.dataset.srcset;
		source.removeAttribute(attributes.SRC_SET);
	}
};

const applyOnImage = (image: HTMLImageElement): void => {
	if (image.dataset.srcset) {
		image.srcset = image.dataset.srcset;
		image.removeAttribute(attributes.SRC_SET);
	}
	if (image.dataset.src) {
		image.src = image.dataset.src;
		image.removeAttribute(attributes.SRC);
	}
};

const loadImage = ({ src, srcSet }: ImageProps, decode = true): Promise<{ imageUrl; imageSet }> => {
	const image = new Image();
	if (!src && !srcSet) return Promise.reject(Error(`Could not load the image for: ${src}`));
	if (decode) {
		if (srcSet) image.srcset = srcSet;
		if (src) image.src = src;
		return image
			.decode()
			.then(() => Promise.resolve({ imageUrl: src, imageSet: srcSet }))
			.catch((encodingError: Error) => Promise.reject(encodingError));
	}
	return new Promise((resolve, reject) => {
		image.onload = (): void => {
			resolve({ imageUrl: src, imageSet: srcSet });
		};
		image.onerror = (): void => {
			reject(Error(`Could not load the image for: ${src}`));
		};
		if (src) image.src = src;
		if (srcSet) image.srcset = srcSet;
	});
};

const restartLoading = (decodeImages: boolean, delay?: number | undefined): void => {
	const lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll(selectorName));

	if (lazyImages.length > 0) {
		const nextImage = lazyImages.shift();
		if (nextImage) {
			if (delay) {
				setTimeout(() => {
					loadImagesBelowFold(nextImage, decodeImages, delay);
				}, delay);
			} else {
				loadImagesBelowFold(nextImage, decodeImages, config.foldLoadInterval);
			}
		}
	}
};

function lazyLoadElement(element: HTMLElement, decodeImages: boolean, onLoaded?: () => void): void {
	let src = element.dataset.src;
	let srcSet = element.dataset.srcset;

	element.classList.remove(lazyClass);

	if (element instanceof HTMLPictureElement) {
		const sources: HTMLSourceElement[] | null = [].slice.call(element.querySelectorAll('source'));
		const image: HTMLImageElement | null = element.querySelector('img');

		src = image?.dataset.src;
		srcSet = sources[0].dataset.srcset;

		loadImage({ src, srcSet }, decodeImages)
			.then(() => {
				if (sources && sources.length > 0) applyOnSource(sources[0]);
				if (image) applyOnImage(image);
				onLoaded && onLoaded();
			})
			.catch((error) => console.log(error, src));
	} else if (element instanceof HTMLImageElement) {
		loadImage({ src, srcSet }, decodeImages)
			.then(() => {
				applyOnImage(element);
				onLoaded && onLoaded();
			})
			.catch((error) => console.log(error, src));
	}
}

function loadImagesBelowFold(element: HTMLElement | null, decodeImages: boolean, delay: number): void {
	if (!element) return;

	let src = element.dataset.src;
	let srcSet = element.dataset.srcset;

	element.classList.remove(lazyClass);

	if (element instanceof HTMLPictureElement) {
		const sources: HTMLSourceElement[] | null = [].slice.call(element.querySelectorAll('source'));
		const image: HTMLImageElement | null = element.querySelector('img');

		src = image?.dataset.src;
		srcSet = sources[0].dataset.srcset;

		if (Boolean(element.dataset.decoded) === true || !src || src.length <= 0) {
			return restartLoading(decodeImages);
		}

		loadImage({ src, srcSet }, decodeImages)
			.then(() => {
				if (sources && sources.length > 0) applyOnSource(sources[0]);
				if (image) applyOnImage(image);

				restartLoading(decodeImages, delay);
			})
			.catch((error) => console.log(error, src));
	} else if (element instanceof HTMLImageElement) {
		if (Boolean(element.dataset.decoded) === true || !src || src.length <= 0) {
			return restartLoading(decodeImages);
		}
		loadImage({ src, srcSet }, decodeImages)
			.then(() => {
				applyOnImage(element);
				restartLoading(decodeImages, delay);
			})
			.catch((error) => console.log(error, src));
	}
}

function skipLoading(element: HTMLElement): void {
	element.classList.remove(lazyClass);

	if (element instanceof HTMLPictureElement) {
		const sources: HTMLSourceElement[] | null = [].slice.call(element.querySelectorAll('source'));
		const image: HTMLImageElement | null = element.querySelector('img');

		if (sources && sources.length > 0) applyOnSource(sources[0]);
		if (image) applyOnImage(image);
	} else if (element instanceof HTMLImageElement) {
		applyOnImage(element);
	}
}

export function registerLazyImageLoading({
	throttleThreshold = 20,
	useNativeLoading = true,
	loadBelowFold = true,
	decodeImages = true
}: LazyConfigOptions): void {
	const lazyImages: HTMLImageElement[] = [].slice.call(document.querySelectorAll(selectorName));

	const loadedImages: Set<string> = new Set();

	if ('loading' in HTMLImageElement.prototype && useNativeLoading) {
		lazyImages.forEach(async (element: HTMLElement) => {
			element.classList.remove(lazyClass);
			if (element instanceof HTMLPictureElement) {
				const sources: HTMLSourceElement[] | null = [].slice.call(element.querySelectorAll('source'));
				const images: HTMLImageElement[] | null = [].slice.call(element.querySelectorAll('img'));
				if (sources && sources.length > 0) applyOnSource(sources[0]);
				if (images && images.length > 0) {
					const image = images[0];
					image.setAttribute('loading', 'lazy');
					element.setAttribute('decoded', 'true');
					applyOnImage(image);
				}
			} else {
				if (element instanceof HTMLImageElement) {
					element.setAttribute('loading', 'lazy');
					element.setAttribute('decoded', 'true');
					applyOnImage(element);
				}
			}
		});
	} else if (window.IntersectionObserver) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0) {
					const element: any | HTMLElement = entry.target;
					const decoded = Boolean(element.dataset.decoded) === true;

					const src = element.dataset.src;
					const srcSet = element.dataset.srcset;
				
					const loaded = (src && loadedImages.has(src)) || (srcSet && loadedImages.has(srcSet));

					if (loaded) {
						skipLoading(element);
					} else if (element.classList.contains(lazyClass) || decoded) {
						lazyLoadElement(element, decodeImages);
						if (srcSet) {
							loadedImages.add(srcSet);
						} else if (src) {
							loadedImages.add(src);
						}
					}

					observer.unobserve(element);
				}
			});
		}, options);

		lazyImages.forEach((image) => {
			observer.observe(image);
		});
	} else {
		let throttleTimeout;
		let lazyImages = [].slice.call(document.querySelectorAll(selectorName));

		lazyImages.forEach((element: HTMLElement) => {
			if (inBounds(element)) {
				if (element.classList.contains(lazyClass)) {
					lazyLoadElement(element, decodeImages);
				}

				lazyImages = [].slice.call(document.querySelectorAll(selectorName));
			}
		});
		const lazyload = (): void => {
			if (throttleTimeout) {
				clearTimeout(throttleTimeout);
			}

			throttleTimeout = setTimeout(() => {
				lazyImages.forEach((element: HTMLElement) => {
					if (inBounds(element)) {
						if (element.classList.contains(lazyClass)) {
							lazyLoadElement(element, decodeImages);
						}

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

	if (loadBelowFold) {
		setTimeout(() => {
			if (lazyImages.length > 0) {
				const image = lazyImages.shift();
				image && loadImagesBelowFold(image, decodeImages, config.foldLoadInterval);
			}
		}, config.foldLoadDelay);
	}
}
