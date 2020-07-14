
import { headers } from './constants';

export const TIMEOUT = 1000;

export interface WorkerMessage {
    type: string;
    cacheName?: string;
    payload?: any;
}

export interface ClientMessage {
    type: string;
    meta?: string;
    payload?: any;
}
export interface CacheQuotaOptions {
	clearOnError: boolean;
	maxAgeSeconds: number;
	maxEntries: number;
};

export interface CacheConditionTargets {
    request: Request;
    response: Response;
    url: URL;
}

export interface CachePredicate {
    cacheCondition?: (targets: CacheConditionTargets) => boolean;
	acceptedStatus?: number[];
	allowOpaque?: boolean;
    crossOrigin?: boolean;
}

export interface CacheStragedy {
	event: any;
	request: Request;
    cacheName: string;
    quotaOptions?: CacheQuotaOptions;
	cachePredicate?: CachePredicate;
}

export interface AgingResponseInfo {
	cacheableResponse: Response;
	effectiveResponse: Response;
	expirationDate: Date | null;
}

export interface CacheExpirationInfo {
	response: Response | undefined;
	expiration: number | null;
}

export interface WebpSupportCallback<T> {
	onHasSupport: () => Promise<T>;
	onNoSupport: () => Promise<T>;
}

export const filetypePatterns = {
	API_DATA: /\/api\/.*\/*.(json|xml)$/,
	PROGRESSIVE_IMAGE: /.(webp)$/,
	DATA: /.(json|xml|txt)$/,
	FONT: /\.(eot|otf|ttf|woff|woff2)$/,
	STATIC: /.(js|css|js.br|js.gz|html)$/,
	IMAGE: /.(png|apng|svg|jpg|jpeg|pjpeg|tif|tiff|gif|ico|bmp|jfif)$/,
	AUDIO: /.(mp4|m4a|aac|oga|flac|wav|pmc|aiff|wav|mp3|ogg|webm)$/,
	VIDEO: /.(mp4|webm|ogg)$/
};

export const filetypeCache = (url, cacheKeys): string => {
	if (filetypePatterns.DATA.test(url)) return cacheKeys.DATA_CACHE;
	if (filetypePatterns.VIDEO.test(url)) return cacheKeys.MEDIA_CACHE;
	if (filetypePatterns.AUDIO.test(url)) return cacheKeys.MEDIA_CACHE;
	if (filetypePatterns.IMAGE.test(url)) return cacheKeys.IMAGE_CACHE;
	if (filetypePatterns.PROGRESSIVE_IMAGE.test(url)) return cacheKeys.IMAGE_CACHE;
	if (filetypePatterns.FONT.test(url)) return cacheKeys.GOOGLE_FONTS_WEB_CACHE;
	return cacheKeys.STATIC_CACHE;
};

export const inRange = (value: number, min: number, max: number): boolean => value >= min && value < max;

export const inRangeInclusive = (value: number, min: number, max: number): boolean => value >= min && value <= max;

export const addDelay = (ms: number) => (): any => new Promise(resolve => setTimeout(() => resolve(), ms));

export const isNullOrEmpty = (path): boolean => !path || path === '' || path == undefined;

export const checkExpiration = (response: Response | undefined, quotaOptions: CacheQuotaOptions | undefined): CacheExpirationInfo => {
	if (response && quotaOptions) {
		const expiryData = response.headers.get(headers.EXPIRATION_HEADER_KEY);

		if (!expiryData) return {
			response: response,
			expiration: null
		};
		
		const expirationDate = expiryData && Date.parse(expiryData);
		const now = Date.now();

		if (expirationDate && expirationDate > now) {
			return {
				response: response,
				expiration: expirationDate
			};
		}
	}	
	return {
		response: response,
		expiration: null
	};
};

export const attachExpiration = (response: Response, quotaOptions: CacheQuotaOptions | undefined): Promise<(AgingResponseInfo)> => {
	if (response && quotaOptions) {
		const expires = new Date();
		expires.setSeconds(expires.getSeconds() + quotaOptions.maxAgeSeconds);
	
		const cachedResponseFields = {
			status: response.status,
			statusText: response.statusText,
			headers: {
				[headers.EXPIRATION_HEADER_KEY] : expires.toUTCString()
			}
		};
		response.headers.forEach((value, key) => {
			cachedResponseFields.headers[key] = value;
		});

		const returnedResponse = response.clone();
		return response.blob().then((body) => {
			logger.warn('Expiration attached to: ', response);
			return { 
				expirationDate: expires,
				effectiveResponse: returnedResponse,
				cacheableResponse: new Response(body, cachedResponseFields)
			};
		}).catch(e => {
			logger.error(e);
			return { 
				expirationDate: null,
				effectiveResponse: returnedResponse,
				cacheableResponse: returnedResponse.clone()
			}; 
		});
	}
	return Promise.resolve({ effectiveResponse: response, cacheableResponse: response.clone(), expirationDate: null } );
};

/**
 * Remove entries that are used the least
 * @param cacheName 
 * @param quotaOptions 
 * @param newEntryCount 
 */
export const replaceStaledEntries = (cacheName: string, quotaOptions: CacheQuotaOptions, newEntryCount: number) => {

};

export const purgeCacheOnQuotaError = (cacheName: string) => {

};

export const handleWebp = async <T> (supportCallbacks: WebpSupportCallback<T>): Promise<any> => {
	if (!self.createImageBitmap) return false;

	const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
	const blob = await fetch(webpData).then(r => r.blob());

	return createImageBitmap(blob).then(() => true, () => false).then(hasSupport =>{
		if (hasSupport) {
			return supportCallbacks.onHasSupport();
		} else {
			return supportCallbacks.onNoSupport();
		}
	});
};

export function timeoutPromise<T>(ms: number, promise: Promise<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reject(new Error('promise timeout'));
		}, ms);
		promise.then(
			(res) => {
				clearTimeout(timeoutId);
				resolve(res);
			},
			(err) => {
				clearTimeout(timeoutId);
				reject(err);
			}
		);
	});
}

export function timeoutRequest(request: Request): Promise<Response|null> {
	const controller = new AbortController();
	const signal = controller.signal;

	const timeoutId = setTimeout(() => controller.abort(), 5000);

	return fetch(request, { signal }).then(response => {
		clearTimeout(timeoutId);
		return response;
	}).catch(error => {
		if (error.code !== DOMException.ABORT_ERR) {
			logger.error('An error occured!', error);
		}
		return null;
	});
}

export const storeDataAndUpdateUI = async (): Promise<void> => {
	if ('storage' in navigator && 'estimate' in navigator.storage) {
		const { usage, quota } = await navigator.storage.estimate();
		
		if (usage && quota){
			const percentUsed = Math.round(usage / quota * 100);
			const usageInMib = Math.round(usage / (1024 * 1024));
			const quotaInMib = Math.round(quota / (1024 * 1024));

			const details = `${usageInMib} out of ${quotaInMib} MiB used (${percentUsed}%)`;

			logger.log(details);
		}
	}
};

export const logger = {
	log: (...message: any): void => {
		const css = 'background: #00b6ffbd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	warn: (...message: any): void => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	info: (...message: any): void => {
		const css = 'background: #3aa178; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	error: (...message: any): void => {
		const css = 'background: #ff0038bd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	}
};

export const worker = logger;