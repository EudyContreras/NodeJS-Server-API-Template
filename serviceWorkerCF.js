const CACHE_NAME = 'eudcon-universal-react-cache';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/robots.txt',
  '/service-worker.js',
  '/images/favicon.ico',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
  'https://fonts.googleapis.com/css?family=Roboto&display=optional',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.googleapis.com/css?family=Lato|Montserrat:500|Open+Sans:600|Roboto&display=swap'
];

const http = {
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

const events = {
  INSTALL: 'install',
  ACTIVATE: 'activate',
  MESSAGE: 'message',
  FETCH: 'fetch',
  PUSH: 'push'
}

const messages = {
  READ_OFFLINE: 'READ_OFFLINE',
  SKIP_WAITING: 'SKIP_WAITING'
}

workbox.core.skipWaiting();
workbox.core.clientsClaim();

requestFailingToCacheStrategy = ({ request, cache }) => {
  return fetch(request).catch(() => cache.match(request));
}

requestFailingWithNotFoundStrategy = ({ request }) => {
  return fetch(request)
    .catch(() => {
      const body = JSON.stringify({ error: 'Sorry, you are offline. Please, try later.' });
      const headers = { 'Content-Type': 'application/json' };
      const response = new Response(body, { status: 404, statusText: 'Not Found', headers });
      return response;
    });
}

cacheableRequestFailingToCacheStrategy = ({ request, cache }) => {
  return fetch(request)
    .then(throwOnError)
    .then(response => {
      cache.put(request, response.clone());
      return response;
    })
    .catch(() => cache.match(request));
}

isRequestForStatic = (request) => {
  return /.(png|jpg|jpeg|gif|ico|css|js)$/.test(request.url);
}

isSideEffectRequest = (request) => {
  return [...http].includes(request.method);
}

throwOnError = (response) => {
  if (response.status >= 200 && response.status < 300 || response.status === 0) {
    return response;
  }
  throw new Error(response.statusText);
};

cacheFailingToCacheableRequestStrategy = ({ request, cache }) => {
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

self.addEventListener(events.INSTALL, event => {
  console.log('SW installed', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Opened cache');
      const cacheRes = self.__precacheManifest.map(x => x.url);
      return cache.addAll([...urlsToCache, ...cacheRes]);
    })
    .then(() => {
      console.log('Skipped waiting');
      return self.skipWaiting();
    })
    .catch(error => console.log(error))

  );
});

self.addEventListener(events.ACTIVATE, event => {
  console.log('SW activated', event);

  const expectedCaches = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('Cached deleted');
    })
  );

  return self.clients.claim();
});

self.addEventListener(events.FETCH, event => {
  const request = event.request.clone();

  console.log('SW fetch', request);

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
  console.log('SW push', event);

  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener(events.MESSAGE, event => {
  console.log('SW message', event);

  const command = event.data;
  switch(command.type) {
    case messages.READ_OFFLINE: {
      const request = new Request(command.payload);
      fetch(request).then(throwOnError).then(response => {
        caches.open(CACHE_NAME).then(cache => cache.put(request, response));
      });
    }
    case messages.SKIP_WAITING: {
      self.skipWaiting();
    }
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});