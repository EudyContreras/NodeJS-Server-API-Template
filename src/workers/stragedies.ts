
import { cachableTypes, cacheNames, fallbacks, responseType, headers } from './constants';
import { seconds, minutes, hours, days, weeks, months, years } from './helpers/spanHelpers';
import { logger, inRange, timeoutPromise, CacheStragedy, CachePredicate, checkExpiration, attachExpiration, CacheQuotaOptions, RevalidateCacheStragedy } from './commons';
import { increaseVisitFrequency, setEntryExpiryDate, updateEntry, getEntry, CacheEntryInfo, getAllEntries } from './handlers/localstorage';

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
	const body = JSON.stringify({ error: 'Sorry!, You are offline!. Please, try again later.' });
	const headers = { 'Content-Type': 'application/json' };
	const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
	return response;
};

Cache.prototype.addToCache = async function(request: Request, response: Response, cacheName: string): Promise<void> {
	try {
		///const entries = await getAllEntries();
		//const sorted = entries.sort((a: CacheEntryInfo, b: CacheEntryInfo) => a.visitFrequency - b.visitFrequency);
		await this.put(request, response);
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

export const staleWhileRevalidate = (stragedy: RevalidateCacheStragedy): Promise<any> => {
	const { event, request, cacheName, cachePredicate, quotaOptions } = stragedy;
	const cache = caches.open(cacheName);
	return cache.then(cache => {
		return cache.match(request).then(response => {	
			if (response) {
				const dateAdded= response && response.headers.get(headers.DATE_HEADER_KEY);
				const dateParsed: Date = dateAdded ? new Date(dateAdded): new Date() ;
				if (!isStale(dateParsed, quotaOptions, stragedy.theresholdAge)) return response;
			}
			const fetchPromise = fromNetwork(request).then(response => {
				if (isValidResponse(request, response, cachePredicate )) {
					cache.addToCache(request, response.clone(), cacheName);
				}
				return response;
			});
			return response || fetchPromise || getFallback(request.destination);
		}).catch(error => {
			handleFailure(event, request, error);
		});
	});		
};

export const cacheFirst = (stragedy: CacheStragedy): Promise<any> => {
	const { event, request, cacheName, cachePredicate, quotaOptions } = stragedy;
	const cache = caches.open(cacheName);
	return cache.then(cache => {
		return cache.match(request).then(liveResponse => {
			const { response, expiration } = checkExpiration(liveResponse, quotaOptions);
			if (response) {
				updateEntry(request.url, {
					visited: true,
					clearOnError: quotaOptions?.clearOnError ?? null,
					expiryDate: expiration ?? null
				});
			}
			return response || fromNetwork(request).then(response => {
				attachExpiration(response.clone(), quotaOptions).then(responseTuple => {
					const { effectiveResponse, cacheableResponse, expirationDate } = responseTuple;
					updateEntry(request.url, {
						visited: true,
						clearOnError: quotaOptions?.clearOnError ?? null,
						expiryDate: expirationDate?.getSeconds()
					});
					if (isValidResponse(request, effectiveResponse, cachePredicate)) {
						cache.addToCache(request, cacheableResponse, cacheName);
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
			event.waitUntil(cache.then(cache => {
				cache.addToCache(request, response, cacheName);
			}));
		}
		return response || cache.then(cache => cache.match(request).then(response => {
			increaseVisitFrequency(request.url);
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