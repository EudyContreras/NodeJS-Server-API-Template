export {};

declare global {
	interface This {
		globalThis: any;
		__VERSION_NUMBER__: string;
	}
	interface NodeModule {
		hot: {
			accept()
		};
	}
	interface Window {
		__VERSION_NUMBER__: string;
		__PRELOADED_STATE__: any;
		__RENDER_OPTIONS__: any;
		__WB_MANIFEST: any;
		logRequests: boolean;
		allowCors: boolean;
		urlsToCache: any;
		clients: any;
		clientConfig: any;
		registration: any;
		skipWaiting: () => any;
	}
}

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
	  css?: any;
	}
}