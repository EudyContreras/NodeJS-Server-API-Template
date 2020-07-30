import React from 'react';
import Section from './ContentSection';
import Wrapper from '../../../../common/Wrapper';
import { range } from 'lodash';

class ContentArea extends React.PureComponent<any, any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<div className={style.contentWrapper}>
				<Wrapper className={style.contentPadder}>
					{range(20).map((index) => (
						<Section index={index} styling={style} key={index} />
					))}
				</Wrapper>
			</div>
		);
	};
}

export default ContentArea;
