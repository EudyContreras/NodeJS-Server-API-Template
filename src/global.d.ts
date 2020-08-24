export {};

declare const __CLIENT_RENDERED__: boolean;
declare global {
	interface This {
		globalThis: any;
		__CLIENT_RENDERED__: boolean;
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
		indexedDB: any;
		clientConfig: any;
		registration: any;
		skipWaiting: () => any;
	}
}

declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
	}
}
  