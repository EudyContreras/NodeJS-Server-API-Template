
import { cachableTypes, cacheNames, fallbacks } from './constants';
import { logger, inRange, timeoutPromise, CacheStragedy, CachePredicate } from './commons';

const TIMEOUT = 10000;

const cacheKeys = cacheNames();

const defaultPredicate: CachePredicate = {
	crossOrigin: true,
	cacheCondition: ({ response }) => response && inRange(response.status, 200, 300) || false
};

const isValidResponse = (request: Request, response: Response, cachePredicate?: CachePredicate): boolean => {
	if (!response || !response.ok ) return false;

	const { acceptedStatus, crossOrigin, cacheCondition } = cachePredicate || defaultPredicate;
	const valid = acceptedStatus ? matchesCode(response, acceptedStatus) : cacheCondition && cacheCondition({ request, response, url: new URL(request.url) });
	
	if(!valid || (!crossOrigin && response.type !== 'basic')) {
		return false;
	}
	return true;
};

const matchesCode = (response: Response | undefined, statusCodes?: number[] | undefined): boolean => {
	if (response && statusCodes && statusCodes.length > 0) {
		return statusCodes.indexOf(response.status) != -1;
	}
	return true;
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

export const staleWhileRevalidate = async (stragedy: CacheStragedy): Promise<void> => {
	const { event, request, cacheName, cachePredicate } = stragedy;
	return event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(request).then(response => {
				const fetchPromise = fromNetwork(request).then(response => {
					if (isValidResponse(request, response, cachePredicate)) {
						cache.put(request, response.clone());
					}
					return response;
				});
				return response || fetchPromise || getFallback(request.destination);
			}).catch(error => {
				handleFailure(event, request, error);
			});
		})
	);
};

export const cacheFirst = async (stragedy: CacheStragedy): Promise<void> => {
	const { event, request, cacheName, cachePredicate } = stragedy;
	return event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(request).then(response => {
				return response || fetch(request).then(response => {
					if (isValidResponse(request, response, cachePredicate )) {
						event.waitUntil(cache.put(request, response.clone()));
					}
					return response || getFallback(request.destination);
				}).catch(error => {
					handleFailure(event, request, error);
				});
			});
		})
	);
};

export const networkFirst = async (stragedy: CacheStragedy): Promise<void> => {
	const { event, request, cacheName, cachePredicate } = stragedy;
	return event.respondWith(
		caches.open(cacheName).then(cache => {
			return fromNetwork(request).then(response => {
				if (isValidResponse(request, response, cachePredicate)) {
					event.waitUntil(cache.put(request, response.clone()));
				}
				return response || cache.match(request).then(response => {
					return response || getFallback(request.destination);
				}).catch(error => {
					handleFailure(event, request, error);
				});
			});
		})
	);
};

const getFallback = async (destination: string): Promise<Response | undefined> => {
	logger.warn('Retrieving fallback for: ', destination);
	const cache = await caches.open(cacheKeys.FALLBACK_CACHE);
	switch (destination) {
		case cachableTypes.FONT: {
			return await cache.match(fallbacks.FALLBACK_FONT_URL) || errorResponse();
		}
		case cachableTypes.IMAGES: {
			return await cache.match(fallbacks.FALLBACK_IMAGE_URL) || errorResponse();
		}
		default:
			return await cache.match(fallbacks.FALLBACK_HTML_URL) || errorResponse();
	}
};

const handleFailure = (event: any, request: any, error?: any) => {
	logger.error('Handling failure: ', error);
};