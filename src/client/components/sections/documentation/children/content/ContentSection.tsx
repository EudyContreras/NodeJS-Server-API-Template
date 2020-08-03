import React from 'react';
import demoImage from '../../../../../resources/images/demo_img.jpeg?sizes[]=250,sizes[]=400,sizes[]=600,sizes[]=800,sizes[]=1000,sizes[]=1200';
import { LazyImage } from '../../../../common/LazyImage';

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

export default ContentSection;
