/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
// @ts-ignore-line
import demoImage from '../../../../../resources/images/demo_img.jpeg?sizes[]=250,sizes[]=400,sizes[]=600,sizes[]=800,sizes[]=1000,sizes[]=1200';
import { LazyImage } from '../../../../common/LazyImage';

class ContentSection extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const { styling, index } = this.props;
		const { src, images, placeholder, srcSet, width, height } = demoImage;

		return (
			<article className={styling.content}>
				<div className={styling.contentInner}>
					<LazyImage
						images={images}
						className={styling.imageContainer}
						alt={'Some alt text'}
						src={src}
						index={index}
						aspectRatio={16 / 9}
						placeholder={placeholder}
						srcSet={srcSet}
						mediaQuery={{
							queries: [
								{ maxWidth: 600 * 2, targetWidth: 250 },
								{ maxWidth: 800 * 2, targetWidth: 400 },
								{ maxWidth: 1000 * 2, targetWidth: 600 },
								{ maxWidth: 1200 * 2, targetWidth: 800 }
							],
							fallback: 800
						}}
					/>
				</div>
			</article>
		);
	};
}

class ContentSectionAlt extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;
		const { index } = this.props;
		return (
			<article className={style.content}>
				<div className={style.contentInner}>
					<LazyImage
						tryWebp={true}
						lazyLoad={true}
						className={style.imageContainer}
						alt={'Some alt text'}
						src={`https://picsum.photos/1200/900.webp?image=${index}`}
						aspectRatio={16 / 9}
						placeholder={`https://picsum.photos/30/30.webp?image=${index}&blur=4`}
					/>
				</div>
			</article>
		);
	};
}

export default ContentSection;
