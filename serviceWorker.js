const STATIC_CACHE = 'eudcon-universal-static-cache';
const DATA_CACHE = 'eudcon-universal-data-cache';

const stragedies = Object.freeze({
	CACHE_ONLY: 'cache_only_stragedy', // If there is available cache only serve the cache
	CACHE_FIRST: 'cache_first_stragedy', // Ideal for resources that do not change often
	NETWORK_ONLY: 'network_only_stragedy', // If there is a network connection only serve from network
	NETWORK_FIRST: 'network_first_stragedy', // Ideal for resources or content that changes frequently
	STALE_REVALIDATE: 'stale_revalidate_stragedy' // Ideal for when the latest resource is not essential
});

const baseUrl = 'http://localhost:5000';

const urlsToCache = [
	'/',
	'/service-worker.js',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
	'https://fonts.googleapis.com/css?family=Roboto&display=optional',
	'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

const http = {
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE',
	PATCH: 'PATCH'
};

const events = {
	NOTIFY_CLICK: 'notificationclick',
	PERIODIC_SYNC: 'periodicsync',
	INSTALL: 'install',
	ACTIVATE: 'activate',
	MESSAGE: 'message',
	FETCH: 'fetch',
	SYNC: 'sync',
	PUSH: 'push'
};

const syncEvents = {
	INITIAL_SYNC: 'initial-sync',
	UPDATE_SYNC: 'update-sync',
	CONTENT_SYNC: 'content-sync'
};

const push = {
	NEW_UPDATE: 'new-update'
};

const messages = {
	APP_UPDATE: 'add_update',
	READ_OFFLINE: 'read_offline',
	SKIP_WAITING: 'skip_awaitng'
};

const worker = {
	log: (...message) => {
		const css = 'background: #00b6ffbd; padding: 2px; border-radius: 2px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	warn: (message) => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 2px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	error: (message) => {
		const css = 'background: #ff0038bd; padding: 2px; border-radius: 2px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	}
};

const delay = ms => _ => new Promise(resolve => setTimeout(() => resolve(_), ms));

const throwOnError = (response) => {
	if (response.status >= 200 && response.status < 300 || response.status === 0) {
		return response;
	}
	throw new Error(response.statusText);
};

const isRequestForStaticHtml = request => {
	return /.(html)$/.test(request.url);
};

const isRequestForStaticAsset = request => {
	return /.(png|svg|json|jpg|jpeg|gif|ico|css|js)$/.test(request.url);
};

const isSideEffectRequest = request => {
	return [...Object.values(http)].includes(request.method);
};

const isApiRequest = request => {
	return request.url.includes('/api/');
};

const update = request => {
	return fetch(request.url).then(response => {
		if (!response.ok) throw new Error('Network error');

		return caches.open(DATA_CACHE).then(cache => {
			cache.put(request.url, response.clone());
			return response;
		}).then(response => response);
	});
};

const refresh = response => {
	return response.json()
		.then(jsonResponse => {		
			self.clients.matchAll().then(clients => {
				clients.forEach(client => {
					client.postMessage(JSON.stringify({
						type: messages.APP_UPDATE,
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

const requestFailingWithNotFoundStrategy = ({ request }) => {
	return fetch(request)
		.catch(() => {
			const body = JSON.stringify({ error: 'ServiceWorker: Sorry, you are offline. Please, try again later.' });
			const headers = { 'Content-Type': 'application/json' };
			const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
			return response;
		});
};

const requestCacheUpdateRefreshStrategy = ({ request, cache }) => {
	return cache.match(request).then(response => {
		return new Response(response);
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
};

const cacheableRequestFailingToCacheStrategy = ({ request, cache }) => {
	return fetch(request)
		.then(throwOnError)
		.then(response => {
			cache.put(request, response.clone());
			return response;
		})
		.catch(() => cache.match(request));
};

const cacheFailingToCacheableRequestStrategy = ({ request, cache, stragedy = stragedies.CACHE_FIRST }) => {
	switch(stragedy) {
		case stragedies.CACHE_ONLY: {
			return cache.match(request).then(throwOnError);
		}
		case stragedies.NETWORK_ONLY: {
			return fetch(request).then(throwOnError);
		}
		case stragedies.CACHE_FIRST: {
			return cache.match(request).then(response => {
				return response || fetch(request).then(response => {
					cache.put(request, response.clone());
					return response;
				}).catch(() => {
					return cache.match('/offline.html');
				});
			});
		}
		case stragedies.NETWORK_FIRST: {
			return fetch(request).then(response => {
				cache.put(request, response.clone());
				return response;
			}).catch(() => {
				return cache.match(request).then(response => {
					return response || cache.match('/offline.html');
				});
			});
		}
		case stragedies.STALE_REVALIDATE: {
			return cache.match(request).then(response => {
				const fetchPromise = fetch(request).then(response => {
					cache.put(request, response.clone());
					return response;
				});
				return response || fetchPromise || cache.match('/offline.html');
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
self.addEventListener(events.INSTALL, event => {
	worker.log('Installed:', event);
	event.waitUntil(
		caches.open(STATIC_CACHE)
			.then(cache => {
				const cacheRes = self.__precacheManifest.map(x => x.url);
				return cache.addAll([...urlsToCache, ...cacheRes]);
			})
			.then(() => self.skipWaiting())
			.catch(error => worker.log(error))
	);
});

/**
 * Do clean up here but keep lightweight to avoid
 * a potential render block
 */
self.addEventListener(events.ACTIVATE, event => {
	worker.log('Activated:', event);

	const expectedCaches = [STATIC_CACHE, DATA_CACHE];

	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => {
				if (!expectedCaches.includes(key)) {
					return caches.delete(key);
				}
			})
		))
	);
	return self.clients.claim();
});

self.addEventListener(events.FETCH, event => {
	const request = event.request.clone();

	if(!(request.url.indexOf('http') === 0)){
		return;
	}

	if (isSideEffectRequest(request)) {
		event.respondWith(requestFailingWithNotFoundStrategy({ request }));
		return;
	}

	if (isApiRequest(request)) {
		const cache = caches.open(DATA_CACHE);
		event.respondWith(cache.then(cache => requestCacheUpdateRefreshStrategy({ request, cache })));
		event.waitUntil(update(request).then(refresh)); 
		return;
	}

	if (isRequestForStaticAsset(request)) {
		const cache = caches.open(STATIC_CACHE);
		event.respondWith(cache.then(cache => cacheFailingToCacheableRequestStrategy({ request, cache })));
		return;
	}
	
	if (isRequestForStaticHtml(request)) {
		worker.log('Static html request:', request);
		// Responsd with an app-shell otherwise
		if (request.mode === 'navigate') {
			worker.log('Navigation fetch event:', request);
			event.respondWith(async () => {
				const normalizedUrl = new URL(request.url);
				normalizedUrl.search = '';

				const fetchResponseP = fetch(normalizedUrl);
				const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

				event.waitUntil(async () => {
					const cache = await caches.open(STATIC_CACHE);
					await cache.put(normalizedUrl, await fetchResponseCloneP);
				});

				return (await caches.match(normalizedUrl)) || fetchResponseP;
			});
		} else {
			worker.log('Regular fetch event:', request);
			const cache = caches.open(STATIC_CACHE);
			event.respondWith(cache.then(cache => cacheFailingToCacheableRequestStrategy({ request, cache })));
		}
		return;
	}

	const cache = caches.open(STATIC_CACHE);
	event.respondWith(cache.then(cache => cacheableRequestFailingToCacheStrategy({ request, cache })));
});


const initialSync = ()=> {
	return new Promise((resolve)=> {
		return resolve(true);
	});
};

const contentSync = () => {
	return new Promise((resolve)=> {
		return resolve(true);
	});
};

const updateSync = () => {
	return update({ url: baseUrl + '/rest/api/schema' })
		.then(refresh)
		.then(data => {
			return self.registration.showNotification(`New api version ${data.version}`);
		});
};

/**
 * Attempt to sync non-urgent content silently on the background
 */
self.addEventListener(events.SYNC, event => {
	worker.log('Received sync event:', event.tag);
	switch(event.tag) {
		case syncEvents.INITIAL_SYNC: {
			event.waitUntil(initialSync().then(x => {
				worker.log('Sync event result:', x);
			}));
			break;
		}
		case syncEvents.UPDATE_SYNC: {
			event.waitUntil(updateSync().then(x => {
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

self.addEventListener(events.PERIODIC_SYNC, (event) => {
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

self.addEventListener(events.PUSH, event => {
	worker.log('Push event received:', event.data);
	
	const title = 'Template engine';
	const options = {
		body: 'Yay it works.',
		icon: 'static/images/favicon.png',
		badge: 'static/images/icon-152x152.png'
	};

	const notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);

	// if (event.data.text() == push.NEW_UPDATE) {
	// 	event.waitUntil(
	// 		caches.open(DATA_CACHE).then(cache => {
	// 			return fetch('/updates.json').then(response => {
	// 				cache.put('/updates.json', response.clone());
	// 				return response.json();
	// 			});
	// 		}).then(emails => {
	// 			// registration.showNotification("New email", {
	// 			// 	body: "From " + emails[0].from.name,
	// 			// 	tag: "new-email"
	// 			// });
	// 		})
	// 	);
	// }
});
 
self.addEventListener(events.NOTIFY_CLICK, function (event) {
	worker.log('Notification has been clicked');
	
	event.notification.close();

	const tag = event.notification.tag;

	switch(tag) {
		case push.NEW_UPDATE: {
			event.waitUntil(
				self.clients.openWindow(baseUrl)
			);
			break;
		}
		default: {
			event.waitUntil(
				self.clients.openWindow(baseUrl)
			);
		}
	}
});