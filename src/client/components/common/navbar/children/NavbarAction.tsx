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

type State = {
	isInstalled: boolean;
};

const getSelection = createSelector<IStateTree, IStateTree, State>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree) => ({
		isInstalled: state.generalData.appData.installed
	})
);

export const Action: React.FC<StateProps> = ({ styling }: StateProps): JSX.Element => {
	const dispatch = useDispatch();
	const { isInstalled } = useSelector<IStateTree, State>(getSelection);

	function initInstallation(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		useRippple(event);

		InstallHelper.showPrompt();
	}

	const classes = [styling.installButton];
	const iconsClasses = [MaterialIcons.class, styling.installButtonIcon, styling.pendingIcon];
	const icon = isInstalled ? MaterialIcons.icons.MORE_VERTICAL : MaterialIcons.icons.ADD;

	useStyles(rippleStyle);
	useEffect(() => {
		if (!InstallHelper.hasInstallInfo()) {
			Dispatchers.setInstalled(true)(dispatch);
		} else {
			Dispatchers.setInstalled(InstallHelper.isInstalled())(dispatch);
		}
		InstallHelper.register((state: boolean) => {
			Dispatchers.setInstalled(state)(dispatch);
		});
	}, [isInstalled]);

	return (
		<div onClick={initInstallation} className={join(...classes)} title="Install">
			<i id={MaterialIcons.id} className={join(...iconsClasses)}>
				{icon}
			</i>
		</div>
	);
};

export default Action;
