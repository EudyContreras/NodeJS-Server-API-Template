import React from 'react';
import rippleEffect from '../../../../../appliers/ripple.applier';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { toggleAction } from '../../../../../actions/documentation/sidebar.action';
import { IToggle } from '../../../../../reducers/documentation/sidebar.reducer';
import { join } from '../../../../utililties/react.utils';
import { useDispatch, useSelector } from 'react-redux';
import { IStateTree } from '../../../../../reducers';

type StateProps = {
	styling: any;
};

const SidebarToggle: React.FC<StateProps> = ({ styling }: StateProps): JSX.Element => {
	const dispatch = useDispatch();
	const { locked, hidden } = useSelector<IStateTree, IToggle>((state) => state.presentation.documentation.sidebar.toggle);

	const elementTitle = locked ? 'collapse' : 'expand';
	const iconText = locked ? MaterialIcons.icons.CHEV_RIGHT : MaterialIcons.icons.MENU;

	const toggleSidebar = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
		rippleEffect(event, styling);
		dispatch(toggleAction);
	};

	const elementProps = {
		value: locked,
		title: elementTitle,
		onClick: toggleSidebar
	};

	const toggleClasses = [styling.expand];
	const toggleIconClasses = [MaterialIcons.class, styling.expandIcon];

	if (hidden) {
		toggleClasses.push(styling.expandHidden);
	}

	if (locked) {
		toggleClasses.push(styling.expandActive);
	} else {
		toggleIconClasses.push(styling.expandIconActive);
	}

	return (
		<div className={join(...toggleClasses)} {...elementProps}>
			<i className={join(...toggleIconClasses)}>{iconText}</i>
		</div>
	);
};

export default SidebarToggle;
