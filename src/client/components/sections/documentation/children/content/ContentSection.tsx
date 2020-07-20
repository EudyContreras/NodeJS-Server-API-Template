import React from 'react';

class ContentSection extends React.PureComponent<any> {
	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<article className={style.content}>
				<div />
			</article>
		);
	};
}

export default ContentSection;
