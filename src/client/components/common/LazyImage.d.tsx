type Loading = 'lazy' | 'eager';
type Decoding = 'async' | 'sync';

interface QueryInfo {
	minWidth?: number;
	maxWidth?: number;
	targetWidth: number;
}

interface MediaQuery {
	queries: QueryInfo[];
	fallback: number;
}

interface SrcSet {
	path: string;
	width: number;
	height: number;
}

interface ImageProps {
	src?: string;
	alt?: string;
	srcSet?: string;
	sizes?: string;
}

interface Fallback {
	src: string;
	srcSet?: string;
	images: SrcSet[];
}

interface ImgAttribute {
	loading?: Loading;
	decoding?: Decoding;
	crossOrigin?: 'anonymous';
}

interface LazyImageProps {
	w?: number;
	h?: number;
	src: string;
	alt?: string;
	title?: string;
	index?: number;
	srcSet?: string;
	styling?: any;
	images?: SrcSet[];
	fallback?: Fallback;
	lazyLoad?: boolean;
	palette?: string[];
	tryWebp?: boolean;
	mediaQuery?: MediaQuery;
	aspectRatio: number;
	placeholder?: string;
	className?: string;
}
