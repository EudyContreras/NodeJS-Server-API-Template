/* eslint-disable standard/no-callback-literal */
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
	if (action.type === 'main image loaded') {
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
			dispatch({ type: 'MAIN_IMAGE_LOADED', src, loaded: isLoaded });
		};
		fallbackImage.onload = (): void => {
			setLoaded(true);
			dispatch({ type: 'FALLBACK_IMAGE_LOADED', src: fallbackSrc, loaded: isLoaded });
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
	}, []);

	return loadedSrc;
}

export const LazyImage: React.FC<LazyImageProps> = React.memo(
	(props: LazyImageProps): JSX.Element => {
		const { src, alt, srcSet, index, images, mediaQuery, className, placeholder } = props;

		const [isLoaded, setLoaded] = useState(false);
		const [hasFailed, setFailed] = useState(false);

		const onLoaded = (event: React.SyntheticEvent<HTMLImageElement>): void => {
			setLoaded(true);
		};

		const onFailed = (event: React.SyntheticEvent<HTMLImageElement>): void => {
			setFailed(true);
		};

		const sizes = buildSizes(mediaQuery);
		const imgSets = images && buildSet(images, fileType.WEBP);
		const containerClasses = join(styling.lazyImage, styling.lazyImageWrapper, className);
		const elementClasses = join(styling.lazyImageSource, isLoaded ? styling.lazyImageLoaded : '');

		useStyles(styling);

		return (
			<div className={containerClasses}>
				<img loading="lazy" src={placeholder} alt={alt} aria-hidden={true} className={styling.lazyImagePlaceholder} />
				<picture data-index={index} className={!isLoaded ? lazyClass : ''}>
					<source type={mediaType.WBP} sizes={sizes} data-srcset={imgSets || srcSet} className={elementClasses} />
					<img alt={alt} sizes={sizes} data-src={src} data-srcset={srcSet} data-index={index} onLoad={onLoaded} onError={onFailed} className={elementClasses} />
				</picture>
			</div>
		);
	}
);
