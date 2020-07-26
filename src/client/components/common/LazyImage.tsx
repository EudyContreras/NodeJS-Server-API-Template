/* eslint-disable standard/no-callback-literal */
import React, { useState, useEffect, useRef, RefObject } from 'react';
import { join } from '../utililties/react.utils';
import PropType from 'prop-types';

interface Props {
	src: string;
	alt?: string;
	w?: number;
	h?: number;
	title?: string;
	styling?: any;
	srcSet?: string;
	aspectRatio: number;
	placeholder?: string;
	className?: string;
}

const extensions = ['webp', 'jpg'];

const sizeOptions = [];

const LazyImage: React.FC<Props> = (props: Props): JSX.Element => {
	const [isLoaded, setLoaded] = useState(false);
	const [hasFailed, setFailed] = useState(false);

	const { src, alt, srcSet, aspectRatio, styling, className, placeholder } = props;

	const targeImageClasses = [className, isLoaded ? styling.lazyImageLoaded : styling.lazyImageLoading];
	const placeHolderClasses = [className, styling.lazyImagePlaceholder];

	return (
		<div className={join(styling.lazyImage, styling.lazyImageWrapper, className)}>
			<img
				loading="lazy"
				src={src}
				alt={alt}
				srcSet={srcSet}
				decoding="async"
				onLoad={(): void => setLoaded(true)}
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

LazyImage.propTypes = {
	src: PropType.string.isRequired,
	alt: PropType.string,
	title: PropType.string,
	className: PropType.string,
	placeholder: PropType.string,
	styling: PropType.any
};

export default LazyImage;
