import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { useRippple, rippleStyle } from '../../../../../appliers/ripple.applier';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { toggleAction } from '../../../../../actions/documentation/sidebar.action';
import { join } from '../../../../utililties/react.utils';
import { useDispatch, useSelector } from 'react-redux';
import { IStateTree } from '../../../../../reducers';
import { createSelector } from 'reselect';

type StateProps = {
	styling: any;
};

type Selection = {
	isLocked: boolean;
	isHidden: boolean;
	fontsLoaded: boolean;
};

const getSelection = createSelector<IStateTree, IStateTree, Selection>(
	(state: IStateTree) => state,
	(state: IStateTree): Selection => ({
		isLocked: state.presentation.documentation.sidebar.toggle.locked,
		isHidden: state.presentation.documentation.sidebar.toggle.hidden,
		fontsLoaded: state.presentation.assets.fonts[MaterialIcons.name] === true
	})
);

const SidebarToggle: React.FC<StateProps> = ({ styling }: StateProps): JSX.Element => {
	const dispatch = useDispatch();
	const { isLocked, isHidden, fontsLoaded } = useSelector<IStateTree, Selection>(getSelection);

	const elementTitle = isLocked ? 'collapse' : 'expand';
	const iconText = isLocked ? MaterialIcons.icons.CHEV_RIGHT : MaterialIcons.icons.MENU;

	function toggleSidebar(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		useRippple(event);
		dispatch(toggleAction);
	}

	const elementProps = {
		value: isLocked,
		title: elementTitle,
		onClick: toggleSidebar
	};

	const toggleClasses = [styling.expand];
	const toggleIconClasses = [MaterialIcons.class, styling.expandIcon];

	if (!fontsLoaded) {
		toggleIconClasses.push(styling.pendingIcon);
	}

	if (isHidden) {
		toggleClasses.push(styling.expandHidden);
	}

	if (isLocked) {
		toggleClasses.push(styling.expandActive);
	} else {
		toggleIconClasses.push(styling.expandIconActive);
	}

	useStyles(rippleStyle);

	return (
		<div className={join(...toggleClasses)} {...elementProps}>
			<i className={join(...toggleIconClasses)}>{iconText}</i>
		</div>
	);
};

export default SidebarToggle;
