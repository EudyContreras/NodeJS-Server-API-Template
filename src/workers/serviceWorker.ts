/* eslint-disable @typescript-eslint/no-unused-vars */

import { hours, days, months, seconds } from './helpers/timespan.helper';
import { logger, handleWebp, filetypePatterns, filetypeCache, isHomeOrigin, inRange } from './commons';
import { syncContent } from './helpers/syncevent.Helper';
import { staleWhileRevalidate, cacheThenRefresh, cacheFirst, networkFirst, addToCache, cacheResponse, fromNetwork } from './stragedies';
import { httpMethods, updateNotification, cachableTypes, commonOrigins, fallbacks, cacheNames, constants, syncEvents, messages, events } from './constants';
import { func } from '@hapi/joi';

const DEBUG_MODE = process.env.NODE_ENV !== 'production';

const cacheKeys = cacheNames(__VERSION_NUMBER__);
const precacheManifest = [...self.__WB_MANIFEST];

const precacheableFallbacks = [
	{ url: fallbacks.FALLBACK_HTML_URL, revision: null },
	{ url: fallbacks.FALLBACK_IMAGE_URL, revision: null },
	{ url: fallbacks.FALLBACK_ERROR_URL, revision: null },
	{ url: fallbacks.FALLBACK_FONT_URL, revision: null }
];

const notifyClient = (event: Event | any, message: ClientMessage): void => {
	event.waitUntil(async () => {
		if (!event.clientId) return;

		const client = await self.clients.get(event.clientId);

		if (!client) return;

		client.postMessage(message);
	});
};

const defaultCachePredicate: CachePredicate = {
	crossOrigin: true,
	cacheCondition: ({ response }) => (response && inRange(response?.status, 200, 300)) || false
};

const isSideEffectRequest = (request: Request): boolean =>
	[...Object.values(constants.sideEffects)].includes(request.method) || request.method !== httpMethods.GET;

const isWebFontRequest = (destination: string, url: any): boolean => destination === cachableTypes.FONT || url.origin === commonOrigins.STATIC_WEB_FONTS;

const isAcceptedApiRequest = (request: Request): boolean => request.url.includes('/api/') && request.method === httpMethods.GET;

const any = (destination: string, ...types: string[]): boolean => types.includes(destination);

DEBUG_MODE && logger.log('Your service worker is loaded 🎉');

self.addEventListener(events.FETCH, async (event: any) => {
	const request: Request = event.request.clone();
	const url: URL = new URL(request.url);
	let destination: string = request.destination;

	if (!url.origin.startsWith('http')) return;

	if (destination === '') {
		if (filetypePatterns.IMAGE.test(request.url)) {
			destination = cachableTypes.IMAGE;
		} else if (filetypePatterns.STATIC.test(request.url)) {
			destination = cachableTypes.SCRIPT;
		} else if (filetypePatterns.DATA.test(request.url)) {
			destination = cachableTypes.DOCUMENT;
		}
	}

	DEBUG_MODE && logger.info(request.destination, request.url);

	if (isHomeOrigin(url)) {
		const cacheName = cacheKeys.STATIC_CACHE;
		DEBUG_MODE && logger.info('Hit for origin', request);
		staleWhileRevalidate({ url, event, request, cacheName, theresholdAge: days(1) });
		return;
	}

	if (any(destination, cachableTypes.STYLE, cachableTypes.SCRIPT, cachableTypes.DOCUMENT)) {
		return handleDocumentRequests(url, event, request);
	}

	if (isWebFontRequest(destination, url)) {
		return handleFontRequests(url, event, request);
	}

	if (destination === cachableTypes.IMAGE) {
		return handleImageRequests(url, event, request);
	}

	if (destination === cachableTypes.AUDIO) {
		return handleAudioRequests(url, event, request);
	}

	if (destination === cachableTypes.VIDEO) {
		return handleVideoRequests(url, event, request);
	}

	if (isAcceptedApiRequest(request)) {
		return handleApiRequests(url, event, request);
	}
});

function handleDocumentRequests(url, event, request): void {
	const cacheName = url.origin === commonOrigins.STYLESHEET_FONTS ? cacheKeys.GOOGLE_FONTS_SHEETS_CACHE : cacheKeys.STATIC_CACHE;
	const cachePredicate: CachePredicate = {
		crossOrigin: true,
		cacheCondition: ({ response }) => (response && inRange(response?.status, 200, 300)) || false
	};
	staleWhileRevalidate({ url, event, request, cacheName, cachePredicate: cachePredicate, theresholdAge: days(1) });
}

function handleFontRequests(url, event, request): void {
	const cacheName = cacheKeys.GOOGLE_FONTS_WEB_CACHE;
	const cachePredicate: CachePredicate = {
		crossOrigin: true,
		acceptedStatus: [0, 200, 203, 202]
	};
	cacheFirst({ url, event, request, cacheName, cachePredicate });
}

function handleImageRequests(url, event, request): void {
	const cacheName = cacheKeys.IMAGE_CACHE;
	const quotaOptions: CacheQuotaOptions = {
		clearOnError: true,
		maxAgeSeconds: months(3),
		maxEntries: 100
	};

	cacheFirst({ url, event, request, cacheName, quotaOptions, cachePredicate: defaultCachePredicate });
}

function handleAudioRequests(url, event, request): void {
	const cacheName = cacheKeys.MEDIA_CACHE;
	const quotaOptions: CacheQuotaOptions = {
		clearOnError: true,
		maxAgeSeconds: months(2),
		maxEntries: 30
	};
	cacheFirst({ url, event, request, cacheName, quotaOptions, cachePredicate: defaultCachePredicate });
}

function handleVideoRequests(url, event, request): void {
	const cacheName = cacheKeys.MEDIA_CACHE;
	const quotaOptions: CacheQuotaOptions = {
		clearOnError: true,
		maxAgeSeconds: days(30),
		maxEntries: 10
	};
	cacheFirst({ url, event, request, cacheName, quotaOptions, cachePredicate: defaultCachePredicate });
}

function handleApiRequests(url, event, request): void {
	const cacheName = cacheKeys.DATA_CACHE;
	const cachePredicate: CachePredicate = {
		crossOrigin: true,
		acceptedStatus: [0, 200, 203, 202]
	};
	const quotaOptions: CacheQuotaOptions = {
		clearOnError: true,
		maxAgeSeconds: hours(6),
		maxEntries: 8
	};
	networkFirst({ url, event, request, cacheName, quotaOptions, cachePredicate: cachePredicate });
}

self.addEventListener(events.INSTALL, async (event: Event | any) => {
	DEBUG_MODE && logger.log(events.INSTALL, `Version : ${__VERSION_NUMBER__}`, event);

	const allResources = Array.from(new Set([...precacheManifest.map((x: any) => x.url), ...constants.urlsToCache]));

	const precacheCallback = async (cacheName: string, requests: string[]): Promise<void> => {
		try {
			const cache = await caches.open(cacheName);
			await cache.addAll(requests);
		} catch (error) {
			DEBUG_MODE && logger.error('Could not save urls: ', requests, error);
		}
	};

	caches.open(cacheKeys.STATIC_CACHE).then((cache) => {
		cache.add(new Request(self.origin));
	});

	if (allResources.length > 0) {
		event.waitUntil(
			handleInstallation(allResources, precacheCallback)
				.then(() => self.skipWaiting())
				.catch((error) => logger.log(error))
		);
	}
});

const handleInstallation = async (urls: string[], callback: (cacheName: string, urls: string[]) => void): Promise<void> => {
	try {
		const imageAssets = urls.filter((x) => filetypePatterns.IMAGE.test(x) || filetypePatterns.PROGRESSIVE_IMAGE.test(x));
		const mediaAssets = urls.filter((x) => filetypePatterns.VIDEO.test(x) || filetypePatterns.AUDIO.test(x));
		const fontAssests = urls.filter((x) => filetypePatterns.FONT.test(x));
		const staticAssets = urls.filter((x) => filetypePatterns.STATIC.test(x));
		const dataAssets = urls.filter((x) => filetypePatterns.DATA.test(x));

		if (imageAssets.length > 0) {
			await callback(cacheKeys.IMAGE_CACHE, imageAssets);
		}
		if (fontAssests.length > 0) {
			await callback(cacheKeys.GOOGLE_FONTS_WEB_CACHE, fontAssests);
		}
		if (staticAssets.length > 0) {
			await callback(cacheKeys.STATIC_CACHE, staticAssets);
		}
		if (mediaAssets.length > 0) {
			await callback(cacheKeys.MEDIA_CACHE, mediaAssets);
		}
		if (dataAssets.length > 0) {
			await callback(cacheKeys.DATA_CACHE, dataAssets);
		}
	} catch (error) {
		DEBUG_MODE && logger.error('Something went wrong!', error);
	}
};

self.addEventListener(events.ACTIVATE, async (event: any) => {
	DEBUG_MODE && logger.log(events.ACTIVATE, `Version : ${__VERSION_NUMBER__}`, event);

	event.waitUntil(
		caches
			.keys()
			.then((currentCaches) => {
				const expectedCaches = Object.values(cacheKeys);
				return Promise.all(
					currentCaches
						.filter((key) => !expectedCaches.includes(key))
						.map((key) => {
							DEBUG_MODE && logger.log(`Deleting cache name: ${key}`);
							return caches.delete(key);
						})
				);
			})
			.catch((error) => logger.log(error))
	);
	return self.clients.claim();
});

self.addEventListener(events.CONTROLLING, async (event: any) => {
	DEBUG_MODE && logger.log(events.CONTROLLING, event);
	window.location.reload();
});

self.addEventListener(events.WAITING, async (event: any) => {
	DEBUG_MODE && logger.log(events.WAITING, event);
	notifyClient(event, {
		type: constants.clientMessages.UPDATE_AVAILABLE
	});
});

self.addEventListener(events.PUSH, (event: Event | any) => {
	DEBUG_MODE && logger.log('Push event received:', event.data);

	const { title, options } = updateNotification;

	const notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);
});

self.addEventListener(events.NOTIFY_CLICK, (event: Event | any) => {
	DEBUG_MODE && logger.log('Notification has been clicked');

	event.notification.close();

	const tag = event.notification.tag;

	switch (tag) {
		case constants.push.NEW_UPDATE: {
			event.waitUntil(self.clients.openWindow(constants.baseUrl));
			break;
		}
		default: {
			event.waitUntil(self.clients.openWindow(constants.baseUrl));
		}
	}
});

self.addEventListener(events.SYNC, (event: Event | any) => {
	DEBUG_MODE && logger.log(events.SYNC, 'Triggered sync event:', event);
});

self.addEventListener(events.PERIODIC_SYNC, (event: Event | any) => {
	DEBUG_MODE && logger.log(events.PERIODIC_SYNC, 'Triggered periodic sync event:', event);

	switch (event.tag) {
		case syncEvents.periodic.CONTENT_SYNC: {
			event.waitUntil(syncContent(cacheKeys));
			break;
		}
		default: {
			event.registration.unregister();
		}
	}
});

self.addEventListener(events.MESSAGE, async (event: any) => {
	DEBUG_MODE && logger.log(events.MESSAGE, event.data?.type, event);

	const data: WorkerMessage = event.data;

	if (!data) return;

	switch (data.type) {
		case messages.SKIP_WAITING: {
			self.skipWaiting();
			break;
		}
		case messages.CACHE_URLS: {
			const payload = data.payload;
			addToCache(payload.cacheName, ...payload.urlsToCache);
			break;
		}
		case messages.UNREGISTER_SYNC: {
			const payload = data.payload;
			try {
				const registration = await navigator.serviceWorker.ready;
				await registration.periodicSync.unregister(payload);
				if (DEBUG_MODE) {
					registration.periodicSync.getTags().then((tags) => {
						logger.log('Registered tags: ', tags);
					});
				}
			} catch (error) {
				logger.error('Error under sync unregistration!', error);
			}
			break;
		}
		case messages.ADD_TO_CACHE: {
			const request = new Request(data.payload);
			const cacheName = filetypeCache(data.payload, cacheKeys);
			try {
				const response = await fromNetwork(request, seconds(10));
				cacheResponse(cacheName, request, response);
			} catch (error) {
				DEBUG_MODE && logger.error('Something went wrong!', error);
			}
			break;
		}
	}
});
