/* eslint-disable standard/no-callback-literal */
import React, { useState, useEffect } from 'react';
import { join } from '../utililties/react.utils';
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

const LazyImage: React.FC<Props> = (props: Props): JSX.Element => {
	const [isLoaded, setLoaded] = useState(false);
	const [hasFailed, setFailed] = useState(false);
	// const supportsWebp = useWebPSupport();

	const { src, alt, srcSet, mediaQuery, styling, className, placeholder } = props;

	return (
		<div className={join(styling.lazyImage, styling.lazyImageWrapper, className)}>
			<img
				loading="lazy"
				src={src}
				alt={alt}
				sizes={buildSizes(mediaQuery)}
				srcSet={srcSet}
				decoding="async"
				onLoad={(): void => setLoaded(true)}
				onError={(): void => setFailed(true)}
				className={join(styling.lazyImageSource, isLoaded && styling.lazyImageLoaded)}
			/>
			<img
				decoding="sync"
				className={styling.lazyImagePlaceholder}
				src={placeholder}
				alt={alt}
				aria-hidden="true"
				{...(isLoaded && { style: { opacity: 0 } })}
			/>
		</div>
	);
};

export default React.memo(LazyImage);
