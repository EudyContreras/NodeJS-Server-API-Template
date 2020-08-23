import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { join, appendWhen } from '../../../../appliers/style.applier';
import { Dispatchers } from '../../../../actions/common/navigation.action';
import { IStateTree } from '../../../../reducers';
import { createSelector } from 'reselect';
import { LinkInfo } from '../../../Routes';
import { Link } from 'react-router-dom';
import { showLoader, hideLoader } from '../../../../actions/common/loader.action';

type StateProps = {
	location: string;
	tabInfo: LinkInfo;
	children?: JSX.Element | JSX.Element[];
	styling: any;
};

type StatePropsSimple = {
	target: string;
	children?: JSX.Element | JSX.Element[];
};

type Selection = {
	loadedRoutes: any;
	isLoaderActive: boolean;
	activeTab: LinkInfo | null;
};

const getSelection = createSelector<IStateTree, IStateTree, Selection>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree): Selection => ({
		activeTab: state.presentation.navigation.acitiveTab,
		loadedRoutes: state.generalData.routeLoader.loadedRoutes,
		isLoaderActive: state.generalData.routeLoader.isActive
	})
);

export const NavbarLink: React.FC<StateProps> = React.memo(
	({ styling, tabInfo, location }: StateProps): JSX.Element => {
		const dispatch = useDispatch();
		const classes = [styling.navLink];

		const { isLoaderActive, loadedRoutes, activeTab } = useSelector<IStateTree, Selection>(getSelection);

		appendWhen(classes, activeTab === null && tabInfo.link === location, styling.navLinkActive);
		appendWhen(classes, activeTab !== null && tabInfo.label === activeTab.label, styling.navLinkActive);

		function manageLoader(tab: LinkInfo): void {
			if (isLoaderActive) {
				hideLoader()(dispatch);
			}
			const empty = loadedRoutes.length <= 0;
			if (empty || !loadedRoutes.includes(tab.link)) {
				if (tab.lazyLoaded) {
					showLoader()(dispatch);
				}
			}
		}

		function handleLinkClick(event): void {
			if (tabInfo == null) {
				return Dispatchers.setActiveTab(tabInfo)(dispatch);
			}

			if (activeTab === null || activeTab.label !== tabInfo.label) {
				manageLoader(tabInfo);
				Dispatchers.setActiveTab(tabInfo)(dispatch);
			}
		}

		const className = join(...classes);

		return (
			<Link className={className} onClick={handleLinkClick} to={tabInfo.link}>
				{tabInfo.label}
			</Link>
		);
	},
	(prevProps, nextProps) => prevProps.tabInfo === nextProps.tabInfo
);

export const NavbarLinkSimple: React.FC<StatePropsSimple> = React.memo(
	(props: StatePropsSimple): JSX.Element => {
		const dispatch = useDispatch();
		const { isLoaderActive, loadedRoutes, activeTab } = useSelector<IStateTree, Selection>(getSelection);
		const tabInfo: LinkInfo = {
			label: '',
			link: props.target,
			lazyLoaded: false
		};

		function manageLoader(tab: LinkInfo): void {
			if (isLoaderActive) {
				hideLoader()(dispatch);
			}
			const empty = loadedRoutes.length <= 0;
			if (empty || !loadedRoutes.includes(tab.link)) {
				if (tab.lazyLoaded) {
					showLoader()(dispatch);
				}
			}
		}

		function handleLinkClick(): void {
			if (activeTab !== null) {
				manageLoader(tabInfo);
				return Dispatchers.setActiveTab(null)(dispatch);
			}
		}

		return (
			<Link onClick={handleLinkClick} to={tabInfo.link}>
				{props.children}
			</Link>
		);
	},
	(prevProps, nextProps) => prevProps.target === nextProps.target
);

export default NavbarLink;
