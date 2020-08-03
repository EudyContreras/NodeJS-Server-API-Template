import React from 'react';
import Section from './ContentSection';
import Wrapper from '../../../../common/Wrapper';

class ContentArea extends React.PureComponent<any, any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<div className={style.contentWrapper}>
				<div className={style.contentPadder}>
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
					<Section styling={style} />
				</div>
			</div>
		);
	};
}

export default ContentArea;
