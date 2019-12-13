const CACHE_NAME = 'eudcon-universal-react-cache';

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
	CONTENT_SYNC: 'content-sync'
};

const messages = {
	READ_OFFLINE: 'READ_OFFLINE',
	SKIP_WAITING: 'SKIP_WAITING'
};

const throwOnError = (response) => {
	if (response.status >= 200 && response.status < 300 || response.status === 0) {
		return response;
	}
	throw new Error(response.statusText);
};

const initialSynch = () => {
	
};

const syncContent = () => {

};

const requestFailingWithNotFoundStrategy = ({ request }) => {
	return fetch(request)
		.catch(() => {
			const body = JSON.stringify({ error: 'Sorry, you are offline. Please, try later.' });
			const headers = { 'Content-Type': 'application/json' };
			const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
			return response;
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

const isRequestForStatic = (request) => {
	return /.(png|jpg|jpeg|gif|ico|css|js)$/.test(request.url);
};

const isSideEffectRequest = (request) => {
	return [...Object.values(http)].includes(request.method);
};

const cacheFailingToCacheableRequestStrategy = ({ request, cache }) => {
	return cache.match(request)
		.then(throwOnError)
		.catch(() => fetch(request)
			.then(throwOnError)
			.then(response => {
				cache.put(request, response.clone());
				return response;
			})
		);
};

self.addEventListener(events.SYNC, event => {
	if(event.tag === syncEvents.EXAMPLE) {
		event.waitUntil(initialSynch());
	}
});

self.addEventListener(events.PERIODIC_SYNC, (event) => {
	if (event.tag === syncEvents.CONTENT_SYNC) {
		event.waitUntil(syncContent());
	}
});

self.addEventListener(events.INSTALL, event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				const cacheRes = self.__precacheManifest.map(x => x.url);
				return cache.addAll([...urlsToCache, ...cacheRes]);
			})
			.then(() => self.skipWaiting())
			.catch(error => console.log(error))
	);
});

self.addEventListener(events.ACTIVATE, event => {
	const expectedCaches = [CACHE_NAME];

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

	if (isRequestForStatic(request)) {
		event.respondWith(
			caches.open(CACHE_NAME)
				.then(cache => cacheFailingToCacheableRequestStrategy({ request, cache }))
		);
		return;
	}

	event.respondWith(
		caches.open(CACHE_NAME)
			.then(cache => cacheableRequestFailingToCacheStrategy({ request, cache }))
	);
});

self.addEventListener(events.PUSH, event => {

	const title = 'Get Started With Workbox';
	const options = {
		body: event.data.text()
	};
	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener(events.MESSAGE, event => {
	const command = event.data;
	switch(command.type) {
		case messages.READ_OFFLINE: {
			const request = new Request(command.payload);
			fetch(request).then(throwOnError).then(response => {
				caches.open(CACHE_NAME).then(cache => cache.put(request, response));
			});
		}
			break;
		case messages.SKIP_WAITING: {
			self.skipWaiting();
		}
	}
});