/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore-line
import demoImage from '../../../../../resources/images/demo_img.jpeg?sizes[]=300,sizes[]=500,sizes[]=800,sizes[]=1000';
import { LazyImage } from '../../../../common/LazyImage';
import React from 'react';

const ContentSection = ({ styling }: { styling: any }): JSX.Element => {
	const { src, images, placeholder, srcSet } = demoImage;

	return (
		<article className={styling.content}>
			<div className={styling.contentInner}>
				<LazyImage
					className={styling.imageContainer}
					alt={'Some alt text'}
					src={src}
					aspectRatio={16 / 9}
					placeholder={placeholder}
					srcSet={srcSet}
					images={images}
				/>
			</div>
		</article>
	);
};

class ContentSectionAlt extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<article className={style.content}>
				<div className={style.contentInner}>
					<LazyImage
						tryWebp={true}
						lazyLoad={true}
						className={style.imageContainer}
						alt={'Some alt text'}
						src={`https://picsum.photos/1200/900/?image=${this.props.index}`}
						aspectRatio={16 / 9}
						placeholder={`https://picsum.photos/30/30/?image=${this.props.index}&blur=4`}
					/>
				</div>
			</article>
		);
	};
}

export default ContentSection;
