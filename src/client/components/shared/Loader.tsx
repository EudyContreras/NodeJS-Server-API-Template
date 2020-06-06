import React from 'react';
import Styles from '../../styles/modules/loader.module.scss';

export default class Loading extends React.PureComponent<any> {
	
	public render = (): JSX.Element => {
		return <div className={Styles.loading}>
			<div></div>
			<div></div>
		</div>;
	};
} 