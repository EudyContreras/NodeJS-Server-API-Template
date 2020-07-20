import React from 'react';
import PropType from 'prop-types';

interface Props {
	src: string;
	alt: string;
	title: string;
	styling: any;
}

const extensions = ['webp', 'jpg'];

const Picture: React.FunctionComponent<Props> = (props) => {
	const parts = props.src.split('.');
	const ext = parts[parts.length - 1];
	const path = props.src.replace(ext, '');

	return (
		<picture className={props.styling.lazyImage}>
			{extensions.map((x, idx) => (
				<source key={idx} srcSet={path + x} type={'image/' + x} />
			))}
			<img src={path + ext} alt={props.alt} title={props.title} />
		</picture>
	);
};

Picture.propTypes = {
	src: PropType.string.isRequired,
	alt: PropType.string.isRequired,
	title: PropType.string.isRequired,
	styling: PropType.any
};

export default Picture;
