import React from 'react';
import demoImage from '../../../../../resources/images/icons/demo-image.jpeg?sizes[]=100,sizes[]=200,sizes[]=300,sizes[]=500,sizes[]=1000';
import LazyImage from '../../../../common/LazyImage';

class ContentSection extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;
		return (
			<article className={style.content}>
				<div>
					<LazyImage
						styling={style}
						className={style.image}
						alt={'Some alt text'}
						aspectRatio={16 / 9}
						placeholder={demoImage.placeholder}
						src={demoImage.src}
						srcSet={demoImage.srcSet}
					/>
				</div>
			</article>
		);
	};
}

export default ContentSection;
