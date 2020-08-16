import React, { useRef, useState, useEffect } from 'react';
import SidebarSubItem from './SidebarSubItem';
import { join } from '../../../../utililties/react.utils';

const links = [
	{
		link: 'register-user',
		label: 'Register a user',
		method: { label: 'PUT' }
	},
	{
		link: 'get-all-user',
		label: 'Get all users',
		method: { label: 'GET' }
	},
	{
		link: 'update-user',
		label: 'Update user',
		method: { label: 'PAT' }
	},
	{
		link: 'delete-user',
		label: 'Delete user',
		method: { label: 'DEL' }
	}
];

type State = {
	hidden: boolean;
	loaded: boolean;
	height: number;
};

type StateProps = {
	expanded: boolean;
	styling: any;
	parent: string;
};

const InitialProps: StateProps = {
	expanded: false,
	parent: '',
	styling: {}
};

const hiddenStyle = (): any => ({
	height: 0,
	position: 'absolute',
	visibility: 'hidden'
});

const getStyle = (height: number): any => ({
	height: height,
	position: 'relative',
	visibility: 'visible'
});

const SidebarSubMenu: React.FC<StateProps> = ({ styling, expanded, parent }: StateProps = InitialProps): JSX.Element => {
	const menuRef = useRef<HTMLUListElement>(null);
	const [state, setState] = useState<State>({
		hidden: true,
		loaded: false,
		height: 0
	});

	const classes = [styling.subMenu];

	const onHidden = (): void => {
		setState(
			(state: State): State => ({
				...state,
				hidden: true
			})
		);
	};

	const onShown = (): void => {
		setState(
			(state: State): State => ({
				...state,
				hidden: false
			})
		);
	};

	useEffect(() => {
		const menu = menuRef.current;
		setState(
			(state: State): State => ({
				...state,
				loaded: true,
				height: (menu && menu.clientHeight) || 0
			})
		);
	}, [menuRef]);

	const listItems = links.map((x, index) => (
		<SidebarSubItem key={index} hash={`${parent}/${x.link}`} label={x.label} styling={styling} method={x.method.label} />
	));

	if (state.loaded) {
		classes.push(styling.smExpanded);
		if (expanded) {
			return (
				<ul ref={menuRef} onTransitionEnd={onShown} className={join(...classes)} style={getStyle(state.height)}>
					{listItems}
				</ul>
			);
		} else {
			const styling = state.hidden ? hiddenStyle() : getStyle(0);
			return (
				<ul ref={menuRef} onTransitionEnd={onHidden} className={join(...classes)} style={styling}>
					{listItems}
				</ul>
			);
		}
	}
	return (
		<ul ref={menuRef} className={join(...classes)}>
			{listItems}
		</ul>
	);
};

export default SidebarSubMenu;
