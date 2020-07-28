import React from 'react';
import demoImage from '../../../../../resources/images/demo_img.jpeg?sizes[]=300,sizes[]=500,sizes[]=800,sizes[]=1000';
import LazyImage from '../../../../common/LazyImage';

class ContentSection extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;
		const { src, palette } = demoImage;
		const { images, placeholder, srcSet, width, height } = src;

		return (
			<article className={style.content}>
				<div className={style.contentInner}>
					<LazyImage
						className={style.imageContainer}
						alt={'Some alt text'}
						src={src.src}
						palette={palette}
						aspectRatio={16 / 9}
						placeholder={placeholder}
						srcSet={srcSet}
						images={images}
						mediaQuery={{
							queries: [
								{ maxWidth: 480, targetWidth: 300 },
								{ maxWidth: 600, targetWidth: 500 },
								{ maxWidth: 900, targetWidth: 800 }
							],
							fallback: 800
						}}
					/>
				</div>
			</article>
		);
	};
}

export default ContentSection;
