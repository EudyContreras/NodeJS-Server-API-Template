/* eslint-disable standard/no-callback-literal */
import React, { useState, useEffect, useReducer } from 'react';
import { join } from '../utililties/react.utils';
import { lazyClass } from '../../appliers/lazy.applier';
import memoize from 'fast-memoize';
import webpSupport from 'supports-webp';

interface Query {
	maxWidth: number;
	targetWidth: number;
}
interface MediaQuery {
	queries: Query[];
	fallback: number;
}

interface Props {
	w?: number;
	h?: number;
	src: string;
	alt?: string;
	title?: string;
	styling?: any;
	srcSet?: string;
	mediaQuery?: MediaQuery;
	aspectRatio: number;
	placeholder?: string;
	className?: string;
}

const buildSizes = memoize((mediaQuery?: MediaQuery): string => {
	const queries: string[] = [];
	mediaQuery?.queries.forEach((query) => {
		queries.push(`(max-width: ${query.maxWidth}px) ${query.targetWidth}px`);
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

export const LazyImage: React.FC<Props> = React.memo(
	(props: Props): JSX.Element => {
		const [isLoaded, setLoaded] = useState(false);
		const [hasFailed, setFailed] = useState(false);
		// const supportsWebp = useWebPSupport();

		const { src, alt, srcSet, styling, mediaQuery, className, placeholder } = props;

		return (
			<div className={join(styling.lazyImage, styling.lazyImageWrapper, className)}>
				<img
					loading="lazy"
					className={styling.lazyImagePlaceholder}
					src={placeholder}
					alt={alt}
					aria-hidden={'true'}
					{...(isLoaded && { style: { opacity: 0 } })}
				/>
				<img
					alt={alt}
					sizes={buildSizes(mediaQuery)}
					data-src={src}
					data-srcset={srcSet}
					onLoad={(): void => setLoaded(true)}
					onError={(): void => setFailed(true)}
					className={join(styling.lazyImageSource, isLoaded ? styling.lazyImageLoaded : lazyClass)}
				/>
			</div>
		);
	}
);
