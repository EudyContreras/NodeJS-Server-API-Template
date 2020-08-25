import React from 'react';
import Section from './ContentSection';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IStateTree, IPresentation } from '../../../../../reducers';
import { join } from '../../../../utililties/react.utils';

type Selection = {
	isExpanded: boolean;
};

const getSelection = createSelector<IStateTree, IPresentation, Selection>(
	(state: IStateTree) => state.presentation,
	(state: IPresentation): Selection => ({ isExpanded: !state.documentation.sidebar.expanded })
);

const ContentArea: React.FC<any> = React.memo(
	({ styling }: any): JSX.Element => {
		const { isExpanded } = useSelector<IStateTree, Selection>(getSelection);

		const classes = [styling.contentArea, isExpanded ? styling.expanded : styling.normal];

		return (
			<div className={join(...classes)}>
				<div className={styling.contentPadder}>
					<Section index={0} styling={styling} />
					<Section index={1} styling={styling} />
					<Section index={2} styling={styling} />
					<Section index={3} styling={styling} />
					<Section index={4} styling={styling} />
					<Section index={5} styling={styling} />
					<Section index={6} styling={styling} />
					<Section index={7} styling={styling} />
					<Section index={8} styling={styling} />
					<Section index={9} styling={styling} />
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
				</div>
			</div>
		);
	}
);

export default ContentArea;
