import React from 'react';
import demoImage from '../../../../../resources/images/demo_img.jpeg?sizes[]=100,sizes[]=200,sizes[]=300,sizes[]=500,sizes[]=800,sizes[]=1000';
import LazyImage from '../../../../common/LazyImage';

class ContentSection extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;
		return (
			<article className={style.content}>
				<div>
					<LazyImage
						styling={style}
						className={style.imageContainer}
						alt={'Some alt text'}
						src={demoImage.src}
						aspectRatio={16 / 9}
						placeholder={demoImage.placeholder}
						srcSet={demoImage.srcSet}
						mediaQuery={{
							queries: [
								{ maxWidth: 480, targetWidth: 100 },
								{ maxWidth: 600, targetWidth: 300 }
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
