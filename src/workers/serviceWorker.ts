/* eslint-disable @typescript-eslint/no-unused-vars */

import { staleWhileRevalidate, cacheFirst, networkFirst, addToCache, cacheResponse, fromNetwork } from './stragedies';
import { logger, supportsWebp, ClientMessage, WorkerMessage, filetypePatterns, filetypeCache, isNullOrEmpty, CacheQuotaOptions, CachePredicate, inRange } from './commons';

import {
	httpMethods,
	updateNotification,
	cachableTypes,
	commonOrigins,
	fallbacks,
	cacheNames,
	constants,
	messages,
	events
} from './constants';

const cacheKeys = cacheNames(__VERSION_NUMBER__);
const precacheManifest = [...self.__WB_MANIFEST];
const allowRequestLog = true;

   
const notifyClient = (event: Event | any, message: ClientMessage): void => {
	event.waitUntil(async () => {
		if (!event.clientId) return;

		const client = await self.clients.get(event.clientId);

		if (!client) return;

		client.postMessage(message);
	});
};

const isSideEffectRequest = (request: Request): boolean => {
	return [...Object.values(constants.sideEffects)].includes(request.method) || request.method != httpMethods.GET;
};

const isWebFontRequest = (request: Request, url: any): boolean => {
	return request.destination === cachableTypes.FONT || url.origin === commonOrigins.STATIC_WEB_FONTS;
};

const isAcceptedApiRequest = (request: Request): boolean => {
	return request.url.includes('/api/') && request.method == httpMethods.GET;
};

const days = (count: number): number => hours(count * 24);
const years = (count: number): number => days(count * 365);
const weeks = (count: number): number => days(count * 7);
const months = (count: number): number => days(count * 30);
const hours = (count: number): number => minutes(count * 60);
const minutes = (count: number): number => 1 * 24 * count * 60;
const seconds = (count: number): number => count * 1000;

const any = (request: Request, ...types: string[]): boolean => {
	for (let index = 0; index < types.length; index++) {
		const type = types[index];
		if (request.destination === type) {
			return true;
		}
	}
	return false;
};

if (process.env.NODE_ENV !== 'production') {
	logger.log('Yay! worker is loaded 🎉');
}

const precacheableFallbacks = [
	{ url: fallbacks.FALLBACK_IMAGE_URL, revision: null },
	{ url: fallbacks.FALLBACK_ERROR_URL, revision: null },
	{ url: fallbacks.FALLBACK_FONT_URL, revision: null }
];

self.addEventListener(events.FETCH, async (event: any) => {
	const request: Request = event.request.clone();
	const url: any = request.url;

	if (!(url.indexOf('http') === 0)) {
		return;
	}

	if (process.env.NODE_ENV !== 'production' && allowRequestLog) {
		logger.info(request.destination, url);
	}
	if (url.origin === self.location.origin && isNullOrEmpty(url.pathname)) {
		const cacheName = cacheKeys.STATIC_CACHE;
		staleWhileRevalidate({ event, request, cacheName });
	}

	if (any(request, cachableTypes.STYLES, cachableTypes.SCRIPTS, cachableTypes.DOCUMENT)) {
		const cacheName = cacheKeys.STATIC_CACHE;
		const cachePredicate: CachePredicate = {
			cacheCondition: ({ response }) => response && inRange(response?.status, 200, 300) || false
		};
		staleWhileRevalidate({ event, request, cacheName, cachePredicate });
	}

	if (url.origin === commonOrigins.STYLESHEET_FONTS) {
		const cacheName = cacheKeys.GOOGLE_FONTS_SHEETS_CACHE;
		const cachePredicate: CachePredicate = {
			cacheCondition: ({ response }) => response && inRange(response?.status, 200, 300) || false
		};
		staleWhileRevalidate({ event, request, cacheName, cachePredicate });
	}

	if (isWebFontRequest(request, url)) {
		const cacheName = cacheKeys.GOOGLE_FONTS_WEB_CACHE;
		const cachePredicate: CachePredicate = {
			acceptedStatus: [0, 200, 203, 202]
		};
		cacheFirst({ event, request, cacheName, cachePredicate });
	}

	if (request.destination === cachableTypes.IMAGES) {
		const cacheName = cacheKeys.IMAGE_CACHE;
		const quotaOptions: CacheQuotaOptions = {
			clearOnError: true,
			maxAgeSeconds: months(3),
			maxEntries: 100
		};
		if (filetypePatterns.PROGRESSIVE_IMAGE.test(request.url)) {
			supportsWebp().then(hasSupport => {
				if (hasSupport) cacheFirst({ event, request, cacheName, quotaOptions });
			}).catch(error => {
				logger.warn('No support for webp!', error);
			});
		} else {
			cacheFirst({ event, request, cacheName, quotaOptions });
		}
	}

	if (request.destination === cachableTypes.AUDIO) {
		const cacheName = cacheKeys.MEDIA_CACHE;
		const quotaOptions: CacheQuotaOptions = {
			clearOnError: true,
			maxAgeSeconds: months(2),
			maxEntries: 30
		};
		cacheFirst({ event, request, cacheName, quotaOptions });
	}

	if (request.destination === cachableTypes.VIDEO) {
		const cacheName = cacheKeys.MEDIA_CACHE;
		const quotaOptions: CacheQuotaOptions = {
			clearOnError: true,
			maxAgeSeconds: days(30),
			maxEntries: 10
		};
		cacheFirst({ event, request, cacheName, quotaOptions });
	}

	if (isAcceptedApiRequest(request)) {
		const cacheName = cacheKeys.DATA_CACHE;
		const quotaOptions: CacheQuotaOptions = {
			clearOnError: true,
			maxAgeSeconds: hours(6),
			maxEntries: 8
		};
		networkFirst({ event, request, cacheName, quotaOptions });
	}
});

self.addEventListener(events.INSTALL, async (event: any) => {
	if (process.env.NODE_ENV !== 'production') {
		logger.log(events.INSTALL, `Version : ${__VERSION_NUMBER__}`, event);
	}

	if (event.isUpdate) {
		logger.log(events.INSTALLED, 'Update available');
		notifyClient(event, {
			type: constants.clientMessages.UPDATE_AVAILABLE
		});
	} else {
		if (process.env.NODE_ENV !== 'production') {
			logger.log(events.INSTALLED, 'First installation');
		}
	}

	const allResources = new Set([...precacheManifest.map((x: any) => x.url), ...constants.urlsToCache]);
	const precacheCallback = async (cacheName: string, urls: string[]): Promise<void> => {
		try {
			const cache = await caches.open(cacheName);
			await cache.addAll(urls);
		} catch (error) {
			logger.error('Could not save urls: ', urls, error);
		}
	};

	event.waitUntil(
		handleInstallation(Array.from(allResources), precacheCallback)
			.then(() => self.skipWaiting())
			.catch(error => logger.log(error))
	);
});

const handleInstallation = async (urls: string[], callback: (cacheName: string, urls: string[]) => void): Promise<void> => {
	try {
		const imageAssets = urls.filter(x => filetypePatterns.IMAGE.test(x) || filetypePatterns.PROGRESSIVE_IMAGE.test(x));
		const mediaAssets = urls.filter(x => filetypePatterns.VIDEO.test(x) || filetypePatterns.AUDIO.test(x));
		const fontAssests = urls.filter(x => filetypePatterns.FONT.test(x));
		const staticAssets = urls.filter(x => filetypePatterns.STATIC.test(x));
		const dataAssets = urls.filter(x => filetypePatterns.DATA.test(x));

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
			await callback(cacheKeys.MEDIA_CACHE, dataAssets);
		}
	} catch (error) {
		logger.error('Something went wrong!', error);
	}
};

self.addEventListener(events.ACTIVATE, async (event: any) => {
	if (process.env.NODE_ENV !== 'production') {
		logger.log(events.ACTIVATE, `Version : ${__VERSION_NUMBER__}`, event);
	}

	event.waitUntil(
		caches.keys()
			.then(currentCaches => {
				const expectedCaches = Object.values(cacheKeys);
				return currentCaches.filter(key => !expectedCaches.includes(key));
			}).then(keys => {
				keys.forEach(key => {
					logger.log(`Deleting cache name: ${key}`);
					return caches.delete(key);
				});
			}).catch(error => logger.log(error)));
	return self.clients.claim();
});

self.addEventListener(events.CONTROLLING, async (event: any) => {
	if (process.env.NODE_ENV !== 'production') {
		logger.log(events.CONTROLLING, event);
	}
	window.location.reload();
});

self.addEventListener(events.WAITING, async (event: any) => {
	if (process.env.NODE_ENV !== 'production') {
		logger.log(events.WAITING, event);
	}
	notifyClient(event, {
		type: constants.clientMessages.UPDATE_AVAILABLE
	});
});

self.addEventListener(events.PUSH, (event: Event | any) => {
	logger.log('Push event received:', event.data);

	const { title, options } = updateNotification;

	const notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);
});

self.addEventListener(events.NOTIFY_CLICK, (event: Event | any) => {
	logger.log('Notification has been clicked');

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
	if (process.env.NODE_ENV !== 'production') {
		logger.log(events.SYNC, 'Triggered sync event:', event);
	}
});

self.addEventListener(events.PERIODIC_SYNC, (event: Event | any) => {
	if (process.env.NODE_ENV !== 'production') {
		logger.log(events.PERIODIC_SYNC, 'Triggered periodic sync event:', event);
	}
});

self.addEventListener(events.MESSAGE, async (event: any) => {
	if (process.env.NODE_ENV !== 'production') {
		logger.log(events.MESSAGE, event);
	}

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
		case messages.ADD_TO_CACHE: {
			const request = new Request(data.payload);
			const cacheName = filetypeCache(data.payload, cacheKeys);
			try {
				const response = await fromNetwork(request, seconds(10));
				cacheResponse(cacheName, request, response);
			} catch (error) {
				if (process.env.NODE_ENV !== 'production') logger.error('Something went wrong!', error);
			}
		}
	}
});
