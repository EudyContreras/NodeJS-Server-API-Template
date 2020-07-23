import React from 'react';
import Wrapper from '../../../../shared/Wrapper';
import SidebarSubMenu from './SidebarSubMenu';
import FontFaceObserver from 'fontfaceobserver';
import { MaterialIcons } from '../../../../../stores/icon.library';
import { join } from '../../../../utililties/react.utils';

interface State {
	expanded: boolean;
	iconLoaded: boolean;
}

class SidebarMenuItem extends React.PureComponent<any, State> {
	private _isMounted: boolean;

	constructor(props: any) {
		super(props);
		this._isMounted = false;
		this.state = {
			expanded: false,
			iconLoaded: false
		};
	}

	private openSubMenu = (): void => {
		if (this._isMounted) {
			this.setState((state: State) => ({
				expanded: !state.expanded
			}));
		}
	};

	public componentWillUnmount = (): void => {
		this._isMounted = false;
	};

	public componentDidMount = (): void => {
		this._isMounted = true;
		const font = new FontFaceObserver('Material Icons');

		font
			.load()
			.then(() => {
				if (this._isMounted) {
					this.setState({
						iconLoaded: true
					});
				}
			})
			.catch((error) => {
				console.log('Something went wrong!', error);
			});
	};

	public render = (): JSX.Element => {
		const hash = this.props.hash;
		const label = this.props.label;
		const style = this.props.styling;

		const classes = [style.menuItem];
		const iconClasses = [MaterialIcons.class];

		if (this.state.expanded) {
			classes.push(style.active);
		}

		if (!this.state.iconLoaded) {
			iconClasses.push(style.loadable);
		} else {
			iconClasses.push(style.loaded);
		}

		return (
			<li className={style.menuItemWrapper}>
				<Wrapper className={join(...classes)} onClick={this.openSubMenu}>
					<a href={hash}>{label}</a>
					<i className={join(...iconClasses)}>{MaterialIcons.icons.CHEV_RIGHT}</i>
				</Wrapper>
				<SidebarSubMenu styling={style} expanded={this.state.expanded} />
			</li>
		);
	};
}

export default SidebarMenuItem;
