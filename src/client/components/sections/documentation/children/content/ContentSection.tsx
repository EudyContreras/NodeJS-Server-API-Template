import React from 'react';

class ContentSection extends React.PureComponent<any> {

	constructor(props: any) {
		super(props);
	}

	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<article className={style.content}>
				<div></div>
			</article>
		);
	};
} 

export default ContentSection;