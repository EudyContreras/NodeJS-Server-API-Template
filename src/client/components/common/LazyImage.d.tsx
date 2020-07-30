interface QueryMax {
	maxWidth: number;
	targetWidth: number;
}

interface QueryMin {
	minWidth: number;
	targetWidth: number;
}

interface MediaQuery {
	queries: QueryMin[] | QueryMax[];
	fallback: number;
}

interface SrcSet {
	path: string;
	width: number;
	height: number;
}

interface ImageProps {
	src: string;
	alt?: string;
	srcSet: string;
	sizes?: string;
}

interface Fallback {
	src: string;
	srcSet?: string;
	images: SrcSet[];
}

enum ImageState {
	OFF_BOUNDS,
	LOADING,
	SUCCESS,
	FAILURE
}

interface LazyImageProps {
	w?: number;
	h?: number;
	index: number;
	src: string;
	alt?: string;
	title?: string;
	srcSet: string;
	images: SrcSet[];
	fallback?: Fallback;
	lazyLoad?: boolean;
	palette?: string[];
	mediaQuery?: MediaQuery;
	aspectRatio: number;
	placeholder?: string;
	className?: string;
}
