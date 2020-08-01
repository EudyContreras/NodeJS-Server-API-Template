import { join } from '../utililties/react.utils';
import { lazyClass } from '../../appliers/lazy.applier';
import React, { useState, useEffect, useReducer, RefObject } from 'react';
import webpSupport from 'supports-webp';
import ImageStyle from '../../styles/modules/lazyimg.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import memoize from 'fast-memoize';

const styling: any = ImageStyle;

const observerOptions = {
	threshold: 1,
	rootMargin: '75%'
};

const typeRegex = /\.(jpe?g|png|webp|svg)$/i;

const fileType = {
	JPEG: 'jpeg',
	WEBP: 'webp',
	SVG: 'svg',
	PNG: 'png',
	JPG: 'jpg'
};

const mediaType = {
	SVGXML: 'image/svg+xml',
	JPEG: 'image/jpeg',
	WBP: 'image/webp',
	SVG: 'image/svg',
	PNG: 'image/png',
	JPG: 'image/jpg'
};

const elements = {
	TARGET: 'target',
	SOURCE: 'source',
	PLACEHOLDER: 'placeholder'
};

const IMG_ACTION_TAG = 'TARGET_IMAGE_LOADED';
const IMG_FALLBACK_ACTION_TAG = 'FALLBACK_IMAGE_LOADED';

const getSrc = (src: string, type: string | undefined): string => (type ? src.replace(typeRegex, `.${type}`) : src);

const buildSet = memoize((images: SrcSet[], type?: string | undefined): string => {
	const srcSet: string[] = [];
	images.forEach((image) => {
		const path = getSrc(image.path, type);
		srcSet.push(`${path} ${image.width}w`);
	});
	return srcSet.join(', ');
});

const buildSizes = memoize((mediaQuery?: MediaQuery): string => {
	const queries: string[] = [];
	mediaQuery?.queries.forEach((query) => {
		if (query.minWidth) {
			queries.push(`(min-width: ${query.minWidth}px) ${query.targetWidth}px`);
		}
		if (query.maxWidth) {
			queries.push(`(max-width: ${query.maxWidth}px) ${query.targetWidth}px`);
		}
	});
	return `${queries.join(', ')}, ${mediaQuery?.fallback}px`;
});

export function useWebPSupport(): boolean {
	const [{ webp: supportsWebp }, setWebPSupport] = useState({ webp: false });
	useEffect(() => {
		const checkForSupport = async (): Promise<void> => {
			try {
				const supportsWebp = await webpSupport;
				setWebPSupport({ webp: supportsWebp });
			} catch (error) {
				setWebPSupport({ webp: false });
			}
		};
		checkForSupport();
	}, [webpSupport]);
	return supportsWebp;
}

function reducer(currentSrc, action): any {
	if (action.type === IMG_ACTION_TAG) {
		return action.src;
	}
	if (!currentSrc) {
		return action.src;
	}
	return currentSrc;
}

function useProgressiveImage({ src, fallbackSrc }): any {
	const [isLoaded, setLoaded] = useState(false);
	const [currentSrc, dispatch] = useReducer(reducer, null);

	useEffect(() => {
		const mainImage = new Image();
		const fallbackImage = new Image();

		mainImage.onload = (): void => {
			setLoaded(true);
			dispatch({ type: IMG_ACTION_TAG, src, loaded: isLoaded });
		};
		fallbackImage.onload = (): void => {
			setLoaded(true);
			dispatch({ type: IMG_FALLBACK_ACTION_TAG, src: fallbackSrc, loaded: isLoaded });
		};

		mainImage.src = src;
		fallbackImage.src = fallbackSrc;
	}, [src, fallbackSrc]);

	return currentSrc;
}

const loadImage = ({ src, srcSet, alt, sizes }: ImageProps, decode = true): Promise<{ imageUrl; imageSet }> => {
	const image = new Image();
	if (srcSet) image.srcset = srcSet;
	if (sizes) image.sizes = sizes;
	if (alt) image.alt = alt;
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

function useImage(props: ImageProps): string | null {
	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

	useEffect(() => {
		const fetchImage = async (): Promise<void> => {
			const { imageUrl } = await loadImage({ ...props });
			setLoadedSrc(imageUrl);
		};

		fetchImage();
	}, []);

	return loadedSrc;
}

export const ImageLoader: React.FC<LoaderProps> = ({ show }: LoaderProps): JSX.Element => (
	<div className={join(styling.imageLoader, show ? styling.imageLoaderAnimate : styling.imageLoaderHide)}></div>
);

export const ErrorPlaceHolder: React.FC<ErrorProps> = ({ errorMessage }: ErrorProps): JSX.Element => <div>{errorMessage}</div>;

export const ReactImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => (
	<img {...props} />
);

export const ResponsiveImage: React.FC<LazyImageProps> = React.memo(
	(props: LazyImageProps): JSX.Element => {
		const [{ hasLoaded, hasFailed }, setLoadState] = useState({ hasLoaded: false, hasFailed: false });

		const { src, alt, srcSet, images, lazyLoad, className, placeholder } = props;

		const onSuccess = (): void => {
			setLoadState({ hasLoaded: true, hasFailed: false });
		};
		const onFailed = (): void => {
			setLoadState({ hasLoaded: false, hasFailed: true });
		};

		useStyles(styling);

		return (
			<div className={join(styling.lazyImage, styling.lazyImageWrapper, className)}>
				<ReactImage className={styling.lazyImagePlaceholder} src={placeholder} alt={alt} aria-hidden="true" {...(hasLoaded && { style: { opacity: 0 } })} />
				{!hasFailed && (
					<picture>
						<source
							type={mediaType.WBP}
							data-srcset={images && buildSet(images)}
							onLoad={onSuccess}
							onError={onFailed}
							className={join(styling.lazyImageSource, hasLoaded ? styling.lazyImageLoaded : lazyLoad && lazyClass)}
						/>
						<img
							alt={alt}
							loading="lazy"
							decoding="async"
							data-src={src}
							data-srcset={srcSet}
							onLoad={onSuccess}
							onError={onFailed}
							className={join(styling.lazyImageSource, hasLoaded ? styling.lazyImageLoaded : lazyLoad && lazyClass)}
						/>
					</picture>
				)}
			</div>
		);
	}
);

function equalProps(prevProps: LazyImageProps, nextProps: LazyImageProps): boolean {
	return prevProps.src === nextProps.src && prevProps.srcSet === nextProps.srcSet;
}

/**
 * Clarify and clean up logic
 * Add loaded images to redux state and prevent re-showing placeholder for them.
 * Add logic for putting a pallete in the container using the pallete colors
 * Handle the load error case for the image
 * Find a way to optimize further get rid of bottlenecks
 */
export const LazyImage: React.FC<LazyImageProps> = ({
	src,
	alt,
	srcSet,
	images,
	className,
	placeholder,
	fallback,
	tryWebp = true
}: LazyImageProps): JSX.Element => {
	const [hasLoaded, setLoaded] = useState<boolean>(false);
	const [imageRef, setImageRef] = useState<HTMLDivElement | null>();
	const [{ webp, imageSrc, imageSrcSet, imagesSet }, setImageSrc] = useState<any>({
		webp: false,
		imageSrc: '',
		imageSrcSet: '',
		imagesSet: []
	});

	const onSuccess = (event: React.SyntheticEvent<HTMLImageElement | HTMLSourceElement, Event>): void => {
		// onst id = event.currentTarget.id;
		// witch (id) {
		// 	case elements.SOURCE: {
		// 		event.currentTarget.classList.add(styling.lazyImageLoaded);
		// 		if (imageRef) imageRef.style.opacity = '0';
		// 		break;
		// 	}
		// 	case elements.TARGET:
		// 		event.currentTarget.classList.add(styling.lazyImageLoaded);
		// 		if (imageRef) imageRef.style.opacity = '0';
		// 		break;
		// 	default:
		//
		setLoaded(true);
	};

	const onFailed = (event: React.SyntheticEvent<HTMLImageElement>): void => {
		const image: HTMLImageElement = event.currentTarget;
		if (fallback) {
			if (fallback.srcSet) {
				image.srcset = fallback.srcSet;
			}
			if (fallback.images) {
				image.srcset = buildSet(fallback.images);
			}
			image.onerror = null;
			image.src = fallback.src;
		}
	};

	useEffect(() => {
		let hasCanceled = false;
		let observer: IntersectionObserver | null;

		if (imageRef && imageSrc !== src) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver((entries) => {
					const entry = entries.length > 0 ? entries[0] : null;
					if (entry && !hasCanceled && entry.intersectionRatio > 0) {
						const fetchImage = async (): Promise<void> => {
							try {
								const webp = tryWebp && (await webpSupport);
								const { imageUrl, imageSet } = await loadImage({
									src: webp ? getSrc(src, fileType.WEBP) : src,
									srcSet: webp && images ? buildSet(images, fileType.WEBP) : srcSet || ''
								});

								setImageSrc({ imageSrc: imageUrl, imageSrcSet: imageSet, imagesSet: images, webp: webp });
							} catch (error) {
								setImageSrc({ imageSrc: src, imageSrcSet: srcSet, imagesSet: images });
							}
						};

						fetchImage();
						observer && observer.unobserve(imageRef);
					}
				}, observerOptions);
				observer.observe(imageRef);
			} else {
				setImageSrc({ imageSrc: src, imageSrcSet: srcSet, imagesSet: images, webp: false });
			}
		}
		return (): any => {
			hasCanceled = true;
			if (observer && observer.unobserve) {
				imageRef && observer.unobserve(imageRef);
				observer.disconnect();
			}
		};
	}, [src, imageSrc, imageRef]);

	useStyles(styling);

	const targetSrc = webp ? getSrc(src, fileType.WEBP) : src;

	return (
		<div ref={setImageRef} className={join(styling.lazyImage, styling.lazyImageWrapper, className)}>
			<img
				{...(hasLoaded ? { style: { opacity: 0 } } : {})}
				className={styling.lazyImagePlaceholder}
				loading="eager"
				decoding="async"
				src={placeholder}
				alt={alt}
				aria-hidden={true}
			/>
			<picture className={lazyClass}>
				{!webp && (
					<source
						type={mediaType.WBP}
						{...(imageSrc === src && {
							srcSet: buildSet(imagesSet, fileType.WEBP),
							onLoad: onSuccess
						})}
						className={join(styling.lazyImageSource, hasLoaded && styling.lazyImageLoaded)}
					/>
				)}
				<img
					loading="lazy"
					decoding="async"
					alt={alt}
					{...(imageSrc === targetSrc && {
						src: targetSrc,
						srcSet: webp ? buildSet(imagesSet, fileType.WEBP) : imageSrcSet,
						onLoad: onSuccess,
						onError: onFailed
					})}
					className={join(styling.lazyImageSource, hasLoaded && styling.lazyImageLoaded)}
				/>
			</picture>
		</div>
	);
};
