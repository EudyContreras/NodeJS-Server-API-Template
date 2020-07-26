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
	placeholder?: string;
	className?: string;
}

const extensions = ['webp', 'jpg'];

const sizeOptions = [];

const LazyImage: React.FC<Props> = (props: Props): JSX.Element => {
	const [isLoaded, setLoaded] = useState(false);
	const [hasFailed, setFailed] = useState(false);

	const { src, alt, w, h, srcSet, styling, className, placeholder } = props;

	const imgRef: RefObject<HTMLImageElement | any> = useRef<HTMLImageElement | any>();

	useEffect(() => {
		if (imgRef.current && imgRef.current.complete) {
			setLoaded(true);
		}
	}, []);

	const targeImageClasses = [className, isLoaded ? styling.lazyImageLoaded : styling.lazyImageLoading];
	const placeHolderClasses = [className, styling.lazyImagePlaceholder];

	return (
		<React.Fragment>
			{!hasFailed && (
				<img
					src={src}
					alt={alt}
					ref={imgRef}
					srcSet={srcSet}
					width={w}
					{...(h && { height: h })}
					loading="lazy"
					className={join(...targeImageClasses)}
					onLoad={(): void => setLoaded(true)}
					onError={(): void => setFailed(true)}
				/>
			)}

			<img
				width={w}
				{...(h && { height: h })}
				src={placeholder}
				alt={alt}
				aria-hidden={true}
				className={join(...placeHolderClasses)}
				{...(isLoaded && { style: { opacity: '0' } })}
			/>
		</React.Fragment>
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
