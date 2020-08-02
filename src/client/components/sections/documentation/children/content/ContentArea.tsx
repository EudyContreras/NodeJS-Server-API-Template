import React from 'react';
import Section from './ContentSection';
import Wrapper from '../../../../common/Wrapper';
import { range } from 'lodash';

const Sections = (style): JSX.Element[] => range(30).map((index) => <Section index={index} styling={style} key={index} />);

class ContentArea extends React.PureComponent<any, any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return <div className={style.contentWrapper}>{Sections(style)}</div>;
	};
}

export default ContentArea;
