import React, { useEffect, useState, RefObject, useRef } from 'react';
import TopSection from './sections/TopSection';
import MainSection from './sections/MainSection';
import MiddleSection from './sections/MiddleSection';
import SideMenuSearch from './SidebarSearch';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from '../../../../utililties/comparer.utils';
import { appendWhen } from '../../../../../appliers/style.applier';
import { getSidemenu } from '../../../../../selectors/sidemenu.selector';
import { setHovered, setFixed } from '../../../../../actions/documentation/sidebar.action';
import { join } from '../../../../utililties/react.utils';
import SidebarToggle from './SidebarToggle';
import { IStateTree, IPresentation } from '../../../../../reducers';
import { ISideMenu } from '../../../../../reducers/documentation/sidebar.reducer';

const headers = ['Introduction', 'Endpoints'];

interface StateProps {
	fixed: boolean;
	hovered: boolean;
	expanded: boolean;
}

type Props = {
	self: RefObject<HTMLElement>;
	styling: any;
};

const SidebarMenu: React.FC<Props> = React.memo(
	({ styling, self }: Props): JSX.Element => {
		const { isHovered, isFixed, isExpanded, offsetTop } = getSidemenu(useSelector<IStateTree, IPresentation>((state) => state.presentation));
		const dispatch = useDispatch();
		const isHovering = useRef(false);

		const onMouseEnter = (): void => {
			isHovering.current = true;
			setHovered(true)(dispatch);
		};

		const onMouseExit = (): void => {
			isHovering.current = false;
			setTimeout(() => {
				if (!isHovering.current) {
					setHovered(false)(dispatch);
				}
			}, 400);
		};

		const styles = [styling.sideMenu];
		const cssTop = isFixed ? offsetTop : 'auto';

		appendWhen(styles, !isExpanded, styling.sideMenuClosed);
		appendWhen(styles, !isExpanded && isHovered, styling.sideMenuPeek);
		appendWhen(styles, isFixed, styling.fixed);

		const common = {
			style: { top: cssTop },
			className: join(...styles)
		};

		const actions = {
			onMouseEnter: onMouseEnter,
			onMouseLeave: onMouseExit
		};

		return (
			<aside ref={self} {...common} {...actions}>
				<div className={styling.sideMenuContainer}>
					<TopSection styling={styling} />
					<SideMenuSearch styling={styling} />
					<MiddleSection styling={styling} header={headers[0]} />
					<MainSection styling={styling} header={headers[1]} />
				</div>
				<SidebarToggle styling={styling} />
			</aside>
		);
	}
);

export default SidebarMenu;
