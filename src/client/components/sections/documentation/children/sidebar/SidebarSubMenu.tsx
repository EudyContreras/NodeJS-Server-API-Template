import React, { useRef, useState, useEffect, createRef } from 'react';
import { motion } from 'framer-motion';
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

const variants = {
	open: {
		transition: { staggerChildren: 0.05, delayChildren: 0.01 }
	},
	closed: {
		transition: { staggerChildren: 0, staggerDirection: -1 }
	}
};

type State = {
	hidden: boolean;
	loaded: boolean;
	height: number;
};

type StateProps = {
	animate?: boolean;
	expanded: boolean;
	styling: any;
	parent: string;
};

const InitialProps: StateProps = {
	expanded: false,
	animate: true,
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

const isEqual = (prevProps: Readonly<StateProps>, nextProps: Readonly<StateProps>): boolean => prevProps?.expanded === nextProps?.expanded;

const SidebarSubMenu: React.FC<StateProps> = React.memo(({ styling, expanded, parent, animate }: StateProps = InitialProps): JSX.Element => {
	const menuRef = useRef<HTMLUListElement>(null);
	const [state, setState] = useState<State>({
		hidden: true,
		loaded: false,
		height: 0
	});

	const classes = [styling.subMenu];

	function onHidden(): void {
		setState(
			(state: State): State => ({
				...state,
				hidden: true
			})
		);
	}

	function onShown(): void {
		setState(
			(state: State): State => ({
				...state,
				hidden: false
			})
		);
	}

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
		const style = expanded ? getStyle(state.height) : state.hidden ? hiddenStyle() : getStyle(0);
		const onEnd = expanded ? onShown : onHidden;
		if (animate) {
			classes.push(styling.smExpanded);
		}
		return (
			<motion.ul variants={variants} animate={expanded ? 'open' : 'closed'} ref={menuRef} onTransitionEnd={onEnd} className={join(...classes)} style={style}>
				{listItems}
			</motion.ul>
		);
	}
	return (
		<motion.ul variants={variants} ref={menuRef} className={join(...classes)}>
			{listItems}
		</motion.ul>
	);
}, isEqual);

export default SidebarSubMenu;
