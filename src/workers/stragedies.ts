
import { cachableTypes, cacheNames, fallbacks, responseType, headers } from './constants';
import { days } from './helpers/spanHelpers';
import { logger, inRange, timeoutPromise, CacheStragedy, CachePredicate, CacheQuotaOptions, RevalidateCacheStragedy } from './commons';
import { hasExpired, attachExpiration, getAllEntries, getEntry, CacheEntryInfo } from './handlers/localstorage';

const TIMEOUT = 5000;

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
			return (crossOrigin && isValid) == true;
		}
		case responseType.OPAQUE: {
			return (allowOpaque && isValid) == true;
		}
		case responseType.ERROR: {
			return false;
		}
	}
	
	return isValid ? true : false;
};

const errorResponse = (): Response => {
	const body = JSON.stringify({ error: 'Sorry!, You are offline!. Please, try again later.' });
	const headers = { 'Content-Type': 'application/json' };
	const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
	return response;
};

Cache.prototype.addToCache = async function(request: Request, response: Response | any, cacheName: string, maxEntries?: number): Promise<void> {
	try {
		await this.put(request, response);
		if (maxEntries) {
			const entries = await getAllEntries(cacheName);
			if (entries.values.length >= maxEntries) {
				const leastFrequent = entries.reduce((prev: CacheEntryInfo, current: CacheEntryInfo) => prev.visitFrequency < current.visitFrequency ? prev : current);
				this.delete(leastFrequent.url);
			}
		}
	} catch(error) {
		if (error.code == DOMException.QUOTA_EXCEEDED_ERR) {
			getEntry(request.url).then((entry: CacheEntryInfo) => {
				if (entry.clearOnError) {
					caches.delete(cacheName);
				}
			});
		}
	}
};

export const addToCache = async (cacheName: string, ...urls: string[]): Promise<void> => {
	const myCache = await caches.open(cacheName);
	await myCache.addAll(urls);
};

export const cacheResponse = async (cacheName: string, request: Request, response: Response): Promise<void> => {
	const myCache = await caches.open(cacheName);
	await myCache.addToCache(request, response, cacheName);
};

export const fromNetwork = async (request: Request, timeout: number = TIMEOUT): Promise<Response> => {
	return timeoutPromise(timeout, fetch(request));
};

const isStale = (date: Date, quotaOptions: CacheQuotaOptions | undefined, theresholdAge: number | undefined): boolean => {
	if (!date) return false;
	if (quotaOptions) {
		const expiration = date.getSeconds() + (quotaOptions.maxAgeSeconds ?? 0);
		return (Date.now() - expiration) < 0;
	}
	return (Date.now() - date.getSeconds()) > (theresholdAge ?? days(1));
};

export const staleWhileRevalidate = (stragedy: RevalidateCacheStragedy): void => {
	const { event, request, cacheName, cachePredicate, quotaOptions } = stragedy;
	const cache = caches.open(cacheName);
	event.respondWith(cache.then(cache => {
		return cache.match(request).then(response => {	
			if (response) {
				const dateAdded = response && response.headers.get(headers.DATE_HEADER_KEY);
				const dateParsed = dateAdded ? new Date(dateAdded): new Date() ;
				if (!isStale(dateParsed, quotaOptions, stragedy.theresholdAge)) return response;
			}
			const fetchPromise = fromNetwork(request).then(response => {
				if (isValidResponse(request, response, cachePredicate )) {
					cache.addToCache(request, response.clone(), cacheName, quotaOptions?.maxEntries);
				}
				return response || getFallback(request.destination);
			});
			return response || fetchPromise;
		}).catch(error => {
			return handleFailure(event, request, error);
		});
	}));		
};

export const cacheFirst = (stragedy: CacheStragedy): void => {
	const { event, request, cacheName, cachePredicate, quotaOptions } = stragedy;
	const cache = caches.open(cacheName);
	const network = (cache: Cache): Promise<Response | undefined> => {
		return fetch(request).then(response => {
			if (response) {
				attachExpiration(request.url, cacheName, quotaOptions);
				if (isValidResponse(request, response, cachePredicate)) {
					cache.addToCache(request, response.clone(), cacheName, quotaOptions?.maxEntries);
				}
				return response;
			}
			return getFallback(request.destination);
		}).catch(error => {
			return handleFailure(event, request, error);
		});
	};
	event.respondWith(cache.then(cache => {
		return cache.match(request).then(response => {
			if (response && quotaOptions) {
				return hasExpired(request.url, cacheName).then(expired => {
					return !expired ? response : network(cache);
				});
			}
			return response || network(cache);
		});
	}));
};

interface RefreshCallbacks {
	onLoading: (loading: boolean) => void;
	onReady: (response: any) => void;
	onError: (error: Error) => void;
}

export const cacheThenNetwork = (stragedy: CacheStragedy, refreshCallbacks: RefreshCallbacks): void => {
	const { request, cacheName, cachePredicate } = stragedy;
	
	const cache = caches.open(cacheName);
	let networkDataReceived = false;

	refreshCallbacks.onLoading(true);
	
	const networkUpdate = fetch(request).then((response) => {
		if (isValidResponse(request, response, cachePredicate)) {
			return response.json();
		} else {
			throw Error('The received response is not valid!'); 
		}
	}).then((data) => {
		networkDataReceived = true;
		cache.then(cache => cache.addToCache(request, data, cacheName));
		refreshCallbacks.onReady(data);
	});

	cache.then(cache => cache.match(request).then((response) => {
		if (!response) throw Error('No cached data available!');
		return response.json();
	}).then((data) => {
		if (!networkDataReceived) {
			refreshCallbacks.onReady(data);
		}
	}).catch(() => {
		return networkUpdate;
	}).catch((error) => {
		refreshCallbacks.onError(error);
	}).then(() => {
		refreshCallbacks.onLoading(false);
	}));
};

export const networkFirst = (stragedy: CacheStragedy): void => {
	const { event, request, cacheName, cachePredicate } = stragedy;
	const cache = caches.open(cacheName);
	event.respondWith(fromNetwork(request).then(response => {
		if (response) {
			if (isValidResponse(request, response, cachePredicate )) {
				event.waitUntil(cache.then(cache => {
					cache.addToCache(request, response.clone(), cacheName);
				}));
				return response;
			}
		}
		return cache.then(cache => cache.match(request).then(response => {
			return response || getFallback(request.destination);
		})).catch(error => {
			return handleFailure(event, request, error);
		});
	}));
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

const handleFailure = (event: any, request: any, error?: any): Promise<Response> => {
	logger.error('Handling failure: ', error);
	return Promise.resolve(errorResponse());
};