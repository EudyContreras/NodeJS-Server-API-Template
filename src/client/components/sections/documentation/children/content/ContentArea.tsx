import React from 'react';
import Section from './ContentSection';
import Wrapper from '../../../../common/Wrapper';

class ContentArea extends React.PureComponent<any, any> {
	public render = (): JSX.Element => {
		const { styling } = this.props;

		return (
			<div className={styling.contentWrapper}>
				<div className={styling.contentPadder}>
					<Section index={10} styling={styling} />
					<Section index={11} styling={styling} />
					<Section index={12} styling={styling} />
					<Section index={13} styling={styling} />
					<Section index={14} styling={styling} />
					<Section index={15} styling={styling} />
					<Section index={16} styling={styling} />
					<Section index={17} styling={styling} />
					<Section index={18} styling={styling} />
					<Section index={19} styling={styling} />
					<Section index={20} styling={styling} />
					<Section index={21} styling={styling} />
					<Section index={22} styling={styling} />
					<Section index={23} styling={styling} />
					<Section index={24} styling={styling} />
					<Section index={25} styling={styling} />
					<Section index={26} styling={styling} />
					<Section index={27} styling={styling} />
					<Section index={28} styling={styling} />
					<Section index={29} styling={styling} />
					<Section index={30} styling={styling} />
					<Section index={31} styling={styling} />
					<Section index={32} styling={styling} />
					<Section index={33} styling={styling} />
					<Section index={34} styling={styling} />
					<Section index={35} styling={styling} />
					<Section index={36} styling={styling} />
					<Section index={37} styling={styling} />
					<Section index={38} styling={styling} />
					<Section index={39} styling={styling} />
					<Section index={40} styling={styling} />
					<Section index={41} styling={styling} />
					<Section index={42} styling={styling} />
					<Section index={43} styling={styling} />
					<Section index={44} styling={styling} />
					<Section index={45} styling={styling} />
					<Section index={46} styling={styling} />
					<Section index={47} styling={styling} />
					<Section index={48} styling={styling} />
					<Section index={49} styling={styling} />
					<Section index={40} styling={styling} />
					<Section index={41} styling={styling} />
				</div>
			</div>
		);
	};
}

export default ContentArea;
