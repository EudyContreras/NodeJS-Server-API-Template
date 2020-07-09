/* eslint-disable @typescript-eslint/no-unused-vars */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

declare const workbox: typeof import('workbox-sw').default;

import { worker, supportsWebp, ClientMessage, WorkerMessage, filetypePatterns } from './commons';

import {
	httpMethods,
	updateNotification,
	cachableTypes,
	commonOrigins,
	fallbacks,
	cacheKeys,
	constants,
	messages,
	syncEvents
} from './constants';

const precacheManifest = [...self.__WB_MANIFEST];

const isNullOrEmpty = (path): boolean => {
	return !path || path === '' || path == undefined;
};

const throwOnError = (response: Response): Response => {
	if (response.status >= 200 && response.status < 300 || response.status === 0) {
		return response;
	}
	if (process.env.NODE_ENV !== 'production') {
		worker.error(response.statusText);
	}
	return new Response(null);
};

const notifyClient = (event: Event | any, message: ClientMessage): void => {
	event.waitUntil(async () => {
		if (!event.clientId) return;
	
		const client = await self.clients.get(event.clientId);

		if (!client) return;

		client.postMessage(message);
	});
};

const addToCache = async (cacheName: string, ...urls: string[]): Promise<void> => {
	const myCache = await caches.open(cacheName);
	await myCache.addAll(urls);
};

const cacheResponse = async (cacheName: string, request: Request, response: Response): Promise<void> => {
	const myCache = await caches.open(cacheName);
	await myCache.put(request, response);
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
const months = (count: number): number => days(count * 30);
const hours = (count: number): number => minutes(count * 60);
const minutes = (count: number): number => 1 * 24 * count * 60;

const any = (request: Request, ...types: string[]): boolean => {
	for (let index = 0; index < types.length; index++) {
		const type = types[index];
		if (request.destination === type) {
			return true;
		}
	}
	return false;
};

if (workbox) {
	if (process.env.NODE_ENV !== 'production') {
		worker.log('Yay! Workbox is loaded 🎉');
	}

	if (process.env.NODE_ENV !== 'production') {
		workbox.setConfig({
			debug: true
		});
	}

	workbox.core.skipWaiting();
	workbox.core.clientsClaim();

	workbox.core.setCacheNameDetails({
		precache: cacheKeys.PRECACHE_CACHE,
		runtime: cacheKeys.RUNTIME_CACHE,
		googleAnalytics: cacheKeys.GOGGLE_ANALYTICS
	});

	workbox.googleAnalytics.initialize({
		hitFilter: (params) => {
			const queueTimeInSeconds = Math.round(params.get('qt') / 1000);
			params.set('cm1', queueTimeInSeconds);
		}
	});

	const precacheableFallbacks = [
		{ url: fallbacks.FALLBACK_IMAGE_URL, revision: null },
		{ url: fallbacks.FALLBACK_ERROR_URL, revision: null },
		{ url: fallbacks.FALLBACK_FONT_URL, revision: null }
	];
	
	workbox.precaching.precacheAndRoute(precacheManifest || []);

	workbox.routing.setDefaultHandler(new workbox.strategies.StaleWhileRevalidate());

	workbox.routing.registerRoute(
		({ url }) => url.origin === self.location.origin && isNullOrEmpty(url.pathname),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: cacheKeys.STATIC_CACHE
		})
	);

	workbox.routing.registerRoute(
		({ request }) => any(request, cachableTypes.STYLES, cachableTypes.SCRIPTS, cachableTypes.DOCUMENT),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: cacheKeys.STATIC_CACHE
		})
	);

	workbox.routing.registerRoute(
		({ request }) => any(request, cachableTypes.STYLES, cachableTypes.SCRIPTS),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: cacheKeys.STATIC_CACHE
		})
	);

	workbox.routing.registerRoute(
		({ url }) => url.origin === commonOrigins.STYLESHEET_FONTS,
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: cacheKeys.GOOGLE_FONTS_SHEETS_CACHE
		})
	);

	workbox.routing.registerRoute(
		({ url }) => url.origin === commonOrigins.STATIC_WEB_FONTS,
		new workbox.strategies.CacheFirst({
			cacheName: cacheKeys.GOOGLE_FONTS_WEB_CACHE,
			plugins: [
				new workbox.cacheableResponse.CacheableResponsePlugin({
					statuses: [0, 200, 203, 202]
				}),
				new workbox.expiration.ExpirationPlugin({
					maxAgeSeconds: years(1),
					maxEntries: 30
				})
			]
		})
	);

	workbox.routing.registerRoute(
		({ request, url }) => isWebFontRequest(request, url),
		new workbox.strategies.CacheFirst({
			cacheName: cacheKeys.GOOGLE_FONTS_WEB_CACHE,
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					maxAgeSeconds: days(30),
					maxEntries: 80
				})
			]
		})
	);

	workbox.routing.registerRoute(
		({ request }) => {
			if (filetypePatterns.PROGRESSIVE_IMAGE.test(request.url)) {
				return supportsWebp();
			}
			return request.destination === cachableTypes.IMAGES;
		},
		new workbox.strategies.CacheFirst({
			cacheName: cacheKeys.IMAGE_CACHE,
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					purgeOnQuotaError: true,
					maxAgeSeconds: days(30),
					maxEntries: 80
				})
			]
		})
	);

	workbox.routing.registerRoute(
		({ request }) => request.destination === cachableTypes.AUDIO,
		new workbox.strategies.CacheFirst({
			cacheName: cacheKeys.MEDIA_CACHE,
			plugins: [
				new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [200] }),
				new workbox.expiration.ExpirationPlugin({
					purgeOnQuotaError: true,
					maxAgeSeconds: days(30),
					maxEntries: 60
				})
			]
		})
	);

	workbox.routing.registerRoute(
		({ request }) => request.destination === cachableTypes.VIDEO,
		new workbox.strategies.CacheFirst({
			cacheName: cacheKeys.MEDIA_CACHE,
			plugins: [
				new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [200] }),
				new workbox.rangeRequests.RangeRequestsPlugin(),
				new workbox.expiration.ExpirationPlugin({
					purgeOnQuotaError: true,
					maxAgeSeconds: months(6),
					maxEntries: 8
				})
			]
		})
	);

	workbox.routing.registerRoute(
		({ request }) => isAcceptedApiRequest(request),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: cacheKeys.DATA_CACHE,
			plugins: [
				new workbox.broadcastUpdate.BroadcastUpdatePlugin(),
				new workbox.expiration.ExpirationPlugin({
					maxAgeSeconds: minutes(10)
				})
			]
		})
	);

	workbox.routing.registerRoute(
		filetypePatterns.API_DATA,
		new workbox.strategies.NetworkOnly({
			plugins: [
				new workbox.backgroundSync.BackgroundSyncPlugin(constants.cacheKeys.QUEUE_CACHE, {
					maxRetentionTime: hours(24)
				})
			]
		}),
		constants.sideEffects.POST
	);

	workbox.routing.setCatchHandler(({ event }) => {
		switch (event.request.destination) {
			case cachableTypes.DOCUMENT:
				return workbox.matchPrecache(fallbacks.FALLBACK_HTML_URL);
			case cachableTypes.IMAGES:
				return workbox.matchPrecache(fallbacks.FALLBACK_IMAGE_URL);
			case cachableTypes.FONT:
				return workbox.matchPrecache(fallbacks.FALLBACK_FONT_URL);
			default:
				return workbox.matchPrecache(fallbacks.FALLBACK_ERROR_URL);
		}
	});

	self.addEventListener(constants.events.INSTALLED, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.INSTALLED, event);
		}
		if (event.isUpdate) {
			notifyClient(event, {
				type: constants.clientMessages.UPDATE_AVAILABLE
			});
		} else {
			if (process.env.NODE_ENV !== 'production') {
				worker.log(constants.events.INSTALLED, 'First installation');
			}
		}
	});

	self.addEventListener(constants.events.INSTALL, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.INSTALL, event);
		}

		event.waitUntil(
			caches.open(cacheKeys.STATIC_CACHE)
				.then(cache => {
					const cacheRes = (precacheManifest).map((x: any) => x.url);
					return cache.addAll([...constants.urlsToCache, ...cacheRes]);
				})
				.then(() => self.skipWaiting())
				.catch(error => worker.log(error))
		);
	});

	self.addEventListener(constants.events.ACTIVATE, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.ACTIVATE, event);
		}

		const expectedCaches = Object.values(cacheKeys);

		event.waitUntil(async () => {
			caches.keys()
				.then(keys => keys.filter(key => !expectedCaches.includes(key)))
				.then(keys => Promise.all(keys.map(key => {
					worker.log(`Deleting cache ${key}`);
					return caches.delete(key);
				})));
		});
		return self.clients.claim();
	});

	self.addEventListener(constants.events.ACTIVATED, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.ACTIVATED, event);
		}
		const urlsToCache = [
			location.href,
			...performance.getEntriesByType('resource').map((r) => r.name)
		];

		workbox.messageSW({
			type: messages.CACHE_URLS,
			payload: { urlsToCache }
		});
	});

	self.addEventListener(constants.events.CONTROLLING, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.CONTROLLING, event);
		}
		window.location.reload();
	});
	
	self.addEventListener(constants.events.EXTERNAL_WAITING, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.WAITING, event);
		}
		notifyClient(event, {
			type: constants.clientMessages.UPDATE_AVAILABLE
		});
	});

	self.addEventListener(constants.events.WAITING, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.WAITING, event);
		}
		notifyClient(event, {
			type: constants.clientMessages.UPDATE_AVAILABLE
		});
	});

	self.addEventListener(constants.events.PUSH, (event: Event | any) => {
		worker.log('Push event received:', event.data);
		
		const { title, options } = updateNotification;
	
		const notificationPromise = self.registration.showNotification(title, options);
		event.waitUntil(notificationPromise);
	});
	
	self.addEventListener(constants.events.NOTIFY_CLICK, (event: Event | any) => {
		worker.log('Notification has been clicked');
		
		event.notification.close();
	
		const tag = event.notification.tag;
	
		switch(tag) {
			case constants.push.NEW_UPDATE: {
				event.waitUntil(self.clients.openWindow(constants.baseUrl));
				break;
			}
			default: {
				event.waitUntil(self.clients.openWindow(constants.baseUrl));
			}
		}
	});

	
	/**
	 * Attempt to sync non-urgent content silently on the background
	 */
	self.addEventListener(constants.events.SYNC, (event: Event | any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.SYNC, 'Triggered sync event:', event);
		}
	});

	self.addEventListener(constants.events.PERIODIC_SYNC, (event: Event | any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.PERIODIC_SYNC, 'Triggered periodic sync event:', event);
		}
	});

	self.addEventListener(constants.events.MESSAGE, async (event: any) => {
		if (process.env.NODE_ENV !== 'production') {
			worker.log(constants.events.MESSAGE, event);
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

				fetch(request)
					.then(throwOnError)
					.then(response => {
						switch (event.request.destination) {
							case cachableTypes.IMAGES:
								cacheResponse(cacheKeys.IMAGE_CACHE, request, response);
								break;
							case cachableTypes.AUDIO: case cachableTypes.VIDEO:
								cacheResponse(cacheKeys.MEDIA_CACHE, request, response);
								break;
							default:
								cacheResponse(cacheKeys.STATIC_CACHE, request, response);
								break;
						}
					}).catch((error) => {
						if (process.env.NODE_ENV !== 'production') worker.error('Something went wrong!', error);
					});
			}
		}
	});
} else {
	if (process.env.NODE_ENV !== 'production') {
		worker.log('Boo! Workbox didn\'t load 😬');
	}
}