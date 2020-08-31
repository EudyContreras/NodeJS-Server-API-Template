import React from 'react';
import VersionInfo from './VersionInfo';

type StateProps = {
	styling: any;
};

export const TopSection: React.FC<any> = React.memo(
	(props: StateProps): JSX.Element => {
		const style = props.styling;

		return (
			<div className={style.topSection}>
				<VersionInfo styling={style} />
			</div>
		);
	}
);

export default TopSection;
