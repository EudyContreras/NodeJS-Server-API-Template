import { connect } from 'react-redux';
import React, { createRef, RefObject, Fragment } from 'react';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';

import {
	setAll,
	setAllFixed,
	setSidebarFixed,
	setSandboxFixedTop,
	setSandboxFixedBottom,
	setSandboxOffsetBottom
} from '../../../actions/documentation/section.action';

interface StateProps {
	sidebarFixed: boolean;
	sandboxFixedTop: boolean;
	sandboxFixedBottom: boolean;
}

interface DispatchProps {
	setAll: (sidebarFixed: boolean, sandboxFixedTop: boolean, sandboxFixedBottom: boolean, sandboxOffsetBottom: number) => any;
	setAllFixed: (sidebarFixed: boolean, sandboxFixed: boolean) => any;
	setSidebarFixed: (fixed: boolean) => void;
	setSandboxFixedTop: (fixed: boolean) => void;
	setSandboxFixedBottom: (fixed: boolean) => void;
	setSandboxOffsetBottom: (offset: number) => void;
}

const Dispatchers = { setAll, setAllFixed, setSidebarFixed, setSandboxFixedTop, setSandboxFixedBottom, setSandboxOffsetBottom };

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

	shouldComponentUpdate = (): any => false;

	private handleScroll = (offsetTop = 0, offsetBottom = 0): void => {
		const topFixed = this.props.sidebarFixed;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (scroll > offsetTop && !topFixed) {
			if (scroll < offsetBottom) {
				this.props.setAllFixed(true, true);
			}
		} else if (scroll < offsetTop && topFixed) {
			this.props.setAllFixed(false, false);
		}
		const bottomFixed = this.props.sandboxFixedBottom;

		if (scroll > offsetBottom) {
			if (!bottomFixed && topFixed) {
				this.props.setSandboxFixedBottom(true);
			}
		} else if (scroll <= offsetBottom) {
			if (bottomFixed) {
				this.props.setSandboxFixedBottom(false);
			}
		}
	};

	public componentDidMount = (): void => {
		const margin = 15;

		const body = document.body;
		const sidebar = this.sidebar.current!;
		const sandbox = this.sandbox.current!;
		const footer = this.footer.current!;

		const scroll = body.getBoundingClientRect().top;
		const scrollTop = sidebar.getBoundingClientRect().top;
		const scrollBottom = footer.getBoundingClientRect().top - sandbox.getBoundingClientRect().height;

		const topPosition = Math.abs(scroll) + (scrollTop - margin);
		const bottomPosition = Math.abs(scroll) + (scrollBottom);

		this.applyInitialValues(topPosition, bottomPosition);

		window.onscroll = (): void => {
			this.handleScroll(topPosition, bottomPosition - margin);
		};
		window.onresize = (): void => {
			console.log('RESIZED');
		};
	};

	private applyInitialValues = (topPosition: number, bottomPosition: number): void => {
		const topFixed = this.props.sidebarFixed;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (!topFixed) {
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
	sidebarFixed: state.presentation.documentation.sidebar.fixed,
	sandboxFixedTop: state.presentation.documentation.sandbox.fixedTop,
	sandboxFixedBottom: state.presentation.documentation.sandbox.fixedBottom,
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(DocsPage);