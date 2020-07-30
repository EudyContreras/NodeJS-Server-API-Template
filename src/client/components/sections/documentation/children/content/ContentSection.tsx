import React from 'react';
import demoImage from '../../../../../resources/images/demo_img.jpeg?sizes[]=1800,sizes[]=300,sizes[]=500,sizes[]=800,sizes[]=1000';
import { LazyImage } from '../../../../common/LazyImage';

class ContentSection extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;
		const { src, palette } = demoImage;
		const { images, placeholder, srcSet } = src;

		return (
			<article className={style.content}>
				<div className={style.contentInner}>
					<LazyImage
						index={this.props.index}
						lazyLoad={true}
						className={style.imageContainer}
						alt={'Some alt text'}
						src={src.src}
						palette={palette}
						aspectRatio={16 / 9}
						placeholder={placeholder}
						srcSet={srcSet}
						images={images}
					/>
				</div>
			</article>
		);
	};
}

export default ContentSection;
