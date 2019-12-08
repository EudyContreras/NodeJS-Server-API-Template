import React from 'react';
import Wrapper from '../../../../shared/Wrapper';
import SidebarSubMenu from './SidebarSubMenu';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { join } from '../../../../utililties/react.utils';

interface State {
	expanded: boolean;
}

class SidebarMenuItem extends React.PureComponent<any, State>{

	constructor(props: any) {
		super(props);
		this.state = {
			expanded: false
		};
	}

	private openSubMenu = (): void => {
		this.setState((state: State) => ({
			expanded: !state.expanded
		}));
	};

	public render = (): JSX.Element => {
		const hash = this.props.hash;
		const label = this.props.label;
		const style = this.props.styling;

		const classes = [style.menuItem];

		if (this.state.expanded) {
			classes.push(style.active);
		}

		return (
			<li className={join(...classes)} onClick={this.openSubMenu}>
				<a href={hash}>{label}</a>
				<i className={MaterialIcons.CLASS}>{MaterialIcons.icons.CHEV_RIGHT}</i>
				<SidebarSubMenu styling={style} expanded={this.state.expanded}/>
			</li>
		);
	};
}

export default SidebarMenuItem;