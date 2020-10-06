import React, { useState } from 'react';
import SidebarSubMenu from './SidebarSubMenu';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { join } from '../../../../utililties/react.utils';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../../../../reducers';
import { useLocation } from 'react-router';
import { createSelector } from 'reselect';

type StateProps = {
	hash: string;
	label: string;
	styling: any;
};

type Selection = {
	fontsLoaded: boolean;
};

const getSelection = createSelector<IStateTree, IStateTree, Selection>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree) => ({
		fontsLoaded: state.presentation.assets.fonts[MaterialIcons.name] === true
	})
);

export const SidebarMenuItem: React.FC<StateProps> = React.memo(
	({ hash, label, styling }: StateProps): JSX.Element => {
		const location = useLocation();
		const hasHash = location.hash === hash;
		const [expanded, setExpanded] = useState(hasHash);
		const { fontsLoaded } = useSelector<IStateTree, Selection>(getSelection);

		const classes = [styling.menuItem];
		const iconClasses = [MaterialIcons.class];

		function openSubMenu(_event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
			setExpanded((state) => !state);
		}

		if (!fontsLoaded) {
			iconClasses.push(styling.pendingIcon);
		}

		if (expanded) {
			classes.push(styling.active);
		}

		return (
			<li className={styling.menuItemWrapper}>
				<div className={join(...classes)} onClick={openSubMenu}>
					<a href={hash}>{label}</a>
					<i className={join(...iconClasses)}>{MaterialIcons.icons.CHEV_RIGHT}</i>
				</div>
				<SidebarSubMenu styling={styling} expanded={expanded} animate={true} parent={hash} />
			</li>
		);
	}
);

export default SidebarMenuItem;
