import React, { useRef, useEffect } from 'react';
import Action from './children/NavbarAction';
import { useDispatch, useSelector } from 'react-redux';
import { IStateTree } from '../../../reducers';
import { appendWhen, join } from '../../../appliers/style.applier';
import { Dispatchers } from '../../../actions/common/navigation.action';
import { useViewportScroll } from 'framer-motion';
// import { useViewpoVrtScroll } from 'framer-motion';
import { createSelector } from 'reselect';
import NavbarLink, { NavbarLinkSimple } from './children/NavbarLink';
import { LinkInfo } from '../../Routes';

interface StateProps {
	routings: LinkInfo[];
	styling: any;
	location: string;
	brandName?: string;
}

type Props = StateProps;

type Selection = {
	isAnchored: boolean;
	isMouseInside: boolean | null;
};

const getSelection = createSelector<IStateTree, IStateTree, Selection>(
	(state: IStateTree): IStateTree => state,
	(state: IStateTree): Selection => ({
		isAnchored: state.presentation.navigation.anchored,
		isMouseInside: state.presentation.navigation.mouseInside
	})
);

export const Navbar: React.FC<Props> = React.memo(
	(props: Props): JSX.Element => {
		const dispatch = useDispatch();
		const topPosRef = useRef<number>();
		const hoverRef = useRef<boolean>(false);
		const anchorRef = useRef<boolean>(false);
		const navbarRef = useRef<HTMLElement>(null);
		const { scrollY } = useViewportScroll();

		const { isAnchored, isMouseInside } = useSelector<IStateTree, Selection>(getSelection);
		const { styling, routings, location } = props;
		const classes = [styling.nav];

		anchorRef.current = isAnchored;

		function onMouseEnter(): void {
			if (!isAnchored) {
				return;
			}
			hoverRef.current = true;
			if (isAnchored) {
				Dispatchers.setMouseInside(true)(dispatch);
			}
		}

		function onMouseExit(): void {
			hoverRef.current = false;
			setTimeout(() => {
				if (hoverRef.current === false) {
					if (isAnchored) {
						Dispatchers.setMouseInside(false)(dispatch);
					}
				}
			}, 300);
		}

		useEffect(() => {
			const navbar = navbarRef.current;
			function anchor(scrollValue: number): void {
				const isAnchored = anchorRef.current === true;
				const top = topPosRef.current || 0;

				if (scrollValue >= top) {
					!isAnchored && Dispatchers.setAnchored(true)(dispatch);
				} else {
					isAnchored && Dispatchers.setAnchored(false)(dispatch);
				}
			}

			if (navbar) {
				const margin = 15;
				const topOffset = -(navbar.clientHeight - margin);

				const navScroll = navbar.getBoundingClientRect().top;
				const bodyScroll = document.body.getBoundingClientRect().top;

				const topPos = Math.abs(bodyScroll) + (navScroll - topOffset);

				topPosRef.current = topPos;

				Dispatchers.setOffsetTop(margin - 1, navbar.clientHeight)(dispatch);

				scrollY.onChange(anchor);
			}
			return (): any => {
				scrollY.clearListeners();
				scrollY.destroy();
			};
		}, [navbarRef, topPosRef]);

		const mouseInside = isMouseInside === true;
		const mouseOutside = isMouseInside === false;

		appendWhen(classes, isAnchored, styling.navSticky);
		appendWhen(classes, isAnchored && mouseInside, styling.navTransition, styling.navPeeky);
		appendWhen(classes, isAnchored && mouseOutside, styling.navTransition);

		const properties = {
			ref: navbarRef,
			className: join(...classes),
			onMouseEnter: onMouseEnter,
			onMouseLeave: onMouseExit
		};

		const navLinks = routings.map((element: LinkInfo, idx: number) => (
			<li key={idx}>
				<NavbarLink styling={styling} tabInfo={element} location={location} />
			</li>
		));

		return (
			<header {...properties}>
				<NavbarLinkSimple target="/">
					<div className={styling.navLogo} title="Home">
						<div className={styling.status}></div>
					</div>
				</NavbarLinkSimple>
				<ul>{navLinks}</ul>
				<Action styling={styling} />
			</header>
		);
	}
);

export default Navbar;
