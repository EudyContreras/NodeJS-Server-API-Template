import React from 'react';
import { join } from '../utililties/react.utils';

interface Props {
	styling: any;
	active: boolean;
	onToggle: ((active: boolean) => void);
}

interface State {
	active: boolean;
}

export default class Toggle extends React.PureComponent<Props, State> {

	constructor(props: any) {
		super(props);
		this.state = {
			active: false
		};
	}

	public render = (): JSX.Element => {
		const style = this.props.styling;
		const classes = [style.toggle];

		if (this.state.active || this.props.active) {
			classes.push(style.toggleActive);
		}

		return (<input className={join(...classes)} type='checkbox'></input>);
	};
}
