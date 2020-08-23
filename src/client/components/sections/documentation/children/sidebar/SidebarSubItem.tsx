import React, { RefObject } from 'react';
import { join } from '../../../../utililties/react.utils';
import { motion, Variants } from 'framer-motion';
import { MaterialIcons } from '../../../../../stores/icon.library';

type StateProps = {
	hash: string;
	label: string;
	method: string;
	styling: any;
};

const variants: Variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			y: { stiffness: 1000, velocity: -100, duration: 0.25, ease: [0, 0, 0.25, 1] }
		}
	},
	closed: {
		y: -30,
		opacity: 0,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	}
};

const SidebarSubItem: React.FC<StateProps> = React.memo(
	(props: StateProps): JSX.Element => {
		const { hash, label, method, styling } = props;

		const classes = [styling.httpMethod, styling.httpAll];
		const className = join(...classes);

		return (
			<motion.li variants={variants} whileHover={{ scale: 1 }} whileTap={{ scale: 0.95 }} className={styling.subMenuItem}>
				<div className={styling.subMenuItemWrapper}>
					<h3 className={className}>{method}</h3>
					<a className={styling.truncate} href={hash}>
						{label}
					</a>
				</div>
				<i className={MaterialIcons.class}>{MaterialIcons.icons.CHEV_RIGHT}</i>
			</motion.li>
		);
	}
);

export default SidebarSubItem;
