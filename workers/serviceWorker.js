self.DATA_CACHE = 'eudcon-universal-data-cache';
self.STATIC_CACHE = 'eudcon-universal-static-cache';

self.worker = {
	log: (...message) => {
		const css = 'background: #00b6ffbd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	warn: (message) => {
		const css = 'background: #ffbf00bd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	},
	error: (message) => {
		const css = 'background: #ff0038bd; padding: 2px; border-radius: 4px; color: white; font-weight: 600;';
		console.log('%c ServiceWorker ', css, ...message);
	}
};

self.importScripts('constants.js', 'helpers/shared.helper.js','helpers/sync.helper.js', 'helpers/fallback.helper.js', 'helpers/notify.helper.js');

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
	return [...Object.values(self.http)].includes(request.method) || request.method != 'GET';
};

const isApiRequest = request => {
	return request.url.includes('/api/');
};

const fromNetwork = (request) => {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(reject, self.TIMEOUT);

		fetch(request).then(response => {
			clearTimeout(timeoutId);
			resolve(response);
		}, reject);
	});
};

const fromCache = (request, cacheName) => {
	return caches.open(cacheName)
		.then(cache => cache.match(request))
		.then(match => match || Promise.reject('no-request-match'));
};

const updateCache = (request, cacheName) => {
	return caches.open(cacheName).then((cache) => {
		return fetch(request).then((response) => {
			return cache.put(request, response.clone());
		});
	});
};

const refreshClient = (response) => {
	return self.clients.matchAll()
		.then(clients => clients.forEach(client => {
			client.postMessage(JSON.stringify({
				type: self.REFRESH,
				url: response.url
			}));
		}));
};

const networkOrCache = (request) => {
	return fromNetwork(request).then(response => {
		return response.ok ? response : fromCache(request);
	}).catch(() => {
		return fromCache(request);
	});
};

const cacheOrNetwork = (request) => {
	return fromCache(request).then(response => {
		return response.ok ? response : fromNetwork(request);
	}).catch(() => {
		return fromNetwork(request);
	});
};

const staleWhileRevalidate = (event, cacheName) => {
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

const useStragedy = ({ request, cache, stragedy = self.stragedies.CACHE_FIRST, contentType = self.contentTypes.HTML }) => {
	switch(stragedy) {
		case self.stragedies.CACHE_ONLY: {
			return cache.match(request).then(response => self.useFallback(contentType, response));
		}
		case self.stragedies.NETWORK_ONLY: {
			return fetch(request).then(response => self.useFallback(contentType, response));
		}
		case self.stragedies.CACHE_FIRST: {
			return cache.match(request).then(response => {
				return response || fetch(request).then(response => {
					cache.put(request, response.clone());
					return response;
				}).catch(() => {
					return cache.match('/offline.html');
				});
			});
		}
		case self.stragedies.NETWORK_FIRST: {
			return fetch(request).then(throwOnError).then(response => {
				cache.put(request, response.clone());
				return response;
			}).catch(() => {
				return cache.match(request).then(response => {
					return response || self.getFallback();
				});
			});
		}
		case self.stragedies.STALE_REVALIDATE: {
			return cache.match(request).then(response => {
				const fetchPromise = fetch(request).then(response => {
					cache.put(request, response.clone());
					return response;
				});
				return response || fetchPromise || self.useFallback();
			});
		}
		case self.stragedies.UPDATE_REFRESH: {
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
		}
		case self.stragedies.CACHE_THEN_PRELOAD: {
			return caches.match(request).then(response => {
				return response || event.preloadResponse.then(response => {
					return response || fetch(request).then(response => {
						cache.put(request, response.clone());
						return response;
					}).catch(() => {
						return self.useFallback();
					});
				});
			});
		}
		case self.stragedies.NON_FOUND: {
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
self.addEventListener(self.events.INSTALL, event => {
	self.worker.log('Installed:', event);
	event.waitUntil(
		caches.open(self.STATIC_CACHE)
			.then(cache => {
				const cacheRes = self.__precacheManifest.map(x => x.url);
				return cache.addAll([...self.urlsToCache, ...cacheRes]);
			})
			.then(() => self.skipWaiting())
			.catch(error => self.worker.log(error))
	);
});

/**
 * Do clean up here but keep lightweight to avoid
 * a potential render block
 */
self.addEventListener(self.events.ACTIVATE, event => {
	self.worker.log('Activated:', event);

	const expectedCaches = [self.STATIC_CACHE, self.DATA_CACHE];

	event.waitUntil(
		caches.keys()
			.then(keys => keys.filter(key => !expectedCaches.includes(key)))
			.then(keys => Promise.all(keys.map(key => {
				self.worker.log(`Deleting cache ${key}`);
				return caches.delete(key);
			})))
	);

	return self.clients.claim();
});

self.addEventListener(self.events.FETCH, event => {
	const request = event.request.clone();

	if(!(request.url.indexOf('http') === 0)){
		return;
	}

	if (isSideEffectRequest(request)) {
		event.respondWith(useStragedy({ request, stragedy: self.stragedies.NON_FOUND }));
		return;
	}

	if (isApiRequest(request)) {
		const cache = caches.open(self.DATA_CACHE);
		event.respondWith(cache.then(cache => useStragedy({ request, cache, stragedy: self.stragedies.UPDATE_REFRESH })));
		event.waitUntil(self.update(request).then(self.refresh)); 
		return;
	}

	if (isRequestForStaticAsset(request)) {
		const cache = caches.open(self.STATIC_CACHE);
		event.respondWith(cache.then(cache => useStragedy({ request, cache, stragedy: self.stragedies.CACHE_FIRST })));
		return;
	}
	
	if (isRequestForStaticHtml(request)) {
		self.worker.log('Static html request:', request);
		// Responsd with an app-shell otherwise
		if (request.mode === 'navigate') {
			self.worker.log('Navigation fetch event:', request);
			event.respondWith(async () => {
				const normalizedUrl = new URL(request.url);
				normalizedUrl.search = '';

				const response = fetch(normalizedUrl);
				const clone = response.then(x => x.clone());

				event.waitUntil(async () => {
					const cache = await caches.open(self.STATIC_CACHE);
					await cache.put(normalizedUrl, await clone);
				});

				return (await caches.match(normalizedUrl)) || response;
			});
		} else {
			self.worker.log('Regular fetch event:', request);
			const cache = caches.open(self.STATIC_CACHE);
			event.respondWith(cache.then(cache => useStragedy({ request, cache, stragedy: self.stragedies.CACHE_FIRST })));
		}
		return;
	}

	const cache = caches.open(self.STATIC_CACHE);
	event.respondWith(cache.then(cache => useStragedy({ request, cache, stragedy: self.stragedies.CACHE_FIRST })));
});

self.addEventListener(self.events.PUSH, event => {
	self.worker.log('Push event received:', event.data);
	
	const { title, options } = self.updateNotification;

	const notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);
});
 
self.addEventListener(self.events.NOTIFY_CLICK, event => {
	self.worker.log('Notification has been clicked');
	
	event.notification.close();

	const tag = event.notification.tag;

	switch(tag) {
		case self.push.NEW_UPDATE: {
			event.waitUntil(
				self.clients.openWindow(self.baseUrl)
			);
			break;
		}
		default: {
			event.waitUntil(
				self.clients.openWindow(self.baseUrl)
			);
		}
	}
});

self.addEventListener(self.events.MESSAGE, event => {
	self.worker.log('Received message', event);

	const command = event.data;

	switch (command.type) {
		case self.messages.ADD_TO_CACHE: {
			const request = new Request(command.payload);

			fetch(request)
				.then(throwOnError)
				.then(response => {
					caches.open(self.STATIC_CACHE).then(cache => cache.put(request, response));
				});
		}
	}
});