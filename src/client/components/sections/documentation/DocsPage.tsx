import { connect } from 'react-redux';
import React, { createRef, RefObject, Fragment } from 'react';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';

import {
	DispatchProps,
	Dispatchers
} from '../../../actions/documentation/section.action';

interface StateProps {
	offsetTop: number;
	sandboxFixedTop: boolean;
	sandboxFixedBottom: boolean;
}

type Props = StateProps & DispatchProps & any;

class DocsPage extends React.Component<Props> {

	private readonly footer: RefObject<HTMLElement>;
	private readonly sidebar: RefObject<HTMLElement>;
	private readonly sandbox: RefObject<HTMLElement>;
	private readonly content: RefObject<HTMLElement>;

	constructor(props: any) {
		super(props);
		this.footer = createRef();
		this.sidebar = createRef();
		this.sandbox = createRef();
		this.content = createRef();
	}

	public shouldComponentUpdate = (): any => false;

	private getBottomPosition = (): number => {
		const body = document.body;
		const sandbox = this.sandbox.current!;
		const footer = this.footer.current!;

		const scroll = body.getBoundingClientRect().top;
		const scrollBottom = footer.getBoundingClientRect().top - sandbox.getBoundingClientRect().height;

		return Math.abs(scroll) + (scrollBottom);
	};

	private handleResize = (): void => {
		const bottomPosition = this.getBottomPosition();

		this.applyInitialValues(bottomPosition);
	};

	private handleScroll = (offsetBottom = 0): void => {
		const fixedTop = this.props.sandboxFixedTop;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		const bottomFixed = this.props.sandboxFixedBottom;

		if (scroll > offsetBottom) {
			if (!bottomFixed && fixedTop) {
				this.props.setSandboxFixedBottom(true);
			}
		} else if (scroll <= offsetBottom) {
			if (bottomFixed) {
				this.props.setSandboxFixedBottom(false);
			}
		}
	};

	public componentDidMount = (): void => {
		const bottomPosition = this.getBottomPosition();

		this.applyInitialValues(bottomPosition);

		window.onscroll = (): void => this.handleScroll(bottomPosition - this.props.offsetTop);
		window.onresize = (): void => this.handleResize();
	};

	private applyInitialValues = (bottomPosition: number): void => {
		const fixedTop = this.props.sandboxFixedTop;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (!fixedTop) {
			if (scroll >= bottomPosition) {
				this.props.setAll(true, false, true, bottomPosition);
			} else {
				this.props.setAll(false, false, false, bottomPosition);
			}
		}
	};

	public render = (): JSX.Element => {
		const style = this.props.styling;

		return (
			<Fragment>
				<SideMenu self={this.sidebar} styling={style} />
				<SandBox self={this.sandbox} styling={style} />
				<ContentArea self={this.content} styling={style} />
				<FooterArea self={this.footer} styling={style} />
			</Fragment>
		);
	};
}

const mapStateToProps = (state: any): any => ({
	offsetTop: state.presentation.navigation.offsetTop,
	sandboxFixedTop: state.presentation.documentation.sandbox.fixedTop,
	sandboxFixedBottom: state.presentation.documentation.sandbox.fixedBottom
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(DocsPage);
