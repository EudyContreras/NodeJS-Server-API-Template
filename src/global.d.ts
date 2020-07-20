export {};

declare global {
	interface This {
		globalThis: any;
		__VERSION_NUMBER__: string;
	}
	interface Window {
		__VERSION_NUMBER__: string;
		__WB_MANIFEST: any;
		logRequests: boolean;
		allowCors: boolean;
		urlsToCache: any;
		clients: any;
		clientConfig: any;
		registration: any;
		skipWaiting: Function;
	}
}
