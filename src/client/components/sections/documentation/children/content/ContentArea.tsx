import React, { RefObject } from 'react';
import Section from './ContentSection';
import Wrapper from '../../../../common/Wrapper';
import { range } from 'lodash';

const sections = (style): JSX.Element[] => range(30).map((index) => <Section styling={style} key={index} />);

export const ContentArea = ({ self, styling }: { self: RefObject<HTMLDivElement>; styling: any }): JSX.Element => (
	<div ref={self} className={styling.contentWrapper}>
		<Wrapper className={styling.contentPadder}>{sections(styling)}</Wrapper>
	</div>
);

export default ContentArea;
