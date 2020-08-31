import React, { RefObject, useRef } from 'react';
import TopSection from './sections/TopSection';
import MainSection from './sections/MainSection';
import MiddleSection from './sections/MiddleSection';
import SideMenuSearch from './SidebarSearch';
import SidebarToggle from './SidebarToggle';
import { useDispatch, useSelector } from 'react-redux';
import { appendWhen } from '../../../../../appliers/style.applier';
import { setHovered } from '../../../../../actions/documentation/sidebar.action';
import { join } from '../../../../utililties/react.utils';
import { IStateTree, IPresentation } from '../../../../../reducers';
import { createSelector } from 'reselect';

const headers = ['Introduction', 'Endpoints'];

type State = {
	isFixed: boolean;
	isHovered: boolean;
	isExpanded: boolean;
	offsetTop: number;
};

type Props = {
	styling: any;
};

export const getSidemenu = createSelector<IStateTree, IPresentation, State>(
	(state: IStateTree): IPresentation => state.presentation,
	(state: IPresentation) => ({
		isFixed: state.navigation.anchored,
		isHovered: state.documentation.sidebar.hovered,
		isExpanded: state.documentation.sidebar.expanded,
		offsetTop: state.navigation.offsetTop
	})
);

const SidebarMenu: React.FC<Props> = React.memo(
	({ styling }: Props): JSX.Element => {
		const { isHovered, isFixed, isExpanded, offsetTop } = useSelector<IStateTree, State>(getSidemenu);
		const dispatch = useDispatch();
		const isHovering = useRef(false);

		function onMouseEnter(): void {
			isHovering.current = true;
			setHovered(true)(dispatch);
		}

		function onMouseExit(): void {
			isHovering.current = false;
			setTimeout(() => {
				if (!isHovering.current) {
					setHovered(false)(dispatch);
				}
			}, 400);
		}

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
			<aside {...common} {...actions}>
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
