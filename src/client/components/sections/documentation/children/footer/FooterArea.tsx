import React from 'react';

interface Props {
	self: any;
	styling: any;
}

class FooterArea extends React.Component<Props, any> {
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