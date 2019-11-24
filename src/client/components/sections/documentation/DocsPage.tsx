import React, { createRef, RefObject, Fragment } from 'react';
import { connect } from 'react-redux';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';

import {
	setAllFixed,
	setAllOffsets,
	setSidebarFixed,
	setSidebarOffsets,
	setSandboxFixed,
	setSandboxOffsets
} from '../../../actions/documentation/section.action';

interface StateProps {
	sidebarData: {
		fixed: boolean;
		offsetTop: number;
		offsetBottom: number;

	};
	sandboxData: {
		fixed: boolean;
		offsetTop: number;
		offsetBottom: number;
	};
}

interface DispatchProps {
	setAllFixed: (sidebarFixed: boolean, sandboxFixed: boolean) => any;
	setAllOffsets: (sidebarOffsetTop?: number, sidebarOffsetBottom?: number, sandboxOffsetTop?: number, sandboxOffsetBottom?: number) => any;
	setSidebarFixed: (fixed: boolean) => any;
	setSidebarOffsets: (offsetTop?: number, offsetBottom?: number) => any;
	setSandboxFixed: (fixed: boolean) => any;
	setSandboxOffsets: (offsetTop?: number, offsetBottom?: number) => any;
}

const Dispatchers = { setAllFixed, setAllOffsets, setSidebarFixed, setSidebarOffsets, setSandboxFixed, setSandboxOffsets };

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

	getSidebarProps = (): any =>{
		return this.props.sidebarData.fixed;
	};

	getSandboxProps = (): any => {
		return this.props.sidebarData.fixed;
	};

	shouldComponentUpdate (): any {
		return false;
	}

	private handleScroll = (): void => {
		const fixed = this.props.sidebarData.fixed;
		const offsetTop = this.props.sidebarData.offsetTop;
		const offsetBottom = this.props.sidebarData.offsetBottom;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		if (scroll >= offsetTop && !fixed) {
			this.props.setSidebarFixed(true);
		} else if (scroll < offsetTop && fixed) {
			this.props.setSidebarFixed(false);
		}

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

		this.props.setAllOffsets(scrollTop, null, scrollTop, scrollBottom);

		window.addEventListener('scroll', this.handleScroll);
	};

	public componentWillUnmount = (): void => {
		window.removeEventListener('scroll', this.handleScroll);
	};

	public render(): JSX.Element {
		console.log(this.getSidebarProps());
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
	sidebarData: {
		fixed: state.documentation.sidebarData.fixed,
		offsetTop: state.documentation.sidebarData.offsetTop,
		offsetBottom: state.documentation.sidebarData.offsetBottom
	},
	sandboxData: {
		fixed: state.documentation.sandboxData.fixed,
		offsetTop: state.documentation.sandboxData.offsetTop,
		offsetBottom: state.documentation.sandboxData.offsetBottom
	},
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(DocsPage);