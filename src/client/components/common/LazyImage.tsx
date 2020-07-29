/* eslint-disable standard/no-callback-literal */
import React, { useState, useEffect, useReducer } from 'react';
import { join } from '../utililties/react.utils';
import { lazyClass } from '../../appliers/lazy.applier';
import ImageStyle from '../../styles/modules/lazyimg.module.scss';
import withStyles from 'isomorphic-style-loader/withStyles';
import memoize from 'fast-memoize';
import webpSupport from 'supports-webp';
import { instanceOf } from 'prop-types';

const styling: any = ImageStyle;

const FileType = {
	JPEG: 'png',
	WBP: 'webp',
	SVG: 'svg',
	PNG: 'png',
	JPG: 'jpg'
};

const MediaType = {
	JPEG: 'image/jpeg',
	WBP: 'image/webp',
	SVG: 'image/svg',
	PNG: 'image/png',
	JPG: 'image/jpg'
};

type QueryMax = {
	maxWidth: number;
	targetWidth: number;
};

type QueryMin = {
	minWidth: number;
	targetWidth: number;
};

interface MediaQuery {
	queries: QueryMin[] | QueryMax[];
	fallback: number;
}

interface SrcSet {
	path: string;
	width: number;
	height: number;
}

interface ImageProps {
	src: string;
	alt: string;
	srcSet: any[];
	placeholder?: any;
}

interface LazyImageProps {
	w?: number;
	h?: number;
	src: string;
	alt?: string;
	title?: string;
	srcSet?: string;
	images: SrcSet[];
	palette?: string[];
	mediaQuery?: MediaQuery;
	aspectRatio: number;
	placeholder?: string;
	className?: string;
}

const getSrc = memoize((src: string, type: string): string => {
	const path = src.substring(0, src.indexOf('.'));
	return `${path}.${type}`;
});

const buildSet = memoize((images: SrcSet[], fileType = FileType.WBP): string => {
	const srcSet: string[] = [];
	images.forEach((image) => {
		const path = getSrc(image.path, fileType);
		srcSet.push(`${path} ${image.width}w`);
	});
	return srcSet.join(', ');
});

const buildSizes = memoize((mediaQuery?: MediaQuery): string => {
	const queries: string[] = [];
	mediaQuery?.queries.forEach((query) => {
		if (query.minWidth) {
			queries.push(`(min-width: ${query.minWidth}px) ${query.targetWidth}px`);
		} else {
			queries.push(`(max-width: ${query.maxWidth}px) ${query.targetWidth}px`);
		}
	});
	return `${queries.join(', ')}, ${mediaQuery?.fallback}px`;
});

export function useWebPSupport(): boolean {
	const [{ webp: supportsWebp }, setWebPSupport] = useState({ webp: false });
	useEffect(() => {
		const checkForSupport = async (): Promise<void> => {
			const supportsWebp = await webpSupport;
			setWebPSupport({ webp: supportsWebp });
		};

		checkForSupport();
	}, [webpSupport]);

	return supportsWebp;
}

function reducer(currentSrc, action): any {
	if (action.type === 'FALLBACK_IMAGE_LOADED') {
		return action.src;
	}
	if (!currentSrc) {
		return action.src;
	}
	return currentSrc;
}

function useFallbackImage({ fallbackSrc }): any {
	const [currentSrc, dispatch] = useReducer(reducer, null);

	useEffect(() => {
		const fallbackImage = new Image();

		fallbackImage.onload = (): void => {
			dispatch({ type: 'FALLBACK_IMAGE_LOADED', src: fallbackSrc });
		};
		fallbackImage.src = fallbackSrc;
	}, [fallbackSrc]);

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

const ReactImage: React.FC<ImageProps> = ({ placeholder, alt, srcSet }: ImageProps): JSX.Element => (
	<img className="lazyload" alt={alt} src={placeholder.trace} data-srcset={srcSet.map((img, inx) => `${img.src} ${inx + 1}x`).join(', ')} data-sizes="auto" />
);

const LazyImage: React.FC<LazyImageProps> = (props: LazyImageProps): JSX.Element => {
	const [{ isLoaded, hasFailed }, setLoadState] = useState({ isLoaded: false, hasFailed: false });

	const { src, alt, srcSet, images, className, placeholder } = props;

	const onSuccess = (): void => {
		setLoadState({ isLoaded: true, hasFailed: false });
	};
	const onFailed = (): void => {
		setLoadState({ isLoaded: false, hasFailed: true });
	};

	return (
		<div className={join(styling.lazyImage, styling.lazyImageWrapper, className)}>
			<img className={styling.lazyImagePlaceholder} src={placeholder} alt={alt} aria-hidden="true" {...(isLoaded && { style: { opacity: 0 } })} />
			{!hasFailed && (
				<picture>
					<source
						type={MediaType.WBP}
						data-srcset={buildSet(images)}
						onLoad={onSuccess}
						onError={onFailed}
						className={join(styling.lazyImageSource, isLoaded ? styling.lazyImageLoaded : lazyClass)}
					/>
					<img
						alt={alt}
						decoding="async"
						data-src={src}
						data-srcset={srcSet}
						onLoad={onSuccess}
						onError={onFailed}
						className={join(styling.lazyImageSource, isLoaded ? styling.lazyImageLoaded : lazyClass)}
					/>
				</picture>
			)}
		</div>
	);
};

export default React.memo(withStyles(ImageStyle)(LazyImage));
