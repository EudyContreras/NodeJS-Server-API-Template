import React, { createRef, RefObject, Fragment } from 'react';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';
import stickEffect, { ScrollListener } from '../../../appliers/sticky.applier';

interface State {
	sidebarFixed: boolean;
}

class DocsPage extends React.PureComponent<any, State> {
 
	private readonly footer: RefObject<HTMLElement>;
	private readonly sandbox: RefObject<HTMLElement>;
	private readonly content: RefObject<HTMLElement>;

	constructor(props: any) {
		super(props);
		this.footer = createRef();
		this.sandbox = createRef();
		this.content = createRef();
	}

	public componentDidMount(): void {
		const style = this.props.styling;
		const footer = this.footer.current;
		
		const sandBox = this.sandbox.current;
		
		const sandboxListener = new ScrollListener(sandBox!, footer, 10);

		// const sidebarListener = new ScrollListener(sideBar!, null ,10, (fixed: boolean): void => {
			
		// });

		// stickEffect(style, sandboxListener);
	}

	public render(): JSX.Element {
		const style = this.props.styling;
		return (
			<Fragment>
				<SideMenu styling={style} />
				<SandBox self={this.sandbox} styling={style} />
				<ContentArea self={this.content} styling={style} />
				<FooterArea self={this.footer} styling={style} />
			</Fragment>
		);
	}
} 

export default DocsPage;