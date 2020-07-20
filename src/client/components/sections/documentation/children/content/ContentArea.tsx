import React from 'react';
import Section from './ContentSection';
import Wrapper from '../../../../shared/Wrapper';

class ContentArea extends React.PureComponent<any, any> {

	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<div className={style.contentWrapper}>
				<Wrapper className={style.contentPadder}>
					<Section styling={style}/>
					<Section styling={style}/>
					<Section styling={style}/>
					<Section styling={style}/>
				</Wrapper>
			</div>
		);
	};
}

export default ContentArea;
