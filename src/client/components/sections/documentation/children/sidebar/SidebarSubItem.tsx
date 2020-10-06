import React from 'react';
import { join } from '../../../../utililties/react.utils';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { IStateTree } from '../../../../../reducers';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

type StateProps = {
	hash: string;
	label: string;
	method: string;
	styling: any;
};

type Selection = {
	fontsLoaded: boolean;
};

const getSelection = createSelector<IStateTree, IStateTree, Selection>(
	(state: IStateTree) => state,
	(state: IStateTree): Selection => ({
		fontsLoaded: state.presentation.assets.fonts[MaterialIcons.name] === true
	})
);

const SidebarSubItem: React.FC<StateProps> = React.memo(
	(props: StateProps): JSX.Element => {
		const { hash, label, method, styling } = props;
		const { fontsLoaded } = useSelector<IStateTree, Selection>(getSelection);

		const iconClasses = [MaterialIcons.class];
		const itemClasses = [styling.httpMethod, styling.httpAll];

		if (!fontsLoaded) {
			iconClasses.push(styling.pendingIcon);
		}

		const itemClassName = join(...itemClasses);
		const iconClassName = join(...iconClasses);

		return (
			<li className={styling.subMenuItem}>
				<div className={styling.subMenuItemWrapper}>
					<h3 className={itemClassName}>{method}</h3>
					<a className={styling.truncate} href={hash}>
						{label}
					</a>
				</div>
				<i className={iconClassName}>{MaterialIcons.icons.CHEV_RIGHT}</i>
			</li>
		);
	}
);

export default SidebarSubItem;
