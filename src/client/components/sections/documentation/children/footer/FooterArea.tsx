import React from 'react';

class FooterArea extends React.Component<any, any> {
	
	constructor(props: any) {
		super(props);
	}

	public render = (): JSX.Element => {

		const style = this.props.styling;

		return (
			<footer ref={this.props.self} className={style.footerArea}></footer>
		);
	};
} 

export default FooterArea;