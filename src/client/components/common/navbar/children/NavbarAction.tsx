import React, { useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { MaterialIcons } from '../../../../stores/icon.library';
import { useRippple, rippleStyle } from '../../../../appliers/ripple.applier';
import { useDispatch, useSelector } from 'react-redux';
import { join } from '../../../../appliers/style.applier';
import * as InstallHelper from '../../../../../workers/helpers/intallation.helper';
import { Dispatchers } from '../../../../actions/common/application/appdata.action';
import { IStateTree } from '../../../../reducers';
import { createSelector } from 'reselect';

type StateProps = {
	styling: any;
};

type Selection = {
	isInstalled: boolean;
	fontsLoaded: boolean;
};

const getSelection = createSelector<IStateTree, IStateTree, Selection>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree) => ({
		fontsLoaded: state.presentation.assets.fonts[MaterialIcons.name] === true,
		isInstalled: state.generalData.appData.installed
	})
);

export const Action: React.FC<StateProps> = ({ styling }: StateProps): JSX.Element => {
	const dispatch = useDispatch();
	const { isInstalled, fontsLoaded } = useSelector<IStateTree, Selection>(getSelection);

	function initInstallation(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		useRippple(event);
		InstallHelper.showPrompt();
	}

	const classes = [styling.installButton];
	const iconsClasses = [MaterialIcons.class, styling.installButtonIcon];
	const icon = isInstalled ? MaterialIcons.icons.MORE_VERTICAL : MaterialIcons.icons.ADD;

	if (!fontsLoaded) {
		iconsClasses.push(styling.pendingIcon);
	}
	useStyles(rippleStyle);

	useEffect(() => {
		InstallHelper.hasInstallInfo().then((isInstalled) => {
			if (isInstalled === null) {
				Dispatchers.setInstalled(false)(dispatch);
			} else {
				Dispatchers.setInstalled(isInstalled)(dispatch);
			}
		});
		return InstallHelper.registerListener((state: boolean) => {
			Dispatchers.setInstalled(state)(dispatch);
		});
	}, [isInstalled]);

	return (
		<div onClick={initInstallation} className={join(...classes)} title='Install'>
			<i id={MaterialIcons.id} className={join(...iconsClasses)}>
				{icon}
			</i>
		</div>
	);
};

export default Action;
