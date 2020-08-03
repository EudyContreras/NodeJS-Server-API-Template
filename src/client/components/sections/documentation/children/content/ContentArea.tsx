import React from 'react';
import Section from './ContentSection';
import Wrapper from '../../../../common/Wrapper';
import { range } from 'lodash';

const Sections = (style): JSX.Element[] => range(30).map((index) => <Section index={index} styling={style} key={index} />);

class ContentArea extends React.PureComponent<any, any> {
	public render = (): JSX.Element => {
		const { styling } = this.props;
		return (
			<div className={styling.contentWrapper}>
				<div className={styling.contentPadder}>{Sections(styling)}</div>;
			</div>
		);
	};
}

export default ContentArea;
