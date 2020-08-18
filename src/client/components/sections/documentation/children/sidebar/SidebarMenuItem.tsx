import React, { useState } from 'react';
import SidebarSubMenu from './SidebarSubMenu';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { join } from '../../../../utililties/react.utils';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../../../../reducers';

type StateProps = {
	hash: string;
	label: string;
	styling: any;
};

export const SidebarMenuItem: React.FC<StateProps> = React.memo(
	({ hash, label, styling }: StateProps): JSX.Element => {
		const [expanded, setExpanded] = useState(false);
		const iconsLoaded = useSelector<IStateTree>((state) => state.presentation.assets.fonts[MaterialIcons.name] === true);

		const classes = [styling.menuItem];
		const iconClasses = [MaterialIcons.class];

		function openSubMenu(_event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
			setExpanded((state) => !state);
		}

		if (!iconsLoaded) {
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
				<SidebarSubMenu styling={styling} expanded={expanded} parent={hash} />
			</li>
		);
	},
	(_prevProps, _nextProps) => true
);

export default SidebarMenuItem;
