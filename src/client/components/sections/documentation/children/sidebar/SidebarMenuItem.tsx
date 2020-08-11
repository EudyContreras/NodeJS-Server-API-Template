import React, { useState } from 'react';
import Wrapper from '../../../../common/Wrapper';
import SidebarSubMenu from './SidebarSubMenu';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { join } from '../../../../utililties/react.utils';
import { useSelector } from 'react-redux';
import { IStateTree } from '../../../../../reducers';

export const SidebarMenuItem: React.FC<any> = React.memo(
	(props: any): JSX.Element => {
		const [expanded, setExpanded] = useState(false);
		const iconsLoaded = useSelector<IStateTree>((state) => state.presentation.assets.fonts[MaterialIcons.name] === true);

		const hash = props.hash;
		const label = props.label;
		const style = props.styling;

		const classes = [style.menuItem];
		const iconClasses = [MaterialIcons.class];

		const openSubMenu = (): void => {
			setExpanded((state) => !state);
		};

		if (!iconsLoaded) {
			iconClasses.push(style.pendingIcon);
		}

		if (expanded) {
			classes.push(style.active);
		}

		return (
			<li className={style.menuItemWrapper}>
				<Wrapper className={join(...classes)} onClick={openSubMenu}>
					<a href={hash}>{label}</a>
					<i className={join(...iconClasses)}>{MaterialIcons.icons.CHEV_RIGHT}</i>
				</Wrapper>
				<SidebarSubMenu styling={style} expanded={expanded} />
			</li>
		);
	},
	(prevProps, nextProps) => true
);

export default SidebarMenuItem;
