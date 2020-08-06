import React, { useState, useEffect, useReducer } from 'react';
import { join } from '../utililties/react.utils';
import { lazyClass } from '../../appliers/lazy.applier';
import ImageStyle from '../../styles/modules/lazyimg.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import memoize from 'fast-memoize';
import webpSupport from 'supports-webp';

const styling: any = ImageStyle;

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
		} else if (query.maxWidth) {
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

function useImage(props: ImageProps): string | null {
	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

	useEffect(() => {
		const fetchImage = async (): Promise<void> => {
			const { imageUrl } = await loadImage({ ...props });
			setLoadedSrc(imageUrl);
		};
		fetchImage();
	}, [props.src, props.srcSet]);

	return loadedSrc;
}

const onSuccess = (
	source: HTMLSourceElement | null,
	image: HTMLImageElement | null,
	{ imageSrc, imageSrcSet }: { imageSrc: string; imageSrcSet: string }
): void => {
	if (source) {
		source.srcset = imageSrcSet;
		source.classList.add(styling.lazyImageLoaded);
	}
	if (image) {
		image.src = imageSrc;
		image.srcset = imageSrcSet;
		image.classList.remove(lazyClass);
		image.classList.add(styling.lazyImageLoaded);
	}
};

const failedState = { hasLoaded: false, hasFailed: true };
const successState = { hasLoaded: true, hasFailed: false };
const initialState = { hasLoaded: false, hasFailed: false };

const onFoldState: ImgAttribute = { decoding: 'async' };
const offFoldState: ImgAttribute = { loading: 'eager' };
const remotePropsState: ImgAttribute = { crossOrigin: 'anonymous' };

export const LazyImage: React.FC<LazyImageProps> = (props: LazyImageProps): JSX.Element => {
	const { src, alt, srcSet, index, images, fallback, mediaQuery, className, placeholder } = props;

	const [{ hasLoaded, hasFailed }, setLoadState] = useState(initialState);

	useStyles(styling);

	const onLoaded = (event: React.SyntheticEvent<HTMLImageElement>): void => {
		setLoadState(successState);
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
			image.onerror = (): void => {
				setLoadState(failedState);
			};
			image.src = fallback.src;
		} else {
			setLoadState(failedState);
		}
	};

	const sizes = buildSizes(mediaQuery);
	const imgSets = images && buildSet(images, fileType.WEBP);
	const containerClasses = join(styling.lazyImage, styling.lazyImageWrapper, className);
	const elementClasses = join(styling.lazyImageSource, hasLoaded ? styling.lazyImageLoaded : srcSet ? '' : lazyClass);

	const lazyProps: ImgAttribute = (index || 0) > 6 ? onFoldState : offFoldState;
	const remoteProps: ImgAttribute = srcSet ? {} : remotePropsState;

	return (
		<div className={containerClasses}>
			<img {...lazyProps} {...remoteProps} src={placeholder} alt={alt} aria-hidden={true} className={styling.lazyImagePlaceholder} />
			{srcSet ? (
				<picture data-index={index} className={!hasLoaded ? lazyClass : ''}>
					<source type={mediaType.WBP} data-srcset={imgSets || srcSet} sizes={sizes} className={elementClasses} />
					<img alt={alt} data-src={src} data-srcset={srcSet} sizes={sizes} data-index={index} onLoad={onLoaded} onError={onFailed} className={elementClasses} />
				</picture>
			) : (
				<img alt={alt} crossOrigin="anonymous" data-src={src} data-index={index} onLoad={onLoaded} onError={onFailed} className={elementClasses} />
			)}
		</div>
	);
};
