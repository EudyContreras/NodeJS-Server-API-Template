import { connect } from 'react-redux';
import React, { createRef, RefObject, Fragment, MutableRefObject } from 'react';
import ContentArea from './children/content/ContentArea';
import FooterArea from './children/footer/FooterArea';
import SideMenu from './children/sidebar/SidebarMenu';
import SandBox from './children/sandbox/SandboxArea';
import { DispatchProps, Dispatchers } from '../../../actions/documentation/section.action';
import { ScrollToTop } from '../../common/ScrollToTop';

interface StateProps {
	styling: any;
	offsetTop: number;
	sandboxFixedTop: boolean;
	sandboxFixedBottom: boolean;
}

type Props = StateProps & DispatchProps;

class DocsPage extends React.PureComponent<Props> {
	private readonly footer: RefObject<HTMLElement>;
	private readonly sandbox: RefObject<HTMLElement>;
	private readonly content: RefObject<HTMLElement>;
	private readonly offsetBottom: MutableRefObject<number>;

	constructor(props: Props) {
		super(props);
		this.footer = createRef();
		this.sandbox = createRef();
		this.content = createRef();
		this.offsetBottom = createRef() as MutableRefObject<number>;
	}

	private getBottomPosition = (): number => {
		const body = document.body;
		const sandbox = this.sandbox.current!;
		const footer = this.footer.current!;

		const scroll = body.getBoundingClientRect().top;
		const scrollBottom = footer.getBoundingClientRect().top - sandbox.getBoundingClientRect().height;

		return Math.abs(scroll) + scrollBottom;
	};

	private handleResize = (): void => {
		const offsetBottom = this.offsetBottom.current || 0;

		this.applyInitialValues(offsetBottom);
	};

	private handleScroll = (): void => {
		const offsetBottom = this.offsetBottom.current || 0;
		const fixedTop = this.props.sandboxFixedTop;

		const scroll = document.body.scrollTop || document.documentElement.scrollTop;

		const bottomFixed = this.props.sandboxFixedBottom;

		if (scroll >= offsetBottom) {
			if (!bottomFixed && fixedTop) {
				this.props.setSandboxFixedBottom(true);
			}
		} else {
			if (bottomFixed) {
				this.props.setSandboxFixedBottom(false);
			}
		}
	};

	public componentWillUnmount = (): void => {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleResize);
	};

	public componentDidMount = (): void => {
		this.offsetBottom.current = this.getBottomPosition();

		this.applyInitialValues(this.offsetBottom.current);

		window.addEventListener('scroll', this.handleScroll, { passive: true });
		window.addEventListener('resize', this.handleResize, { passive: true });
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
				<SideMenu styling={style} />
				<SandBox self={this.sandbox} styling={style} />
				<ContentArea self={this.content} styling={style} />
				<FooterArea self={this.footer} styling={style} />
				<ScrollToTop />
			</Fragment>
		);
	};
}

const mapStateToProps = (state: any): any => ({
	offsetTop: state.presentation.navigation.offsetTop,
	sandboxFixedTop: state.presentation.navigation.anchored,
	sandboxFixedBottom: state.presentation.documentation.sandbox.fixedBottom
});

export default connect<StateProps, DispatchProps, any>(mapStateToProps, Dispatchers)(DocsPage);
