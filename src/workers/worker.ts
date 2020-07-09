
self.__WB_MANIFEST;

import { contentTypes, cacheKeys, syncEvents, updateNotification, constants } from './constants';

const TIMEOUT = 1000;

const worker = {
	log: (...message: any): void => {
		const css = 'background: #00b6ffbd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	warn: (...message: any): void => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	error: (...message: any): void => {
		const css = 'background: #ff0038bd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	}
};

const initialSync = (): Promise<boolean> => {
	return new Promise((resolve)=> {
		return resolve(true);
	});
};

const contentSync = (): Promise<boolean> => {
	return new Promise((resolve)=> {
		return resolve(true);
	});
};

const addDelay = (ms: number) => (): any => new Promise(resolve => setTimeout(() => resolve(), ms));

const getFallback = async (contentType: string = contentTypes.HTML): Promise<any> => {
	switch(contentType) {
		case contentTypes.HTML: {
			const cache = await caches.open(cacheKeys.FALLBACK_CACHE);
			return cache.match('/offline.html');
		}
	}
};

const useFallback = (contentType: string = contentTypes.HTML): any => {
	switch(contentType) {
		case contentTypes.IMAGE: {
			return Promise.resolve(new Response(cacheKeys.FALLBACK_CACHE, {
				headers: {
					'Content-Type': 'image/svg+xml'
				}
			}));
		}
	}
};

const throwOnError = (response: Response): Response => {
	if (response.status >= 200 && response.status < 300 || response.status === 0) {
		return response;
	}
	worker.error(response.statusText);
	return new Response(null);
};

const isRequestForStaticHtml = (request: Request): boolean => {
	return /.(html)$/.test(request.url);
};

const isRequestForStaticAsset = (request: Request): boolean => {
	return /.(png|svg|json|jpg|jpeg|gif|ico|css|js)$/.test(request.url);
};

const isSideEffectRequest = (request: Request): boolean => {
	return [...Object.values(constants.httpMethods)].includes(request.method) || request.method != 'GET';
};

const isApiRequest = (request: Request): boolean => {
	return request.url.includes('/api/');
};

const fromNetwork = (request: Request): Promise<any> => {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(reject, TIMEOUT);

		fetch(request).then(response => {
			clearTimeout(timeoutId);
			resolve(response);
		}, reject);
	});
};

const fromCache = (request: Request, cacheName: string): Promise<Response> => {
	return caches.open(cacheName)
		.then(cache => cache.match(request))
		.then(match => match || Promise.reject('no-request-match'));
};

const updateCache = (request: Request, cacheName: string): Promise<void> => {
	return caches.open(cacheName).then((cache) => {
		return fetch(request).then((response) => {
			return cache.put(request, response.clone());
		});
	});
};

const refreshClient = (response: Response): void => {
	return self.clients.matchAll()
		.then((clients: any[]) => clients.forEach(client => {
			client.postMessage(JSON.stringify({
				type: constants.messages.REFRESH,
				url: response.url
			}));
		}));
};

const update = (request: RequestInfo, cacheName: string = cacheKeys.DATA_CACHE): Promise<any> => {
	return fetch(request).then(response => {
		if (!response.ok) throw new Error('Network error');

		return caches.open(cacheName).then(cache => {
			cache.put(request, response.clone());
			return response;
		}).then(response => response);
	});
};

const refresh = (response: Response): Promise<any> => {
	return response.json()
		.then(jsonResponse => {		
			self.clients.matchAll().then((clients: any[]) => {
				clients.forEach(client => {
					client.postMessage(JSON.stringify({
						type: constants.messages.APP_UPDATE,
						data: {
							url: response.url,
							payload: jsonResponse.content
						}
					}));
				});
			});
			return jsonResponse.content;
		});
};

const updateSync = (baseUrl: string): Promise<any> => {
	return update(baseUrl + '/rest/api/schema', cacheKeys.DATA_CACHE)
		.then(refresh)
		.then((data: any) => {
			self.registration.showNotification(`New api version ${data.version}`);
			return 'Notification sent';
		});
};

const networkOrCache = (request: Request, cacheName: string): Promise<Response> => {
	return fromNetwork(request).then(response => {
		return response.ok ? response : fromCache(request, cacheName);
	}).catch(() => {
		return fromCache(request, cacheName);
	});
};

const cacheOrNetwork = (request: Request, cacheName: string): Promise<Response> => {
	return fromCache(request, cacheName).then(response => {
		return response.ok ? response : fromNetwork(request);
	}).catch(() => {
		return fromNetwork(request);
	});
};

const staleWhileRevalidate = (event: any, cacheName: string): void => {
	const request = event.request.clone();
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(request).then(response => {
				const fetchPromise = fetch(request).then(networkResponse => {
					cache.put(request, networkResponse.clone());
					return networkResponse;
				});
				return response || fetchPromise;
			});
		})
	);
};

const supportsWebp = async (): Promise<boolean> => {
	if (!self.createImageBitmap) return false;

	const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
	const blob = await fetch(webpData).then(r => r.blob());

	return createImageBitmap(blob).then(() => true, () => false);
};

type StragedyArgs = {
	event: Event | any;
	request: Request;
	cache?: CacheStorage | undefined | any;
	stragedy?: string | undefined | any;
	contentType?: string | undefined | any;
};

const useStragedy = ({ event, request, cache, stragedy = constants.stragedies.CACHE_FIRST, contentType = contentTypes.HTML }: StragedyArgs): any => {
	switch(stragedy) {
		case constants.stragedies.CACHE_ONLY: {
			return cache.match(request).then(() => useFallback(contentType));
		}
		case constants.stragedies.NETWORK_ONLY: {
			return fetch(request).then(() => useFallback(contentType));
		}
		case constants.stragedies.CACHE_FIRST: {
			return cache.match(request).then((response: Response | any) => {
				return response || fetch(request).then(response => {
					event.waitUntil(cache.put(request, response.clone()));
					return response;
				}).catch(() => {
					return cache.match('/offline.html');
				});
			});
		}
		case constants.stragedies.NETWORK_FIRST: {
			return fetch(request).then(throwOnError).then(response => {
				cache.put(request, response.clone());
				return response;
			}).catch(() => {
				return cache.match(request).then((response: Response) => {
					return response || getFallback();
				});
			});
		}
		case constants.stragedies.STALE_REVALIDATE: {
			return cache.match(request).then((response: Response) => {
				const fetchPromise = fetch(request).then(response => {
					cache.put(request, response.clone());
					return response;
				});
				return response || fetchPromise || useFallback();
			});
		}
		case constants.stragedies.UPDATE_REFRESH: {
			return cache.match(request).then((response: Response) => {
				return new Response(response.body);
			}).catch(() => {
				return fetch(request)
					.then(response => {
						cache.put(request, response.clone());
						return response;
					})
					.catch(() => {
						const body = JSON.stringify({ error: 'ServiceWorker: Sorry, you are offline. Please, try later.' });
						const headers = { 'Content-Type': 'application/json' };
						const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
						return response;
					});
			});
		}
		case constants.stragedies.CACHE_THEN_PRELOAD: {
			return caches.match(request).then(response => {
				return response || event.preloadResponse.then((response: Response) => {
					return response || fetch(request).then(response => {
						cache.put(request, response.clone());
						return response;
					}).catch(() => {
						return useFallback();
					});
				});
			});
		}
		case constants.stragedies.NON_FOUND: {
			return fetch(request)
				.catch(() => {
					const body = JSON.stringify({ error: 'ServiceWorker: Sorry, you are offline. Please, try later.' });
					const headers = { 'Content-Type': 'application/json' };
					const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
					return response;
				});
		}
	}
};

/**
 * Get stuff nice and ready on this event. Make 
 * the preparations for the SW to work as desired.
 * Store all static assets necessary to render the site
 * as if it were a functional native application here. 
 * Can be used to cache emidiate and non-emidiate resources.
 */
self.addEventListener(constants.events.INSTALL, (event: Event | any) => {
	worker.log('Installed:', event);
	event.waitUntil(
		caches.open(cacheKeys.STATIC_CACHE)
			.then(cache => {
				const cacheRes = (self.__WB_MANIFEST || self.__precacheManifest).map((x: any) => x.url);
				return cache.addAll([...constants.urlsToCache, ...cacheRes]);
			})
			.then(() => self.skipWaiting())
			.catch(error => worker.log(error))
	);
});

/**
 * Do clean up here but keep lightweight to avoid
 * a potential render block
 */
self.addEventListener(constants.events.ACTIVATE, (event: Event | any) => {
	worker.log('Activated:', event);

	const expectedCaches = [cacheKeys.STATIC_CACHE, cacheKeys.DATA_CACHE, cacheKeys.IMAGE_CACHE];

	event.waitUntil(
		caches.keys()
			.then(keys => keys.filter(key => !expectedCaches.includes(key)))
			.then(keys => Promise.all(keys.map(key => {
				worker.log(`Deleting cache ${key}`);
				return caches.delete(key);
			})))
	);

	return self.clients.claim();
});

self.addEventListener(constants.events.FETCH, (event: Event | any) => {
	const request = event.request.clone();

	if(!(request.url.indexOf('http') === 0)){
		return;
	}

	if (isSideEffectRequest(request)) {
		event.respondWith(useStragedy({ event, request, stragedy: constants.stragedies.NON_FOUND }));
		return;
	}

	if (isApiRequest(request)) {
		const cache = caches.open(cacheKeys.DATA_CACHE);
		event.respondWith(cache.then(cache => useStragedy({ event, request, cache, stragedy: constants.stragedies.UPDATE_REFRESH })));
		event.waitUntil(update(request).then(refresh)); 
		return;
	}

	if (isRequestForStaticAsset(request)) {
		const cache = caches.open(cacheKeys.STATIC_CACHE);
		event.respondWith(cache.then(cache => useStragedy({ event, request, cache, stragedy: constants.stragedies.CACHE_FIRST })));
		return;
	}
	
	if (isRequestForStaticHtml(request)) {
		worker.log('Static html request:', request);
		// Responsd with an app-shell otherwise
		if (request.mode === 'navigate') {
			worker.log('Navigation fetch event:', request);
			event.respondWith(async () => {
				try {
					const preloadedResponse = await event.preloadResponse;

					if (preloadedResponse) {
						return preloadedResponse;
					}

					const response = await fetch(event.request);
					const clone = response.clone();

					caches.open(cacheKeys.STATIC_CACHE).then(cache => {
						cache.put(request, clone);
					});

					return response;
				} catch (error) {
					const cache = await caches.open(cacheKeys.STATIC_CACHE);
					const cachedResponse = await cache.match(constants.offlineFallbackPage);
					return cachedResponse;
				}
			});
		} else {
			worker.log('Regular fetch event:', request);
			const cache = caches.open(cacheKeys.STATIC_CACHE);
			event.respondWith(cache.then(cache => useStragedy({ event, request, cache, stragedy: constants.stragedies.CACHE_FIRST })));
		}
		return;
	}

	const cache = caches.open(cacheKeys.STATIC_CACHE);
	event.respondWith(cache.then(cache => useStragedy({ event, request, cache, stragedy: constants.stragedies.CACHE_FIRST })));
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
			event.waitUntil(
				self.clients.openWindow(constants.baseUrl)
			);
			break;
		}
		default: {
			event.waitUntil(
				self.clients.openWindow(constants.baseUrl)
			);
		}
	}
});


/**
 * Attempt to sync non-urgent content silently on the background
 */
self.addEventListener(constants.events.SYNC, (event: Event | any) => {
	worker.log('Received sync event:', event.tag);
	switch(event.tag) {
		case syncEvents.INITIAL_SYNC: {
			event.waitUntil(initialSync().then(x => {
				worker.log('Sync event result:', x);
			}));
			break;
		}
		case syncEvents.UPDATE_SYNC: {
			event.waitUntil(updateSync(constants.baseUrl).then(x => {
				worker.log('Sync event result:', x);
			}));
			break;
		}
		default: {
			worker.log('Received sync event:', event.tag);
			break;
		}
	}
});

self.addEventListener(constants.events.PERIODIC_SYNC, (event: Event | any) => {
	worker.log('Triggered periodic sync:', event);

	switch(event.tag) {
		case syncEvents.CONTENT_SYNC: {
			event.waitUntil(contentSync().then(x => {
				worker.log('Sync event result:', x);
			}));
			break;
		}
		default: {
			worker.log('Received sync event:', event.tag);
			break;
		}
	}
});

self.addEventListener(constants.events.MESSAGE, (event: Event | any) => {
	worker.log('Received message', event);

	const command = event.data;

	switch (command.type) {
		case constants.messages.SKIP_WAITING: {
			self.skipWaiting();
			break;
		}
		case constants.messages.ADD_TO_CACHE: {
			const request = new Request(command.payload);

			fetch(request)
				.then(throwOnError)
				.then(response => {
					caches.open(cacheKeys.STATIC_CACHE).then(cache => cache.put(request, response));
				}).catch((error) => {
					worker.error('Something went wrong!', error);
				});
		}
	}
});

export default constants;