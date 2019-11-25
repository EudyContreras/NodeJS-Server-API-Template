import { connect } from 'react-redux';
import React, { createRef, RefObject, Fragment } from 'react';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';

import {
	setAllFixed,
	setSidebarFixed,
	setSandboxFixed,
} from '../../../actions/documentation/section.action';

interface StateProps {
	sidebarFixed: boolean;
	sandboxFixedTop: boolean;
	sandboxFixedBottom: boolean;
}

interface DispatchProps {
	setAllFixed: (sidebarFixed: boolean, sandboxFixed: boolean) => any;
	setSidebarFixed: (fixed: boolean) => any;
	setSandboxFixed: (fixed: boolean) => any;
}

const Dispatchers = { setAllFixed, setSidebarFixed, setSandboxFixed };

type Props = StateProps & DispatchProps & any;

class DocsPage extends React.PureComponent<Props> {

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

	// public componentDidMount(): void {
	// 	const style = this.props.styling;
	// 	const footer = this.footer.current;
	// 	const sideBar = this.sidebar.current;
	// 	const sandBox = this.sandbox.current;

	// 	const sandboxListener = new ScrollListener(this, sandBox!, footer, 10, this.getSandboxProps, (fixed: boolean): void => {
	// 		this.props.setPlaygroundFixed(fixed);
	// 	});

	// 	const sidebarListener = new ScrollListener(this, sideBar!, null ,10, this.getSidebarProps, (fixed: boolean): void => {
	// 		this.props.setSidebarFixed(fixed);
	// 	});

	// 	stickEffect(sandboxListener);

	// 	//updateEffect(sidebarListener);
	// 	updateEffect(sandboxListener);

	// }

	shouldComponentUpdate = (): any => false;

	getSidebarProps = (): any => {
		return this.props.sidebarFixed;
	};

	getSandboxProps = (): any => {
		return this.props.sandboxFixed;
	};

	private handleScroll = (offsetTop = 0, offsetBottom: number | null = null): void => {
		const topFixed = this.props.sidebarFixed;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (scroll >= offsetTop && !topFixed) {
			this.props.setAllFixed(true, true);
		} else if (scroll < offsetTop && topFixed) {
			this.props.setAllFixed(false, false);
		}

		// if (offsetBottom != null) {
		// 	const bottomFixed = this.props.sandboxFixed;

		// 	if (scroll! > offsetBottom && bottomFixed) {
		// 		this.props.setSandboxFixed(false);
		// 	} else if (offsetBottom > scroll! && !bottomFixed) {
		// 		if (scroll >= offsetTop) {
		// 			this.props.setSandboxFixed(true);
		// 		}
		// 	}
		// }

		// if (scroll >= offsetTop && !this.props.fixed) {
		// 	this.props.setSidebarFixed(true);
		// } else if (scroll < offsetTop && this.props.fixed) {
		// 	this.props.setSidebarFixed(false);
		// }
	};

	public componentDidMount = (): void => {
		const margin = 10;

		const sidebar = this.sidebar.current!;
		const sandbox = this.sandbox.current!;
		const footer = this.footer.current!;

		const scrollTop = sidebar.getBoundingClientRect().top - margin;
		const scrollBottom = footer.getBoundingClientRect().top - sandbox.getBoundingClientRect().height;

		const topPosition = Math.abs(document.body.getBoundingClientRect().top) + scrollTop;

		window.addEventListener('scroll', () => this.handleScroll(topPosition, scrollBottom));
	};

	public componentWillUnmount = (): void => {
		window.removeEventListener('scroll', () => this.handleScroll());
	};

	public render(): JSX.Element {
		console.log(this.props);

		const style = this.props.styling;

		return (
			<Fragment>
				<SideMenu self={this.sidebar} styling={style} />
				<SandBox self={this.sandbox} styling={style} />
				<ContentArea self={this.content} styling={style} />
				<FooterArea self={this.footer} styling={style} />
			</Fragment>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	sidebarFixed: state.documentation.sidebar.fixed,
	sandboxFixedTop: state.documentation.sandbox.fixedTop,
	sandboxFixedBottom: state.documentation.sandbox.fixedBottom,
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(DocsPage);