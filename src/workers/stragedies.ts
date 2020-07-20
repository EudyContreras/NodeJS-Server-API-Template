import { clientMessages, cachableTypes, cacheNames, fallbacks, responseType, headers } from './constants';
import { days } from './helpers/timespan.helper';
import { logger, inRange, sendMessageToClients } from './commons';
import { hasExpired, attachExpiration, getAllEntries, getEntry } from './handlers/localstorage';

const TIMEOUT = 5000;

const DEBUG_MODE = process.env.NODE_ENV !== 'production';

const cacheKeys = cacheNames();

const defaultPredicate: CachePredicate = {
	crossOrigin: true,
	allowOpaque: false,
	cacheCondition: ({ response }) => (response && inRange(response.status, 200, 300)) || false
};

function isValidResponse(request: Request, response: Response, cachePredicate?: CachePredicate): boolean {
	if (!response || (!response.ok && response.type !== responseType.OPAQUE)) return false;

	const { acceptedStatus, crossOrigin, allowOpaque, cacheCondition } = cachePredicate || defaultPredicate;
	const isValid = acceptedStatus ? acceptedStatus.includes(response.status) : cacheCondition && cacheCondition({ request, response, url: new URL(request.url) });

	switch (response.type) {
		case responseType.CORS: {
			return (crossOrigin && isValid) === true;
		}
		case responseType.OPAQUE: {
			return (allowOpaque && isValid) === true;
		}
		case responseType.ERROR: {
			return false;
		}
	}

	return !!isValid;
}

const errorResponse = (): Response => {
	const body = JSON.stringify({ error: 'Sorry!, You are offline!. Please, try again later.' });
	const headers = { 'Content-Type': 'application/json' };
	const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
	return response;
};

Cache.prototype.addToCache = async function (request: Request, response: Response | any, cacheName: string, maxEntries?: number): Promise<Response> {
	try {
		await this.put(request, response);
		if (maxEntries) {
			getAllEntries(cacheName).then((entries) => {
				if (entries.values.length >= maxEntries) {
					const leastFrequent = entries.reduce((prev: CacheEntryInfo, current: CacheEntryInfo) => (prev.visitFrequency < current.visitFrequency ? prev : current));
					this.delete(leastFrequent.url);
				}
			});
		}
	} catch (error) {
		if (error.code === DOMException.QUOTA_EXCEEDED_ERR) {
			getEntry(request.url).then((entry: CacheEntryInfo | undefined) => {
				if (entry?.clearOnError) {
					caches.delete(cacheName);
				}
			});
		}
	}
	return response;
};

export async function addToCache(cacheName: string, ...urls: string[]): Promise<void> {
	const myCache = await caches.open(cacheName);
	await myCache.addAll(urls);
}

export async function cacheResponse(cacheName: string, request: Request, response: Response): Promise<void> {
	const myCache = await caches.open(cacheName);
	await myCache.addToCache(request, response, cacheName);
}

export async function fromNetwork(request: Request, timeout: number = TIMEOUT): Promise<Response> {
	return new Promise(function (resolve, reject) {
		const timeoutId = setTimeout(reject, timeout);
		fetch(request).then((response) => {
			clearTimeout(timeoutId);
			resolve(response);
		}, reject);
	});
}

export async function fromCache(request: Request, cacheName?: string | undefined, cache?: Promise<Cache> | Cache | undefined): Promise<Response | any> {
	const noMatch = 'no-match-found';
	if (cache) {
		if (cache instanceof Cache) {
			return cache.match(request).then((match) => match || Promise.reject(noMatch));
		} else {
			return cache.then((cache) => cache.match(request)).then((match) => match || Promise.reject(noMatch));
		}
	} else {
		return caches
			.open(cacheName ?? '')
			.then((cache) => cache.match(request))
			.then((match) => match || Promise.reject(noMatch));
	}
}

function isStale(date: Date, quotaOptions: CacheQuotaOptions | undefined, theresholdAge: number | undefined): boolean {
	if (!date) return false;
	if (quotaOptions) {
		const expiration = date.getSeconds() + (quotaOptions.maxAgeSeconds ?? 0);
		return Date.now() - expiration < 0;
	}
	return Date.now() - date.getSeconds() > (theresholdAge ?? days(1));
}

export function staleWhileRevalidate(stragedy: RevalidateCacheStragedy): void {
	const { event, request, cacheName, cachePredicate, quotaOptions } = stragedy;
	const cache = caches.open(cacheName);
	event.respondWith(
		cache.then((cache) =>
			cache
				.match(request)
				.then((response) => {
					if (response) {
						const dateAdded = response && response.headers.get(headers.DATE_HEADER_KEY);
						const dateParsed = dateAdded ? new Date(dateAdded) : new Date();
						if (!isStale(dateParsed, quotaOptions, stragedy.theresholdAge)) return response;
					}
					const fetchPromise = fromNetwork(request).then((response) => {
						if (isValidResponse(request, response, cachePredicate)) {
							cache.addToCache(request, response.clone(), cacheName, quotaOptions?.maxEntries);
						}
						return response || getFallback(request.destination);
					});
					return response || fetchPromise;
				})
				.catch((error) => handleFailure(event, request, error))
		)
	);
}

export function cacheFirst(stragedy: CacheStragedy): void {
	const { event, request, cacheName, cachePredicate, quotaOptions } = stragedy;
	const cache = caches.open(cacheName);
	const network = (cache: Cache): Promise<Response | undefined> =>
		fetch(request)
			.then((response) => {
				if (response) {
					attachExpiration(request.url, cacheName, quotaOptions);
					if (isValidResponse(request, response, cachePredicate)) {
						cache.addToCache(request, response.clone(), cacheName, quotaOptions?.maxEntries);
					}
					return response;
				}
				return getFallback(request.destination);
			})
			.catch((error) => handleFailure(event, request, error));
	event.respondWith(
		cache.then((cache) =>
			cache.match(request).then(async (response) => {
				if (response && quotaOptions) {
					return hasExpired(request.url).then((expired) => (!expired ? response : network(cache)));
				}
				return response || network(cache);
			})
		)
	);
}

async function update(cache: Cache, request: Request, cachePredicate: CachePredicate | undefined, cacheName: string): Promise<Response | undefined> {
	return fromNetwork(request).then((response) => {
		if (isValidResponse(request, response, cachePredicate)) {
			return cache.addToCache(request, response.json(), cacheName).then(() => response);
		}
		return undefined;
	});
}

async function refresh(response: Response | undefined): Promise<any | undefined> {
	if (!response) return undefined;
	return response.json().then((jsonResponse) => {
		const message: ClientMessage = {
			type: clientMessages.DATA_UPDATE,
			payload: {
				endpoint: response.url,
				data: jsonResponse.data
			}
		};
		sendMessageToClients(message);
		return jsonResponse.data;
	});
}

export function cacheThenRefresh(stragedy: CacheStragedy): void {
	const { event, request, cacheName, cachePredicate } = stragedy;
	const cache = caches.open(cacheName);
	event.respondWith(cache.then((cache) => cache.match(request)));
	event.waitUntil(cache.then((cache) => update(cache, request, cachePredicate, cacheName).then(refresh)));
}

export function cacheThenNetwork(stragedy: CacheStragedy, refreshCallbacks: RefreshCallbacks): void {
	const { request, cacheName, cachePredicate } = stragedy;

	const cache = caches.open(cacheName);
	let networkDataReceived = false;

	refreshCallbacks.onLoading(true);

	const networkUpdate = fetch(request)
		.then((response) => {
			if (isValidResponse(request, response, cachePredicate)) {
				return response.json();
			} else {
				throw Error('The received response is not valid!');
			}
		})
		.then((data) => {
			networkDataReceived = true;
			cache.then((cache) => cache.addToCache(request, data, cacheName));
			refreshCallbacks.onReady(data);
		});

	cache.then((cache) =>
		cache
			.match(request)
			.then((response) => {
				if (!response) throw Error('No cached data available!');
				return response.json();
			})
			.then((data) => {
				if (!networkDataReceived) {
					refreshCallbacks.onReady(data);
				}
			})
			.catch(() => networkUpdate)
			.catch((error) => {
				refreshCallbacks.onError(error);
			})
			.then(() => {
				refreshCallbacks.onLoading(false);
			})
	);
}

export function networkFirst(stragedy: CacheStragedy): void {
	const { event, request, cacheName, cachePredicate } = stragedy;
	const cache = caches.open(cacheName);
	event.respondWith(
		fromNetwork(request).then((response) => {
			if (response) {
				if (isValidResponse(request, response, cachePredicate)) {
					event.waitUntil(
						cache.then((cache) => {
							cache.addToCache(request, response.clone(), cacheName);
						})
					);
					return response;
				}
			}
			return cache.then((cache) => cache.match(request).then((response) => response || getFallback(request.destination))).catch((error) => handleFailure(event, request, error));
		})
	);
}

async function getFallback(destination: string): Promise<Response | undefined> {
	DEBUG_MODE && logger.warn('Retrieving fallback for: ', destination);
	const cache = await caches.open(cacheKeys.FALLBACK_CACHE);
	switch (destination) {
		case cachableTypes.FONT: {
			return (await cache.match(fallbacks.FALLBACK_FONT_URL)) || errorResponse();
		}
		case cachableTypes.IMAGE: {
			return (await cache.match(fallbacks.FALLBACK_IMAGE_URL)) || errorResponse();
		}
		default:
			return (await cache.match(fallbacks.FALLBACK_HTML_URL)) || errorResponse();
	}
}

async function handleFailure(event: any, request: any, error?: any): Promise<Response> {
	DEBUG_MODE && logger.error('Handling failure: ', error);
	return Promise.resolve(errorResponse());
}
