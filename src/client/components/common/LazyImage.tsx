import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { join } from '../utililties/react.utils';
import { lazyClass } from '../../appliers/lazy.applier';
import ImageStyle from '../../styles/modules/lazyimg.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import webpSupport from 'supports-webp';
import memoize from 'fast-memoize';
import { IStateTree } from '../../reducers';
import { ImageLoadedAction } from '../../actions/common/assets.action';
import { createSelector } from 'reselect';

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

const buildSet = memoize((srcSetIn: string | null | undefined, images: SrcSet[], type?: string | undefined): string => {
	if (!type) return srcSetIn || '';
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

const remotePropsState: ImgAttribute = { crossOrigin: 'anonymous' };

const selectImageAssetState = (src: string): any =>
	createSelector<IStateTree, Record<string, boolean>, unknown>(
		(state) => state.presentation.assets.images,
		(images) => images[src] === true
	);

export const LazyImage: React.FC<LazyImageProps> = (props: LazyImageProps): JSX.Element => {
	const { src, alt, srcSet, index, width, height, images, fallback, mediaQuery, className, placeholder } = props;
	const inMemory = useSelector<IStateTree>(selectImageAssetState(src));
	const dispatch = useDispatch();

	function onLoaded(event: React.SyntheticEvent<HTMLImageElement>): void {
		const url = event.currentTarget.src;
		if (!inMemory && url) dispatch({ ...ImageLoadedAction, payload: src });
	}

	function onFailed(event: React.SyntheticEvent<HTMLImageElement>): void {
		const image: HTMLImageElement = event.currentTarget;
		if (fallback) {
			if (fallback.srcSet) {
				image.srcset = fallback.srcSet;
			}
			if (fallback.images) {
				image.srcset = buildSet(fallback.srcSet, fallback.images);
			}
			image.onerror = null;
			image.src = fallback.src;
		}
	}

	const hasLoaded = inMemory;

	useStyles(styling);

	const sizes = buildSizes(mediaQuery);
	const containerClasses = join(styling.lazyImage, styling.lazyImageWrapper, className);
	const elementClasses = join(styling.lazyImageSource, hasLoaded ? styling.lazyImageLoaded : lazyClass);

	const remoteProps: ImgAttribute = srcSet ? {} : remotePropsState;

	return (
		<div className={containerClasses}>
			<img {...remoteProps} src={placeholder} alt={alt} aria-hidden={true} className={styling.lazyImagePlaceholder} />
			<img
				{...remoteProps}
				{...(hasLoaded ? { src: src, srcSet: srcSet } : { onLoad: onLoaded, 'data-src': src, 'data-srcset': srcSet })}
				alt={alt}
				sizes={sizes}
				data-index={index}
				onError={onFailed}
				className={elementClasses}
			/>
		</div>
	);
};
