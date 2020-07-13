
import { cachableTypes, cacheNames, fallbacks, responseType } from './constants';
import { logger, inRange, timeoutPromise, CacheStragedy, CachePredicate, checkExpiration, attachExpiration } from './commons';

const TIMEOUT = 10000;

const cacheKeys = cacheNames();

const defaultPredicate: CachePredicate = {
	crossOrigin: true,
	allowOpaque: false,
	cacheCondition: ({ response }) => response && inRange(response.status, 200, 300) || false
};

const isValidResponse = (request: Request, response: Response, cachePredicate?: CachePredicate): boolean => {

	if (!response || (!response.ok && response.type !== responseType.OPAQUE)) return false;

	const { acceptedStatus, crossOrigin, allowOpaque, cacheCondition } = cachePredicate || defaultPredicate;
	const isValid = acceptedStatus ? acceptedStatus.includes(response.status) : cacheCondition && cacheCondition({ request, response, url: new URL(request.url) });
	
	switch (response.type) {
		case responseType.CORS: {
			return (crossOrigin && isValid) ? true : false;
		}
		case responseType.OPAQUE: {
			return (allowOpaque && isValid) ? true : false;
		}
		case responseType.ERROR: {
			return false;
		}
	}
	
	return isValid ? true : false;
};

const errorResponse = (): Response => {
	const body = JSON.stringify({ error: 'Sorry! you are offline. Please, try later.' });
	const headers = { 'Content-Type': 'application/json' };
	const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
	return response;
};

export const addToCache = async (cacheName: string, ...urls: string[]): Promise<void> => {
	const myCache = await caches.open(cacheName);
	await myCache.addAll(urls);
};

export const cacheResponse = async (cacheName: string, request: Request, response: Response): Promise<void> => {
	const myCache = await caches.open(cacheName);
	await myCache.put(request, response);
};

export const fromNetwork = async (request: Request, timeout: number = TIMEOUT): Promise<Response> => {
	return timeoutPromise(timeout, fetch(request));
};

export const staleWhileRevalidate = (stragedy: CacheStragedy): Promise<any> => {
	const { event, request, cacheName, cachePredicate } = stragedy;
	return caches.open(cacheName).then(cache => {
		return cache.match(request).then(response => {
			const fetchPromise = fromNetwork(request).then(liveResponse => {
				if (isValidResponse(request, liveResponse, cachePredicate )) {
					cache.put(request, liveResponse.clone());
				}
				return liveResponse;
			});
			return response || fetchPromise || getFallback(request.destination);
		}).catch(error => {
			handleFailure(event, request, error);
		});
	});		
};

export const cacheFirst = (stragedy: CacheStragedy): Promise<any> => {
	const { event, request, cacheName, cachePredicate, quotaOptions } = stragedy;
	return caches.open(cacheName).then(cache => {
		return cache.match(request).then(response => {
			return checkExpiration(response, quotaOptions) || fromNetwork(request).then(response => {
				attachExpiration(response.clone(), quotaOptions).then(responseTuple => {
					const { effectiveResponse, cacheableResponse } = responseTuple;
					if (isValidResponse(request, effectiveResponse, cachePredicate )) {
						cache.put(request, cacheableResponse);
					}
				});
				return response || getFallback(request.destination);
			}).catch(error => {
				handleFailure(event, request, error);
			});
		});
	});
};

export const networkFirst = (stragedy: CacheStragedy): Promise<any> => {
	const { event, request, cacheName, cachePredicate } = stragedy;
	const cache = caches.open(cacheName);
	return fromNetwork(request).then(liveResponse => {
		const response = liveResponse.clone();
		if (isValidResponse(request, response, cachePredicate )) {
			event.waitUntil(cache.then(cache => cache.put(request, response)));
		}
		return response || cache.then(cache => cache.match(request).then(response => {
			return response || getFallback(request.destination);
		})).catch(error => {
			handleFailure(event, request, error);
		});
	});
};

const getFallback = async (destination: string): Promise<Response | undefined> => {
	logger.warn('Retrieving fallback for: ', destination);
	const cache = await caches.open(cacheKeys.FALLBACK_CACHE);
	switch (destination) {
		case cachableTypes.FONT: {
			return await cache.match(fallbacks.FALLBACK_FONT_URL) || errorResponse();
		}
		case cachableTypes.IMAGE: {
			return await cache.match(fallbacks.FALLBACK_IMAGE_URL) || errorResponse();
		}
		default:
			return await cache.match(fallbacks.FALLBACK_HTML_URL) || errorResponse();
	}
};

const handleFailure = (event: any, request: any, error?: any) => {
	logger.error('Handling failure: ', error);
};