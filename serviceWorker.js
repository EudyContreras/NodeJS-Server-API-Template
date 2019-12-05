const CACHE_NAME = 'eudcon-universal-react-cache';

const urlsToCache = [
  '/',
  '/main.js',
  '/manifest.json',
  '/robots.txt',
  '/serviceWorker.js',
  '/vendor/vendor.js',
  '/scripts/loader.js',
  '/images/favicon.ico',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap',
  'https://fonts.googleapis.com/css?family=Roboto&display=optional',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.googleapis.com/css?family=Lato|Montserrat:500|Open+Sans:600|Roboto&display=swap'
];

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// workbox.routing.registerRoute(
//   new RegExp('http://localhost:5000'),
//   new workbox.strategies.StaleWhileRevalidate()
// );

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('install', function (event) {
  console.log('SW On install', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
    .then(function () {
      console.log('Skipped waiting');
      return self.skipWaiting();
    })
    .catch(error => console.log(error))
  );
})

self.addEventListener('activate', function (event) {
  console.log('SW On activate', event);

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

self.addEventListener('fetch', function (event) {
  const request = event.request.clone();

  console.log('SW On fetch', request);

  event.respondWith(
    caches.match(request)
    .then(response => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(request).then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(request, responseToCache);
          })
          .catch(error => console.log(error));

        return response;
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});